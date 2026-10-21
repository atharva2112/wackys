"use client";

import { useEffect, useState } from "react";
import { appliesTo, livePromotions, openLocations } from "@/lib/content";
import { PromoCard } from "./PromoCard";
import { useLocationChoice } from "./LocationProvider";

const DAYS = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];

export function SpecialsBoard() {
  const { slug, setLocation } = useLocationChoice();
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    const wd = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", weekday: "long" }).format(new Date());
    setToday(DAYS.indexOf(`${wd}s`));
  }, []);
  const promos = livePromotions().filter((p) => appliesTo(p.locations, slug));
  const byDay = (d: string) => promos.filter((p) => p.day === d);

  return (
    <section className="bg-birch pb-24 text-char" aria-label="Specials board">
      <div className="wrap">
        <div role="radiogroup" aria-label="Location" className="flex flex-wrap gap-2">
          <button role="radio" aria-checked={!slug} onClick={() => setLocation(null)} className={`chip ${!slug ? "border-char bg-char text-birch" : "border-char"}`}>All locations</button>
          {openLocations.map((l) => (
            <button key={l.slug} role="radio" aria-checked={slug === l.slug} onClick={() => setLocation(l.slug)} className={`chip ${slug === l.slug ? "border-maple bg-maple text-white" : "border-char"}`}>{l.name}</button>
          ))}
        </div>

        <ol className="mt-10 grid grid-cols-7 gap-1.5 sm:gap-3" aria-label="This week">
          {DAYS.map((d, i) => {
            const n = byDay(d).length;
            return (
              <li key={d} className={`flex flex-col items-center gap-1 rounded-[10px] border-2 px-1 py-3 text-center ${i === today ? "border-maple bg-maple text-white" : n ? "border-char bg-white" : "border-bark text-pine-ash"}`}>
                <span className="font-label text-[13px] font-extrabold tracking-[.1em] uppercase sm:text-[16px]">{d.slice(0, 3)}</span>
                <span className="font-display text-[1.25rem] leading-none sm:text-[1.75rem]">{n || "–"}</span>
                <span className="sr-only">{n} special{n === 1 ? "" : "s"}{i === today ? " (today)" : ""}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promos.map((p, i) => <PromoCard key={p.id} p={p} index={i} />)}
        </div>
        {promos.length === 0 && <p className="mt-10 rounded-[12px] border-2 border-dashed border-pine-ash p-6">No specials listed for this location right now — call the restaurant or join the VIP Club for updates.</p>}
        <p className="mt-10 max-w-3xl text-[14px] text-pine-ash">Offers can change without notice and may not be combined. Prices exclude applicable taxes. Confirm details with your location before visiting.</p>
      </div>
    </section>
  );
}
