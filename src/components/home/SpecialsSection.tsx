"use client";

import Link from "next/link";
import { appliesTo, livePromotions } from "@/lib/content";
import { PromoCard } from "../PromoCard";
import { useLocationChoice } from "../LocationProvider";
import { SplitHeadline } from "../SplitHeadline";
import { Icon } from "../Icon";

export function SpecialsSection() {
  const { slug, location, openPicker } = useLocationChoice();
  const promos = livePromotions().filter((p) => p.featured && appliesTo(p.locations, slug));
  return (
    <section className="relative overflow-hidden bg-birch py-20 text-char sm:py-28" aria-labelledby="specials-title">
      <div aria-hidden className="absolute inset-x-0 top-0 h-3 bg-plaid" />
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker text-maple-deep">Wacky features</p>
            <SplitHeadline id="specials-title" lines={["Enjoy these", "all year long"]} accentIndex={1} accentClass="text-maple" className="display-l mt-2" />
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <button onClick={openPicker} className="inline-flex items-center gap-2 rounded-[6px] border-2 border-char bg-white px-4 py-2 font-label text-[16px] font-bold tracking-[.12em] uppercase hover:bg-char hover:text-birch">
              <Icon name="pin" size={18} /> {location ? `Offers at ${location.name}` : "Showing all locations"}
            </button>
            <Link href="/specials" className="link-arrow text-maple-deep">See all features →</Link>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promos.map((p, i) => <PromoCard key={p.id} p={p} index={i} />)}
        </div>
        {promos.length === 0 && <p className="mt-10 rounded-[12px] border-2 border-dashed border-pine-ash p-6">No featured offers at this location right now — check back soon or join the VIP Club.</p>}
      </div>
    </section>
  );
}
