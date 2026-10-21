"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const SOUND_KEY = "wackys.sound";
const SCORE_KEY = "wackys.score";

type Ctx = {
  score: number;
  addPoints: (n: number) => void;
  soundOn: boolean;
  toggleSound: () => void;
  blip: (kind?: "hover" | "coin" | "win" | "tick") => void;
};

const ArcadeContext = createContext<Ctx | null>(null);

/**
 * Purely decorative arcade layer: a session score for playful interactions and
 * synthesized 8-bit blips. Sound is OFF until the guest explicitly turns it on.
 */
export function ArcadeProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      setSoundOn(sessionStorage.getItem(SOUND_KEY) === "on");
      setScore(Number(sessionStorage.getItem(SCORE_KEY)) || 0);
    } catch { /* ignore */ }
  }, []);

  const addPoints = useCallback((n: number) => {
    setScore((s) => {
      const next = s + n;
      try { sessionStorage.setItem(SCORE_KEY, String(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const blip = useCallback((kind: "hover" | "coin" | "win" | "tick" = "hover") => {
    if (!soundOn) return;
    try {
      const ac = ctxRef.current ?? new AudioContext();
      ctxRef.current = ac;
      const notes: Record<string, [number, number][]> = {
        hover: [[880, 0.04]],
        tick: [[660, 0.03]],
        coin: [[988, 0.06], [1319, 0.18]],
        win: [[523, 0.08], [659, 0.08], [784, 0.08], [1047, 0.22]],
      };
      let t = ac.currentTime;
      for (const [freq, dur] of notes[kind]) {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.type = "square";
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.045, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(ac.destination);
        o.start(t);
        o.stop(t + dur);
        t += dur * 0.9;
      }
    } catch { /* audio unavailable */ }
  }, [soundOn]);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      const next = !on;
      try { sessionStorage.setItem(SOUND_KEY, next ? "on" : "off"); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ score, addPoints, soundOn, toggleSound, blip }), [score, addPoints, soundOn, toggleSound, blip]);
  return <ArcadeContext.Provider value={value}>{children}</ArcadeContext.Provider>;
}

export function useArcade() {
  const ctx = useContext(ArcadeContext);
  if (!ctx) throw new Error("useArcade must be used inside ArcadeProvider");
  return ctx;
}
