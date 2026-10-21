"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Promotion } from "@/lib/schemas";
import { resolveHref, scopeLabel } from "@/lib/content";

/** Weekly feature card — one look per zone: Eat (stamped birch), Drink (spruce scoreboard), Game On (neon CRT). */
export function PromoCard({ p, index = 0 }: { p: Promotion; index?: number }) {
  const href = resolveHref(p.cta.href);
  const external = href.startsWith("http");
  const zone = {
    eat: { box: "bg-white text-char stamped", kicker: "text-maple-deep", muted: "text-pine-ash", btn: "btn-primary", tagCls: "bg-char text-birch" },
    drink: { box: "bg-scoreboard text-birch border-2 border-amber/60", kicker: "text-amber", muted: "text-bark", btn: "btn-amber", tagCls: "bg-amber text-char" },
    game: { box: "bg-scanlines text-birch glow-box", kicker: "text-aurora pixel", muted: "text-bark", btn: "btn-arcade", tagCls: "bg-aurora text-char" },
  }[p.zone];

  const Cta = external ? "a" : Link;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, rotate: index % 2 ? 0.6 : -0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.06 }}
      className={`relative flex min-h-[360px] flex-col gap-3 rounded-[12px] p-6 ${zone.box}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={`text-[15px] font-bold tracking-[.18em] uppercase ${p.zone === "game" ? "pixel text-[14px] tracking-normal text-aurora" : `font-label ${zone.kicker}`}`}>{p.day}</p>
        <span className={`tag ${zone.tagCls}`}>{p.time ?? scopeLabel(p.locations)}</span>
      </div>
      <h3 className={`font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.02] ${p.zone === "game" ? "glow-text" : ""}`}>{p.title}</h3>
      <p className="text-[17px]">{p.body}</p>
      {p.price && <p className="ticket self-start bg-maple px-6 py-2 font-display text-[1.6rem] leading-none text-white">{p.price}</p>}
      {p.takeout && (
        <div className={`flex items-center gap-3 rounded-[8px] border-2 border-dashed p-3 ${p.zone === "eat" ? "border-bark" : "border-current/40"}`}>
          <div className="ticket shrink-0 bg-maple px-5 py-2 text-center text-white">
            <span className="block font-label text-[11px] font-bold tracking-[.18em] uppercase">Takeout</span>
            <span className="block font-display text-[1.4rem] leading-none">{p.takeout.price}</span>
          </div>
          <p className="text-[15px] leading-snug"><strong className="font-label tracking-[.06em] uppercase">{p.takeout.label}:</strong> {p.takeout.detail}</p>
        </div>
      )}
      {p.quote && <p className={`border-l-0 text-[15px] italic ${zone.muted}`}>“{p.quote}”</p>}
      <p className={`text-[14px] ${zone.muted}`}>{p.finePrint}</p>
      <Cta href={href} className={`btn btn-sm ${zone.btn} mt-auto self-start`}>{p.cta.label}</Cta>
    </motion.article>
  );
}
