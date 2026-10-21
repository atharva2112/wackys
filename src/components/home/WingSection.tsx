"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { flavours } from "@/lib/content";
import { FlavourExplorer } from "../FlavourExplorer";
import { WingArt } from "../Art";
import { HeatChip } from "../Heat";

const SHOWCASE = ["sauce-boss", "maple-bacon", "garlic-parmesan", "sriracha-buffalo"];
const HUES = { "sauce-boss": "fire", "maple-bacon": "bbq", "garlic-parmesan": "dry", "sriracha-buffalo": "sauce" } as const;

export function WingSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-slide='a']", { xPercent: 12 }, { xPercent: -10, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "40% top", scrub: true } });
      gsap.fromTo("[data-slide='b']", { xPercent: -14 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "40% top", scrub: true } });
      gsap.from("[data-wing]", {
        y: 120, rotate: (i) => (i % 2 ? 18 : -18), opacity: 0, stagger: 0.12, duration: 1.1, ease: "back.out(1.6)",
        scrollTrigger: { trigger: "[data-wing-row]", start: "top 80%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const showcase = SHOWCASE.map((id) => flavours.items.find((f) => f.id === id)!).filter(Boolean);

  return (
    <section ref={ref} id="flavours" className="relative overflow-hidden bg-char py-20 sm:py-28" aria-labelledby="wing-title">
      <h2 id="wing-title" className="sr-only">100+ flavours. Zero boring bites.</h2>
      <div aria-hidden className="select-none">
        <p data-slide="a" className="whitespace-nowrap font-display text-[clamp(3.5rem,12vw,11rem)] leading-[.9] text-birch">100+ Flavours.</p>
        <p data-slide="b" className="whitespace-nowrap font-display text-[clamp(3.5rem,12vw,11rem)] leading-[.9] text-sauce">Zero boring bites.</p>
      </div>

      <div className="wrap">
        <ul data-wing-row className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Featured flavours">
          {showcase.map((f, i) => (
            <li key={f.id} data-wing className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[12px] p-4 ${i === 0 ? "bg-scanlines glow-box" : i === 1 ? "bg-cedar" : i === 2 ? "bg-birch text-char" : "bg-maple"}`}>
              <div className="relative z-10 flex justify-between"><HeatChip level={f.heat} /></div>
              <WingArt hue={HUES[f.id as keyof typeof HUES]} cut={i % 2 ? "flat" : "drum"} className="absolute inset-x-[4%] top-[18%] w-[92%] drop-shadow-[0_24px_24px_rgba(0,0,0,.5)] transition-transform duration-700 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-12 group-hover:scale-110" />
              <div className="relative z-10">
                <p className={`label-s ${i === 2 ? "text-pine-ash" : "text-birch/80"}`}>{f.type === "dry" ? "Dry seasoning" : "Wet sauce"}</p>
                <p className={`font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-none ${i === 0 ? "glow-text" : ""}`}>{f.name}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker text-sauce">Wing flavour explorer</p>
            <p className="display-m mt-2 max-w-2xl">Wet, dry, sweet, smoky or straight-up wacky — find yours.</p>
          </div>
        </div>
        <div className="mt-8"><FlavourExplorer compact /></div>
      </div>
    </section>
  );
}
