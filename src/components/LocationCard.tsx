"use client";

import Link from "next/link";
import type { Location } from "@/lib/schemas";
import { directionsUrl, fullAddress, hoursLines, openState, telHref } from "@/lib/hours";
import { Icon } from "./Icon";
import { useLocationChoice } from "./LocationProvider";
import { useEffect, useState } from "react";

const AMENITY_LABELS: Record<keyof Location["amenities"], string> = {
  dineIn: "Dine-in", takeout: "Takeout", bar: "Full bar", sports: "Sports on big screens",
  arcade: "Arcade", vr: "VR", billiards: "Billiards", airHockey: "Air hockey",
};

export function AmenityList({ loc, dark = false }: { loc: Location; dark?: boolean }) {
  const confirmed = (Object.keys(loc.amenities) as (keyof Location["amenities"])[]).filter((k) => loc.amenities[k] === "confirmed");
  const gamesUnconfirmed = loc.status === "open" && loc.amenities.arcade === "unconfirmed";
  return (
    <div>
      <ul className="flex flex-wrap gap-1.5">
        {confirmed.map((k) => (
          <li key={k} className={`tag ${["arcade", "vr", "billiards", "airHockey"].includes(k) ? "bg-char text-aurora" : dark ? "bg-ember text-birch" : "bg-bark text-char"}`}>{AMENITY_LABELS[k]}</li>
        ))}
      </ul>
      {gamesUnconfirmed && <p className={`mt-2 text-[14px] ${dark ? "text-lichen" : "text-pine-ash"}`}>Games line-up varies — call to ask what&apos;s on the floor.</p>}
    </div>
  );
}

export function useOpenState(loc: Location) {
  const [state, setState] = useState<ReturnType<typeof openState>>(null);
  useEffect(() => {
    setState(openState(loc));
    const t = setInterval(() => setState(openState(loc)), 60000);
    return () => clearInterval(t);
  }, [loc]);
  return state;
}

export function LocationCard({ loc, selected = false, onFocus }: { loc: Location; selected?: boolean; onFocus?: () => void }) {
  const { slug, setLocation } = useLocationChoice();
  const mine = slug === loc.slug;
  const closed = loc.status !== "open";
  const state = useOpenState(loc);

  return (
    <article
      onMouseEnter={onFocus}
      className={`relative flex flex-col gap-3 rounded-[12px] p-5 transition-all duration-300 ${closed ? "border-2 border-dashed border-pine-ash bg-bark/60 text-char" : `bg-white text-char ${selected ? "border-2 border-maple shadow-[5px_5px_0_#D52B1E]" : "stamped"}`}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[1.6rem] leading-none">{loc.name}</h3>
          {mine && <p className="mt-1 font-label text-[14px] font-bold tracking-[.14em] text-maple-deep uppercase">★ Your location</p>}
        </div>
        {closed ? (
          <span className="tag shrink-0 bg-char text-amber">Back soon</span>
        ) : state ? (
          <span className={`tag shrink-0 ${state.open ? "bg-spruce text-amber" : "bg-bark text-char"}`}>{state.label}</span>
        ) : null}
      </div>

      {closed ? (
        <p className="text-[17px]">{loc.statusNote} {loc.blurb}</p>
      ) : (
        <>
          <p className="flex gap-2 text-[16px]"><Icon name="pin" size={20} className="mt-0.5 shrink-0 text-maple-deep" /> {fullAddress(loc)}</p>
          {loc.phone && (
            <p className="flex gap-2 text-[16px]"><Icon name="call" size={20} className="mt-0.5 shrink-0 text-maple-deep" /><a href={telHref(loc.phone)} className="underline underline-offset-4 hover:text-maple-deep">{loc.phone}</a></p>
          )}
          <div className="flex gap-2 text-[15px] text-pine-ash">
            <Icon name="clock" size={20} className="mt-0.5 shrink-0 text-maple-deep" />
            <div>{hoursLines(loc).map((h) => <p key={h}>{h}</p>)}{loc.hoursNote && <p>{loc.hoursNote}</p>}</div>
          </div>
          <AmenityList loc={loc} />
        </>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {!closed && (
          <button onClick={() => setLocation(loc.slug)} aria-pressed={mine} className={`btn btn-sm ${mine ? "btn-dark" : "btn-primary"}`}>
            {mine ? <><Icon name="check" size={18} /> Selected</> : "Set as my location"}
          </button>
        )}
        {!closed && <a href={directionsUrl(loc)} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-dark">Directions<span className="sr-only"> to {loc.name} (opens Google Maps)</span></a>}
        {closed && <Link href="/vip" className="btn btn-sm btn-amber">Join VIP for updates</Link>}
        <Link href={`/locations/${loc.slug}`} className="btn btn-sm btn-outline-dark">Details<span className="sr-only"> for {loc.name}</span></Link>
      </div>
    </article>
  );
}
