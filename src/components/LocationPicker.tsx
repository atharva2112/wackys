"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { locations } from "@/lib/content";
import { fullAddress } from "@/lib/hours";
import { useLocationChoice } from "./LocationProvider";
import { Icon } from "./Icon";

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export function nearestOpen(pos: { lat: number; lng: number }) {
  return locations
    .filter((l) => l.status === "open")
    .map((l) => ({ l, d: distanceKm(pos, l.geo) }))
    .sort((a, b) => a.d - b.d)[0];
}

export function LocationPicker() {
  const { pickerOpen, closePicker, slug, setLocation } = useLocationChoice();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [geoMsg, setGeoMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    node?.querySelector<HTMLElement>("button, [href]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePicker();
      if (e.key === "Tab" && node) {
        const f = node.querySelectorAll<HTMLElement>("button:not([disabled]), [href]");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus(); };
  }, [pickerOpen, closePicker]);

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) { setGeoMsg("Your browser can't share location — pick from the list."); return; }
    setGeoMsg("Finding the closest Wacky's…");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const near = nearestOpen({ lat: p.coords.latitude, lng: p.coords.longitude });
        if (near) { setLocation(near.l.slug); setGeoMsg(`${near.l.name} is closest (about ${Math.round(near.d)} km).`); setTimeout(closePicker, 900); }
      },
      () => setGeoMsg("Location permission was declined — pick from the list instead."),
      { timeout: 8000, maximumAge: 600000 },
    );
  };

  return (
    <AnimatePresence>
      {pickerOpen && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button aria-label="Close location picker" className="absolute inset-0 bg-char/80 backdrop-blur-sm" onClick={closePicker} tabIndex={-1} />
          <motion.div
            ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="loc-picker-title"
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[12px] bg-birch p-5 text-char sm:rounded-[12px] sm:p-8 stamped"
            initial={{ y: 60, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 60, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="kicker text-maple-deep">Select location</p>
                <h2 id="loc-picker-title" className="display-m mt-1">Where are you eating?</h2>
                <p className="mt-2 text-pine-ash">Offers, hours and ordering will follow your pick for this visit.</p>
              </div>
              <button onClick={closePicker} aria-label="Close" className="grid size-11 shrink-0 place-items-center rounded-[6px] border-2 border-char hover:bg-char hover:text-birch">
                <Icon name="close" />
              </button>
            </div>
            <button onClick={useMyLocation} className="btn btn-sm btn-dark mt-5"><Icon name="locate" size={20} /> Use my location</button>
            <p aria-live="polite" className="mt-2 min-h-6 text-[15px] text-pine-ash">{geoMsg}</p>
            <ul className="mt-2 grid gap-3 sm:grid-cols-2">
              {locations.map((l) => {
                const closed = l.status !== "open";
                const active = l.slug === slug;
                return (
                  <li key={l.slug}>
                    <button
                      disabled={closed}
                      onClick={() => { setLocation(l.slug); closePicker(); }}
                      aria-pressed={active}
                      className={`group flex w-full items-start gap-3 rounded-[12px] border-2 p-4 text-left transition-transform duration-300 ${closed ? "cursor-not-allowed border-bark bg-bark/50 text-pine-ash" : active ? "border-maple bg-white shadow-[5px_5px_0_#D52B1E]" : "border-char bg-white hover:-translate-y-1 hover:shadow-[5px_5px_0_#1B1512]"}`}
                    >
                      <span className={`mt-0.5 ${active ? "text-maple" : ""}`}><Icon name={active ? "check" : "pin"} /></span>
                      <span className="flex-1">
                        <span className="block font-label text-xl font-extrabold uppercase tracking-[.06em]">{l.name}</span>
                        <span className="block text-[15px] leading-snug text-pine-ash">{closed ? l.statusNote : fullAddress(l)}</span>
                        {closed && <span className="tag mt-2 bg-char text-amber">Back soon</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {slug && (
              <button onClick={() => { setLocation(null); closePicker(); }} className="mt-5 font-label font-bold uppercase tracking-[.14em] text-maple-deep underline underline-offset-4">
                Clear my location
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
