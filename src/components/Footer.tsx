"use client";

import Link from "next/link";
import { site } from "@/lib/content";
import { fullAddress, telHref } from "@/lib/hours";
import { FOOTER_NAV } from "./nav";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Star, Token, MapleLeaf } from "./Art";
import { useLocationChoice } from "./LocationProvider";

export function Footer({ logoSrc }: { logoSrc: string | null }) {
  const { location, openPicker } = useLocationChoice();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-char text-birch">
      <div className="h-10 bg-cedar" aria-hidden />
      <div className="red-rule" />

      <div className="relative overflow-hidden">
        <Token className="animate-float absolute bottom-24 right-[8%] hidden w-20 md:block" style={{ ["--r" as string]: "12deg" }} />
        <Star className="animate-float absolute bottom-52 right-[22%] hidden w-7 md:block" style={{ animationDelay: "1.2s" }} />
        <MapleLeaf className="animate-float absolute bottom-40 right-[34%] hidden w-8 opacity-60 md:block" style={{ animationDelay: "2s", ["--r" as string]: "-20deg" }} />

        <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col items-start gap-5">
            <Logo src={logoSrc} size="lg" />
            <p className="max-w-sm text-lichen">Arcade, bar and restaurant. Visit Wacky&apos;s today — reserve a table right now.</p>
            <div className="w-full max-w-sm rounded-[12px] border-2 border-ember p-4">
              <p className="label-s text-amber">Your Wacky&apos;s</p>
              {location ? (
                <div className="mt-2 space-y-1 text-[15px]">
                  <p className="font-label text-xl font-extrabold tracking-[.06em] uppercase">{location.name}</p>
                  <p className="text-lichen">{location.status === "open" ? fullAddress(location) : location.statusNote}</p>
                  {location.phone && <a className="inline-block text-aurora underline underline-offset-4" href={telHref(location.phone)}>{location.phone}</a>}
                </div>
              ) : (
                <p className="mt-2 text-[15px] text-lichen">Pick a location to see its address and phone here.</p>
              )}
              <button onClick={openPicker} className="mt-3 font-label font-bold tracking-[.14em] text-birch uppercase underline underline-offset-4 hover:text-amber">
                {location ? "Change location" : "Select location"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {([["Explore", FOOTER_NAV.explore], ["Company", FOOTER_NAV.company], ["Website", FOOTER_NAV.legal]] as const).map(([title, items]) => (
              <nav key={title} aria-label={`Footer ${title}`}>
                <h2 className="label-s text-amber">{title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {items.map((i) => (
                    <li key={i.href}><Link href={i.href} className="text-[16px] text-birch/90 hover:text-amber">{i.label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="label-s text-amber">Follow us</h2>
              <ul className="mt-4 space-y-2.5">
                {site.social.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 break-all text-[16px] text-birch/90 hover:text-aurora">
                      <Icon name={s.network} size={18} className="shrink-0" /> {s.handle}
                      <span className="sr-only">({s.label}, opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="wrap pb-4" aria-hidden>
          <p className="select-none font-display text-[clamp(2.75rem,11vw,10.5rem)] leading-[.88] tracking-[-.02em] text-smoke">
            Eat, Drink,<br /><span className="text-maple">Game On!</span>
          </p>
        </div>

        <div className="border-t-2 border-ember">
          <div className="wrap flex flex-col gap-2 py-5 text-[14px] text-lichen sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Wackys. All rights reserved.</p>
            <p className="pixel text-aurora">INSERT COIN TO CONTINUE<span className="animate-blink">_</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
