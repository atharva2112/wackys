"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { appliesTo, menu, site } from "@/lib/content";
import { useLocationChoice } from "./LocationProvider";
import { useOrderLinks } from "./Header";
import { Icon } from "./Icon";

export function MenuBrowser() {
  const { slug, location, openPicker } = useLocationChoice();
  const { order } = useOrderLinks();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(menu.categories[0].id);
  const [diet, setDiet] = useState<string | null>(null);

  const dietary = useMemo(() => [...new Set(menu.categories.flatMap((c) => c.items.flatMap((i) => i.dietary)))], []);

  const cats = useMemo(() => menu.categories.map((c) => ({
    ...c,
    items: c.items.filter((i) =>
      i.available && appliesTo(i.locations, slug) &&
      (!diet || i.dietary.includes(diet)) &&
      (!q || `${i.name} ${i.description ?? ""} ${i.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())),
    ),
  })).filter((c) => c.items.length > 0), [q, diet, slug]);

  // Highlight the category tab whose section is on screen.
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActive(vis.target.id);
    }, { rootMargin: "-30% 0px -60% 0px" });
    cats.forEach((c) => { const el = document.getElementById(c.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [cats]);

  return (
    <div className="bg-birch text-char">
      <div className="sticky top-[78px] z-30 border-b-2 border-char bg-birch/95 backdrop-blur">
        <div className="wrap flex flex-col gap-3 py-3 lg:flex-row lg:items-center">
          <nav aria-label="Menu categories" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:flex-1 lg:px-0">
            <ul className="flex gap-2">
              {cats.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} aria-current={active === c.id ? "true" : undefined}
                    className={`chip whitespace-nowrap transition-colors ${active === c.id ? "border-maple bg-maple text-white" : "border-char hover:bg-char hover:text-birch"}`}>
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-2">
            <label className="relative flex-1 lg:w-64">
              <span className="sr-only">Search the menu</span>
              <Icon name="search" size={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-pine-ash" />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the menu" className="field !min-h-[44px] !pl-10" />
            </label>
            {dietary.map((d) => (
              <button key={d} aria-pressed={diet === d} onClick={() => setDiet(diet === d ? null : d)}
                className={`chip whitespace-nowrap ${diet === d ? "border-spruce bg-spruce text-amber" : "border-char"}`}>{d}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="mb-8 text-[15px] text-pine-ash" aria-live="polite">
            {location ? <>Showing items for <strong>{location.name}</strong>. </> : null}{menu.note}
          </p>
          <AnimatePresence initial={false}>
            {cats.map((c) => (
              <motion.section key={c.id} id={c.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="scroll-mt-48 pb-14" aria-labelledby={`${c.id}-h`}>
                <div className="flex items-end justify-between gap-4 border-b-4 border-char pb-3">
                  <div>
                    <p className="kicker text-maple-deep">{c.kicker}</p>
                    <h2 id={`${c.id}-h`} className="display-l mt-1">{c.name}</h2>
                  </div>
                  {c.id === "wings" && <Link href="/flavours" className="link-arrow hidden text-maple-deep sm:inline">Pick a flavour →</Link>}
                </div>
                <p className="mt-3 max-w-2xl text-[17px] text-ember">{c.blurb}</p>
                <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                  {c.items.map((i, idx) => (
                    <motion.li key={i.id} layout initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (idx % 4) * 0.05 }}
                      className="group border-b-2 border-dashed border-bark py-5">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-label text-[1.375rem] font-extrabold tracking-[.04em] uppercase transition-colors group-hover:text-maple-deep">{i.name}</h3>
                        <span aria-hidden className="mb-1 flex-1 border-b-2 border-dotted border-pine-ash/40" />
                        <span className="font-display text-[1.1rem] text-maple-deep">{i.price ?? <span className="font-label text-[13px] font-bold tracking-[.12em] text-pine-ash uppercase">Price at location</span>}</span>
                      </div>
                      {i.description && <p className="mt-1.5 text-[16px] text-ember">{i.description}</p>}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {i.sizes.map((s) => <span key={s} className="tag bg-white text-char ring-2 ring-bark">{s}</span>)}
                        {i.tags.map((t) => <span key={t} className="tag bg-amber text-char">{t}</span>)}
                        {i.dietary.map((d) => <span key={d} className="tag bg-spruce text-amber">{d}</span>)}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </AnimatePresence>
          {cats.length === 0 && <p className="rounded-[12px] border-2 border-dashed border-pine-ash p-8 text-center">Nothing matches “{q}”. Try “wings”, “poutine” or “burger”.</p>}
        </div>

        <aside className="lg:sticky lg:top-48 lg:self-start" aria-label="Order and menu documents">
          <div className="rounded-[12px] bg-char p-6 text-birch">
            <p className="label-s text-amber">Hungry now?</p>
            <p className="mt-2 font-display text-[1.75rem] leading-none">Order online for pickup</p>
            <a href={order} className="btn btn-primary mt-5 w-full">Order online</a>
            <button onClick={openPicker} className="btn btn-sm btn-outline-light mt-3 w-full"><Icon name="pin" size={18} /> {location?.name ?? "Select location"}</button>
          </div>
          <div className="mt-5 rounded-[12px] bg-white p-6 stamped">
            <p className="label-s text-maple-deep">Official menus</p>
            <ul className="mt-3 space-y-2">
              <li><a href={site.links.officialMenu} className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">Main menu <Icon name="external" size={16} /></a></li>
              <li><a href={site.links.dineInMenu} className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">Dine-in menu <Icon name="external" size={16} /></a></li>
              <li><a href={site.links.ayce} className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">AYCE Wednesday menu <Icon name="external" size={16} /></a></li>
            </ul>
            <p className="mt-4 text-[14px] text-pine-ash">{menu.allergenNote}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
