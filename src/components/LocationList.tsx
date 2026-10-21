"use client";

import Link from "next/link";
import { useState } from "react";
import { locations } from "@/lib/content";
import { telHref } from "@/lib/hours";
import { NorthMap } from "./NorthMap";
import { useLocationChoice } from "./LocationProvider";
import { useOpenState } from "./LocationCard";
import type { Location } from "@/lib/schemas";
import { Icon } from "./Icon";

function Row({ loc, active, onHover }: { loc: Location; active: boolean; onHover: () => void }) {
  const { slug, setLocation } = useLocationChoice();
  const state = useOpenState(loc);
  const closed = loc.status !== "open";
  const mine = slug === loc.slug;
  return (
    <li onMouseEnter={onHover} onFocus={onHover} className={`flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[12px] border-2 p-4 transition-colors ${active ? "border-amber bg-smoke" : "border-ember"}`}>
      <div className="min-w-0 basis-full sm:basis-0 sm:flex-1">
        <Link href={`/locations/${loc.slug}`} className="font-display text-[1.4rem] leading-none hover:text-amber">{loc.name}</Link>
        <p className="mt-1 text-[15px] text-lichen">
          {closed ? loc.statusNote : <>{loc.address.street} · {loc.phone && <a className="underline underline-offset-4 hover:text-aurora" href={telHref(loc.phone)}>{loc.phone}</a>}</>}
        </p>
      </div>
      {closed ? <span className="tag bg-ember text-amber">Back soon</span> : state && <span className={`tag ${state.open ? "bg-spruce text-amber" : "bg-ember text-birch"}`}>{state.label}</span>}
      {!closed && (
        <button onClick={() => setLocation(loc.slug)} aria-pressed={mine} className={`btn btn-sm ${mine ? "btn-amber" : "btn-outline-light"}`}>
          {mine ? <><Icon name="check" size={18} /> Mine</> : "Set as mine"}<span className="sr-only"> — {loc.name}</span>
        </button>
      )}
    </li>
  );
}

/** Condensed finder for the homepage — the full search/filter experience lives on /locations. */
export function LocationList() {
  const { slug } = useLocationChoice();
  const [hover, setHover] = useState<string | null>(null);
  const active = hover ?? slug;
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
      <NorthMap selected={active} onSelect={(s) => setHover(s)} />
      <div>
        <ul className="grid gap-3">
          {locations.map((l) => <Row key={l.slug} loc={l} active={active === l.slug} onHover={() => setHover(l.slug)} />)}
        </ul>
        <Link href="/locations" className="btn btn-amber mt-6">Hours, directions & details <Icon name="arrow" size={20} /></Link>
      </div>
    </div>
  );
}
