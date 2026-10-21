"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { flavours } from "@/lib/content";
import { HEAT } from "./Heat";
import { useArcade } from "./ArcadeProvider";
import { Token } from "./Art";

const SIDES = ["Fries", "Tater Tots", "Poutine"];
const REEL_H = 72;

/** A three-reel "slot machine": flavour × heat × side. Purely for fun — every result is a real menu name. */
export function FlavourRoulette() {
  const pool = flavours.items.filter((f) => f.available);
  const reels = [pool.map((f) => f.name), pool.map((f) => HEAT[f.heat]!.label), SIDES];
  const [stops, setStops] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [coins, setCoins] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const { addPoints, blip, score } = useArcade();
  const spins = useRef(0);
  const prev = useRef([0, 0, 0]);

  const spin = () => {
    if (spinning) return;
    const pick = Math.floor(Math.random() * pool.length);
    const next = [pick, pick, Math.floor(Math.random() * SIDES.length)];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSpinning(true);
    setResult(null);
    blip("coin");
    spins.current += 1;
    setStops((cur) => { prev.current = cur; return next; });
    setTimeout(() => {
      setSpinning(false);
      const f = pool[pick];
      setResult(`${f.name} · ${HEAT[f.heat]!.label} · with ${SIDES[next[2]]}`);
      addPoints(100);
      blip("win");
      if (!reduce) {
        setCoins(Array.from({ length: 10 }, (_, i) => spins.current * 100 + i));
        setTimeout(() => setCoins([]), 1400);
      }
    }, reduce ? 50 : 1700);
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="relative rounded-[18px] border-4 border-char bg-maple p-4 shadow-[8px_8px_0_#1B1512] sm:p-6">
        <div className="flex items-center justify-between rounded-[8px] bg-char px-4 py-2">
          <span className="pixel text-[13px] text-amber">FLAVOUR ROULETTE</span>
          <span className="pixel text-[13px] text-aurora">SCORE {String(score).padStart(6, "0")}</span>
        </div>
        <div className="mt-4 grid grid-cols-[1.6fr_1fr_1fr] gap-2 rounded-[10px] bg-char p-2 sm:gap-3 sm:p-3" aria-hidden>
          {reels.map((items, ri) => {
            const loops = 4;
            const strip = Array.from({ length: loops }, () => items).flat();
            const target = (loops - 1) * items.length + stops[ri];
            const from = prev.current[ri];
            return (
              <div key={ri} className="relative h-[72px] overflow-hidden rounded-[6px] bg-birch">
                <motion.div
                  animate={{ y: spinning ? [-from * REEL_H, -target * REEL_H] : -target * REEL_H }}
                  initial={false}
                  transition={spinning ? { duration: 1.1 + ri * 0.25, ease: [0.2, 0.7, 0.2, 1.02] } : { duration: 0 }}
                >
                  {strip.map((t, i) => (
                    <div key={i} className="flex h-[72px] items-center justify-center px-2 text-center font-label text-[clamp(.85rem,2.4vw,1.15rem)] font-extrabold leading-tight tracking-[.04em] text-char uppercase">
                      {t}
                    </div>
                  ))}
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(27,21,18,.35),transparent_30%,transparent_70%,rgba(27,21,18,.35))]" />
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="min-h-6 text-center font-label text-[17px] font-bold tracking-[.06em] text-white sm:text-left" role="status" aria-live="polite">
            {spinning ? "Rolling…" : result ? `Order up: ${result}` : "Can't decide? Let the machine pick."}
          </p>
          <button onClick={spin} disabled={spinning} className="btn btn-amber shrink-0 !border-2 !border-char shadow-[4px_4px_0_#1B1512] active:translate-x-1 active:translate-y-1 active:shadow-none">
            {spinning ? "Spinning…" : "Pull the lever"}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {coins.map((c, i) => (
          <motion.div
            key={c}
            className="pointer-events-none absolute left-1/2 top-1/2 w-10"
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: Math.cos((i / 10) * Math.PI * 2) * 220, y: Math.sin((i / 10) * Math.PI * 2) * 160 - 60, opacity: 0, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Token />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
