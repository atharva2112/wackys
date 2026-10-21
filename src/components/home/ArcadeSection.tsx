"use client";

import { games } from "@/lib/content";
import { FlavourRoulette } from "../FlavourRoulette";
import { useArcade } from "../ArcadeProvider";
import { Icon } from "../Icon";

export function ArcadeSection() {
  const { soundOn, toggleSound } = useArcade();
  return (
    <section className="relative overflow-hidden bg-crt py-20 sm:py-28" aria-labelledby="arcade-title">
      <div aria-hidden className="absolute inset-0 bg-scanlines opacity-70" />
      <div aria-hidden className="absolute -left-32 top-10 size-96 rounded-full bg-aurora/10 blur-3xl" />
      <div aria-hidden className="absolute -right-32 bottom-0 size-96 rounded-full bg-maple/20 blur-3xl" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="pixel text-[15px] text-amber">INSERT COIN</p>
          <h2 id="arcade-title" className="pixel mt-3 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-none glow-text">
            PRESS<br />START<span className="animate-blink">_</span>
          </h2>
          <p className="body-l mt-6 max-w-md text-bark">Can&apos;t pick from 100+ flavours? Pull the lever and let the machine call it. Every spin lands on a real Wacky&apos;s flavour.</p>
          <blockquote className="mt-8 max-w-md border-l-4 border-aurora pl-4 font-display text-[1.35rem] leading-snug text-birch">
            “{games.scoreQuote}”
          </blockquote>
          <button onClick={toggleSound} aria-pressed={soundOn} className="btn btn-sm btn-arcade mt-8">
            <Icon name={soundOn ? "sound" : "mute"} size={18} /> {soundOn ? "Sound on" : "Sound off"}
          </button>
          <p className="mt-2 text-[14px] text-lichen">Arcade sounds stay off unless you switch them on.</p>
        </div>
        <FlavourRoulette />
      </div>
    </section>
  );
}
