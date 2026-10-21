"use client";

import { useState } from "react";
import { appliesTo, parties } from "@/lib/content";
import { PackageCard } from "./PackageCard";
import { PartyForm } from "./PartyForm";
import { useLocationChoice } from "./LocationProvider";
import { Icon } from "./Icon";

const OCC_ICON: Record<string, string> = { kids: "parties", sports: "sports", friends: "beer", "team-building": "prizes", graduation: "vip" };

export function PartyPlanner({ initialOccasion }: { initialOccasion?: string }) {
  const { slug, location, openPicker } = useLocationChoice();
  const [occasion, setOccasion] = useState<string | undefined>(initialOccasion);
  const pkgs = parties.packages.filter((p) => p.active && appliesTo(p.locations, slug) && (!occasion || p.occasions.includes(occasion)));

  return (
    <>
      <section className="bg-birch py-20 text-char" aria-labelledby="occ-h">
        <div className="wrap">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="occ-h" className="display-l">What are we celebrating?</h2>
            <button onClick={openPicker} className="btn btn-sm btn-outline-dark"><Icon name="pin" size={18} /> {location ? `Packages at ${location.name}` : "Select location"}</button>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {parties.occasions.map((o) => {
              const on = occasion === o.id;
              return (
                <li key={o.id}>
                  <button onClick={() => setOccasion(on ? undefined : o.id)} aria-pressed={on}
                    className={`flex h-full w-full flex-col items-start gap-3 rounded-[12px] p-5 text-left transition-all duration-300 ${on ? "bg-maple text-white shadow-[5px_5px_0_#1B1512] border-2 border-char -translate-y-1" : "bg-white stamped hover:-translate-y-1"}`}>
                    <span className={`grid size-12 place-items-center rounded-[10px] ${on ? "bg-white/15" : "bg-birch text-maple-deep"}`}><Icon name={OCC_ICON[o.id] ?? "parties"} size={28} /></span>
                    <span className="font-label text-xl font-extrabold tracking-[.06em] uppercase">{o.name}</span>
                    <span className={`text-[15px] ${on ? "text-white/90" : "text-pine-ash"}`}>{o.blurb}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="grid content-start gap-6">
              <h3 className="heading">Packages</h3>
              {pkgs.map((p) => <PackageCard key={p.id} pkg={p} />)}
              {pkgs.length === 0 && (
                <div className="rounded-[12px] border-2 border-dashed border-char/40 p-6">
                  <p className="font-label text-xl font-extrabold tracking-[.06em] uppercase">Custom-built for your crew</p>
                  <p className="mt-2 text-pine-ash">{parties.groupNote}</p>
                </div>
              )}
            </div>
            <div className="rounded-[12px] bg-char p-6 text-birch sm:p-8">
              <h3 className="heading text-amber">How it works</h3>
              <ol className="mt-6 grid gap-5">
                {[
                  ["Send the enquiry", "Tell us the date, headcount and occasion — takes two minutes."],
                  ["We call you back", "Your location confirms availability, space and package details."],
                  ["Game on", "Show up hungry. We'll handle the wings, the table and the fun."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="pixel grid size-11 shrink-0 place-items-center rounded-[8px] border-2 border-aurora text-aurora">{i + 1}</span>
                    <span><span className="block font-label text-xl font-extrabold tracking-[.06em] uppercase">{t}</span><span className="text-bark">{d}</span></span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section id="enquire" className="relative scroll-mt-24 bg-plaid py-20" aria-labelledby="enq-h">
        <div aria-hidden className="absolute inset-0 bg-char/60" />
        <div className="wrap relative max-w-5xl">
          <h2 id="enq-h" className="display-l text-white">Party enquiry</h2>
          <p className="mt-2 text-white/90">Fields marked * are required.</p>
          <div className="mt-8"><PartyForm initialOccasion={occasion} /></div>
        </div>
      </section>
    </>
  );
}
