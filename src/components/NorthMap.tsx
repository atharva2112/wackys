"use client";

import { motion } from "motion/react";
import { locations } from "@/lib/content";

const B = { minLng: -92.2, maxLng: -78.6, minLat: 45.3, maxLat: 49.4 };
const W = 1000, H = 520;
const px = (lng: number) => ((lng - B.minLng) / (B.maxLng - B.minLng)) * W;
const py = (lat: number) => ((B.maxLat - lat) / (B.maxLat - B.minLat)) * H;
const poly = (pts: [number, number][]) => pts.map(([lng, lat]) => `${px(lng).toFixed(1)},${py(lat).toFixed(1)}`).join(" ");

const SUPERIOR: [number, number][] = [[-92.1, 46.75], [-90.4, 46.6], [-88.4, 47.4], [-87.6, 46.5], [-86.0, 46.6], [-84.6, 46.5], [-84.4, 46.9], [-84.8, 47.6], [-85.7, 47.95], [-86.5, 48.7], [-88.2, 48.95], [-89.2, 48.4], [-89.6, 48.0], [-90.8, 47.6]];
const HURON: [number, number][] = [[-84.4, 45.3], [-84.0, 46.0], [-83.4, 46.2], [-82.4, 46.15], [-81.7, 46.1], [-80.9, 45.95], [-80.6, 45.7], [-80.2, 45.4], [-80.0, 45.3]];
const NIPISSING: [number, number][] = [[-80.0, 46.27], [-79.6, 46.33], [-79.4, 46.22], [-79.7, 46.14], [-80.0, 46.17]];

/** Stylised (not to scale) map of the Wacky's region. Pins are real buttons, so it works by keyboard. */
export function NorthMap({ selected, onSelect }: { selected: string | null; onSelect: (slug: string) => void }) {
  return (
    <div className="relative aspect-[1000/520] w-full overflow-hidden rounded-[12px] border-2 border-amber/50 bg-scoreboard">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="water" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 5 Q2.5 2 5 5 T10 5" stroke="#3EF0A6" strokeOpacity=".18" fill="none" />
          </pattern>
        </defs>
        {[SUPERIOR, HURON, NIPISSING].map((p, i) => (
          <polygon key={i} points={poly(p)} fill="#120E0C" fillOpacity=".65" stroke="#FFC23D" strokeOpacity=".45" strokeWidth="2" strokeLinejoin="round" />
        ))}
        {[SUPERIOR, HURON].map((p, i) => <polygon key={`w${i}`} points={poly(p)} fill="url(#water)" />)}
        <text x={px(-87.6)} y={py(47.8)} textAnchor="middle" fill="#FFC23D" fillOpacity=".55" fontFamily="var(--font-barlow-condensed)" fontWeight="700" fontSize="18" letterSpacing="5">LAKE SUPERIOR</text>
        <text x={px(-82.2)} y={py(45.6)} textAnchor="middle" fill="#FFC23D" fillOpacity=".55" fontFamily="var(--font-barlow-condensed)" fontWeight="700" fontSize="16" letterSpacing="5">LAKE HURON</text>
        {/* route line linking the restaurants, east to west */}
        <polyline
          points={poly([[-79.46, 46.34], [-80.99, 46.49], [-81.33, 48.48], [-84.31, 46.54], [-89.25, 48.41]])}
          fill="none" stroke="#D52B1E" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round"
        />
      </svg>
      {locations.map((l, i) => {
        const left = (px(l.geo.lng) / W) * 100;
        const top = (py(l.geo.lat) / H) * 100;
        const active = selected === l.slug;
        const closed = l.status !== "open";
        // The two Sault Ste. Marie pins sit on top of each other; nudge them apart.
        const nudge = l.slug === "ssm-lake-street" ? -14 : l.slug === "ssm-great-northern" ? 14 : 0;
        return (
          <motion.button
            key={l.slug}
            onClick={() => onSelect(l.slug)}
            aria-pressed={active}
            aria-label={`${l.name}${closed ? " (temporarily closed)" : ""}`}
            className="group absolute -translate-x-1/2 -translate-y-full focus-visible:z-10"
            style={{ left: `${left}%`, top: `${top}%`, marginLeft: nudge }}
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.1 + i * 0.08 }}
          >
            <span className={`absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-[4px] px-2 py-0.5 font-label text-[13px] font-extrabold tracking-[.08em] uppercase sm:block ${l.slug === "ssm-lake-street" ? "top-full mt-1" : "bottom-full mb-1"} ${active ? "bg-amber text-char" : "bg-char/90 text-birch group-hover:bg-amber group-hover:text-char"}`}>
              {l.name}
            </span>
            <svg viewBox="0 0 24 32" className={`mx-auto transition-transform duration-300 ${active ? "w-9 scale-110" : "w-7 group-hover:scale-110"}`} aria-hidden>
              <path d="M12 1C6 1 1.5 5.5 1.5 11.3 1.5 19 12 31 12 31s10.5-12 10.5-19.7C22.5 5.5 18 1 12 1z" fill={closed ? "#6E5B4C" : active ? "#FFC23D" : "#D52B1E"} stroke="#1B1512" strokeWidth="2" />
              <circle cx="12" cy="11.5" r="4" fill="#F5EEE2" />
            </svg>
          </motion.button>
        );
      })}
      <p className="absolute bottom-2 right-3 font-label text-[12px] font-bold tracking-[.14em] text-amber/70 uppercase">Not to scale</p>
    </div>
  );
}
