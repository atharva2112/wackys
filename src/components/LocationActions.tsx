"use client";

import { getLocation } from "@/lib/content";
import { useLocationChoice } from "./LocationProvider";
import { useOpenState } from "./LocationCard";
import { Icon } from "./Icon";

export function SetLocationButton({ slug }: { slug: string }) {
  const { slug: mine, setLocation } = useLocationChoice();
  const on = mine === slug;
  return (
    <button onClick={() => setLocation(slug)} aria-pressed={on} className={`btn ${on ? "btn-outline-light" : "btn-outline-light"}`}>
      {on ? <><Icon name="check" size={20} /> My location</> : "Set as my location"}
    </button>
  );
}

export function OpenNow({ slug }: { slug: string }) {
  const loc = getLocation(slug)!;
  const state = useOpenState(loc);
  if (!state) return <p className="font-label text-lg font-bold tracking-[.1em] text-lichen uppercase">Call for today&apos;s hours</p>;
  return (
    <p className={`inline-flex items-center gap-2 rounded-[6px] px-3 py-1.5 font-label text-lg font-extrabold tracking-[.1em] uppercase ${state.open ? "bg-spruce text-amber" : "bg-ember text-birch"}`}>
      <span className={`size-2.5 rounded-full ${state.open ? "animate-blink bg-aurora" : "bg-lichen"}`} aria-hidden /> {state.label}
    </p>
  );
}
