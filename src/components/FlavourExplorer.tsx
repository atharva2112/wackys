"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { flavours } from "@/lib/content";
import type { Flavour } from "@/lib/schemas";
import { HEAT, HeatChip, HeatMeter } from "./Heat";
import { Icon } from "./Icon";
import { useArcade } from "./ArcadeProvider";
import { Splash } from "./Art";

const PROFILES = ["sweet", "smoky", "spicy", "tangy", "savoury", "cheesy", "garlicky", "adventurous"] as const;
const TYPES = [
  { id: "all", label: "All" },
  { id: "sauce", label: "Wet sauce" },
  { id: "dry", label: "Dry seasoning" },
] as const;

function FlavourCard({ f, highlight }: { f: Flavour; highlight: boolean }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 260, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 260, damping: 20 });
  const { blip } = useArcade();
  const h = HEAT[f.heat]!;
  const wacky = f.heat === 5;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerEnter={() => blip("hover")}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
      className={`group relative flex min-h-[220px] flex-col overflow-hidden rounded-[12px] p-5 ${wacky ? "bg-scanlines glow-box text-birch" : "bg-white text-char stamped"} ${highlight ? "ring-4 ring-amber ring-offset-4 ring-offset-char" : ""}`}
    >
      {/* sauce drip that pours down on hover */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" style={{ background: `linear-gradient(180deg, ${h.bg}22, transparent 70%)` }} />
      <svg aria-hidden viewBox="0 0 200 24" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-6 w-full origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100" style={{ color: h.bg }}>
        <path fill="currentColor" d="M0 0h200v8c-8 0-8 12-16 12s-6-10-14-10-8 14-16 14-6-12-16-12-10 8-18 8-6-12-14-12-10 16-18 16-6-14-16-14-8 8-16 8-8-10-16-10-6 12-14 12-8-8-14-8S8 12 0 8z" />
      </svg>
      <div className="relative flex items-center justify-between gap-2">
        <span className={`tag ${f.type === "dry" ? "bg-cedar text-white" : "bg-char text-birch"} ${wacky ? "!bg-aurora !text-char" : ""}`}>{f.type === "dry" ? "Dry seasoning" : "Wet sauce"}</span>
        {f.isNew && <span className="tag bg-sauce text-char">New flavour</span>}
      </div>
      <h3 className={`relative mt-4 font-display text-[1.65rem] leading-[1.05] ${wacky ? "glow-text" : ""}`}>{f.name}</h3>
      {f.description && <p className={`relative mt-2 text-[15px] ${wacky ? "text-bark" : "text-pine-ash"}`}>{f.description}</p>}
      <p className={`relative mt-2 text-[14px] capitalize ${wacky ? "text-lichen" : "text-pine-ash"}`}>{f.profiles.join(" · ")}</p>
      <div className="relative mt-auto space-y-3 pt-5">
        <HeatMeter level={f.heat} />
        <HeatChip level={f.heat} />
      </div>
    </motion.li>
  );
}

