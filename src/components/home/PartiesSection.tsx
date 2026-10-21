"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { appliesTo, parties } from "@/lib/content";
import { PackageCard } from "../PackageCard";
import { useLocationChoice } from "../LocationProvider";
import { Icon } from "../Icon";
import { Star, Token } from "../Art";

export function PartiesSection() {
  const { slug, location, openPicker } = useLocationChoice();
  const [occasion, setOccasion] = useState(parties.occasions[0].id);
  const pkgs = parties.packages.filter((p) => p.active && p.occasions.includes(occasion) && appliesTo(p.locations, slug));
  const occ = parties.occasions.find((o) => o.id === occasion)!;

  return (
    <section className="relative overflow-hidden bg-plaid py-20 sm:py-28" aria-labelledby="parties-title">
      <Token className="animate-float absolute left-[4%] top-12 hidden w-20 lg:block" style={{ ["--r" as string]: "-10deg" }} />
      <Star className="animate-float absolute right-[8%] top-20 hidden w-10 lg:block" />
      <div className="wrap relative">
        <div className="rounded-[16px] bg-birch p-6 text-char stamped sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="kicker text-maple-deep">Parties</p>
              <h2 id="parties-title" className="display-l mt-2">Bring the whole crew</h2>
              <p className="body-l mt-4 text-ember">{parties.intro}</p>
              <div className="mt-8" role="tablist" aria-label="Occasion">
                <div className="flex flex-wrap gap-2">
                  {parties.occasions.map((o) => (
                    <button key={o.id} role="tab" aria-selected={occasion === o.id} aria-controls="party-panel" onClick={() => setOccasion(o.id)}
                      className={`chip transition-all ${occasion === o.id ? "border-maple bg-maple text-white" : "border-char hover:bg-char hover:text-birch"}`}>
                      {o.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/parties?occasion=${occasion}#enquire`} className="btn btn-primary">Plan a party</Link>
                <button onClick={openPicker} className="btn btn-outline-dark"><Icon name="pin" size={18} /> {location?.name ?? "Select location"}</button>
              </div>
            </div>
            <div id="party-panel" role="tabpanel" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={occasion} initial={{ opacity: 0, x: 30, rotate: 1 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}>
                  <p className="font-display text-[2rem] leading-none">{occ.name}</p>
                  <p className="mt-2 text-[17px] text-pine-ash">{occ.blurb}</p>
                  <div className="mt-6 grid gap-5">
                    {pkgs.map((p) => <PackageCard key={p.id} pkg={p} />)}
                    {pkgs.length === 0 && (
                      <div className="rounded-[12px] border-2 border-dashed border-char/40 p-6">
                        <p className="font-label text-xl font-extrabold tracking-[.06em] uppercase">Custom-built for your crew</p>
                        <p className="mt-2 text-[16px] text-pine-ash">{parties.groupNote}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
