"use client";

import { useMemo, useState } from "react";
import { locations } from "@/lib/content";
import { LocationCard } from "./LocationCard";
import { NorthMap } from "./NorthMap";
import { Icon } from "./Icon";
import { nearestOpen } from "./LocationPicker";
import { useLocationChoice } from "./LocationProvider";

const FILTERS = [
  { id: "open", label: "Open now (published hours)" },
  { id: "arcade", label: "Arcade confirmed" },
  { id: "takeout", label: "Takeout" },
] as const;

export function LocationFinder() {
  const { slug: mySlug } = useLocationChoice();
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const list = useMemo(() => locations.filter((l) => {
    const hay = `${l.name} ${l.city} ${l.address.street} ${l.address.postal ?? ""}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase().trim())) return false;
    if (filters.includes("arcade") && l.amenities.arcade !== "confirmed") return false;
    if (filters.includes("takeout") && (l.status !== "open" || l.amenities.takeout !== "confirmed")) return false;
    if (filters.includes("open") && !(l.status === "open" && l.hours)) return false;
    return true;
  }), [q, filters]);

  const locate = () => {
    if (!("geolocation" in navigator)) return setMsg("Location isn't available in this browser.");
    setMsg("Finding the closest Wacky's…");
    navigator.geolocation.getCurrentPosition((p) => {
      const n = nearestOpen({ lat: p.coords.latitude, lng: p.coords.longitude });
      if (n) { setSelected(n.l.slug); setMsg(`Closest: ${n.l.name}, about ${Math.round(n.d)} km away.`); document.getElementById(`loc-${n.l.slug}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }
    }, () => setMsg("Permission declined — search by city instead."));
  };

  const active = selected ?? mySlug;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <NorthMap selected={active} onSelect={(s) => { setSelected(s); document.getElementById(`loc-${s}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }} />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search by city, street or postal code</span>
            <Icon name="search" size={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-pine-ash" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="City, street or postal code" className="field !pl-10" />
          </label>
          <button onClick={locate} className="btn btn-amber"><Icon name="locate" size={20} /> Near me</button>
        </div>
        <p aria-live="polite" className="mt-2 min-h-6 text-[15px] text-lichen">{msg}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f.id} aria-pressed={filters.includes(f.id)}
              onClick={() => setFilters((x) => (x.includes(f.id) ? x.filter((y) => y !== f.id) : [...x, f.id]))}
              className={`chip ${filters.includes(f.id) ? "border-amber bg-amber text-char" : "border-ember text-birch hover:border-amber"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-[15px] text-lichen" aria-live="polite">{list.length} location{list.length === 1 ? "" : "s"}</p>
        <ul className="grid gap-5">
          {list.map((l) => (
            <li key={l.slug} id={`loc-${l.slug}`} className="scroll-mt-32">
              <LocationCard loc={l} selected={active === l.slug} onFocus={() => setSelected(l.slug)} />
            </li>
          ))}
        </ul>
        {list.length === 0 && <p className="rounded-[12px] border-2 border-dashed border-ember p-6 text-lichen">No locations match — clear a filter or try another city.</p>}
      </div>
    </div>
  );
}