export function FlavourExplorer({ compact = false }: { compact?: boolean }) {
  const [type, setType] = useState<(typeof TYPES)[number]["id"]>("all");
  const [profiles, setProfiles] = useState<string[]>([]);
  const [heat, setHeat] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [surprise, setSurprise] = useState<Flavour | null>(null);
  const [rolling, setRolling] = useState(false);
  const { addPoints, blip } = useArcade();

  const all = flavours.items.filter((f) => f.available);
  const filtered = useMemo(() => all.filter((f) =>
    (type === "all" || f.type === type) &&
    (profiles.length === 0 || profiles.some((p) => f.profiles.includes(p as Flavour["profiles"][number]))) &&
    (heat.length === 0 || heat.includes(f.heat)) &&
    (!query || f.name.toLowerCase().includes(query.toLowerCase())),
  ), [all, type, profiles, heat, query]);

  const shown = compact ? filtered.slice(0, 8) : filtered;
  const toggle = (arr: string[] | number[], v: string | number, set: (x: never[]) => void) =>
    set((arr as (string | number)[]).includes(v) ? (arr as never[]).filter((x) => x !== v) : ([...arr, v] as never[]));

  const surpriseMe = () => {
    const pool = filtered.length ? filtered : all;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSurprise(pool[Math.floor(Math.random() * pool.length)]);
      return;
    }
    setRolling(true);
    let n = 0;
    const spin = () => {
      setSurprise(pool[Math.floor(Math.random() * pool.length)]);
      blip("tick");
      n++;
      if (n < 12) setTimeout(spin, 50 + n * 12);
      else { setRolling(false); blip("win"); addPoints(250); }
    };
    spin();
  };

  const reset = () => { setType("all"); setProfiles([]); setHeat([]); setQuery(""); };
  const active = type !== "all" || profiles.length > 0 || heat.length > 0 || query;

  return (
    <div>
      <div className="grid gap-5 rounded-[12px] border-2 border-ember bg-smoke p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <fieldset>
            <legend className="label-s mb-2 text-amber">Style</legend>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Sauce or dry">
              {TYPES.map((t) => (
                <button key={t.id} role="radio" aria-checked={type === t.id} onClick={() => setType(t.id)}
                  className={`chip transition-colors ${type === t.id ? "border-amber bg-amber text-char" : "border-ember text-birch hover:border-amber"}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative block sm:w-64">
              <span className="sr-only">Search flavours</span>
              <Icon name="search" size={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-pine-ash" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search flavours" className="field !min-h-[44px] !pl-10" />
            </label>
            <button onClick={surpriseMe} disabled={rolling} className="btn btn-sm btn-primary">
              <Icon name="shuffle" size={20} /> Surprise me!
            </button>
          </div>
        </div>
        <fieldset>
          <legend className="label-s mb-2 text-amber">Flavour profile</legend>
          <div className="flex flex-wrap gap-2">
            {PROFILES.map((p) => (
              <button key={p} aria-pressed={profiles.includes(p)} onClick={() => toggle(profiles, p, setProfiles as never)}
                className={`chip transition-colors ${profiles.includes(p) ? "border-sauce bg-sauce text-char" : "border-ember text-birch hover:border-sauce"}`}>
                {p}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="label-s mb-2 text-amber">Heat</legend>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((lv) => (
              <button key={lv} aria-pressed={heat.includes(lv)} onClick={() => toggle(heat, lv, setHeat as never)}
                className={`rounded-[6px] transition-transform ${heat.includes(lv) ? "scale-105 ring-2 ring-birch ring-offset-2 ring-offset-smoke" : "opacity-80 hover:opacity-100"}`}>
                <HeatChip level={lv} className="min-h-[36px]" />
              </button>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[15px] text-lichen">
          <p aria-live="polite">Showing {shown.length} of {filtered.length} matching flavours{compact ? "" : ` · ${flavours.totalClaim} in the kitchen`}</p>
          {active && <button onClick={reset} className="font-label font-bold tracking-[.14em] text-birch uppercase underline underline-offset-4">Reset filters</button>}
        </div>
      </div>

      <AnimatePresence>
        {surprise && (
          <motion.div
            key="surprise" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="relative mt-6 overflow-hidden rounded-[12px] bg-amber p-5 text-char stamped sm:p-6"
            role="status" aria-live="polite"
          >
            <Splash className="absolute -right-10 -top-10 w-48 opacity-40" color="#F5821F" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="pixel text-[14px]">{rolling ? "ROLLING…" : "YOUR NEXT FLAVOUR IS"}</p>
                <p className="mt-1 font-display text-[clamp(2rem,5vw,3.25rem)] leading-none">{surprise.name}</p>
                <p className="mt-2 font-label text-[17px] font-bold tracking-[.1em] uppercase">{surprise.type === "dry" ? "Dry seasoning" : "Wet sauce"} · {HEAT[surprise.heat]!.label}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={surpriseMe} disabled={rolling} className="btn btn-sm btn-dark">Spin again</button>
                <button onClick={() => setSurprise(null)} className="btn btn-sm btn-outline-dark" aria-label="Dismiss suggestion">Got it</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.ul layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {shown.map((f) => <FlavourCard key={f.id} f={f} highlight={!rolling && surprise?.id === f.id} />)}
        </AnimatePresence>
      </motion.ul>
      {filtered.length === 0 && (
        <p className="mt-8 rounded-[12px] border-2 border-dashed border-ember p-8 text-center text-lichen">No flavours match that combo yet — try loosening a filter.</p>
      )}
      {compact ? (
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/flavours" className="btn btn-amber">Explore every flavour <Icon name="arrow" size={20} /></Link>
          <p className="text-[15px] text-lichen">{flavours.totalClaim} flavours on the board — ask your server for today&apos;s full list.</p>
        </div>
      ) : (
        <p className="mt-8 max-w-3xl text-[15px] text-lichen">{flavours.note}</p>
      )}
    </div>
  );
}
