"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/content";
import { MOBILE_NAV, NAV } from "./nav";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { useLocationChoice } from "./LocationProvider";
import { useArcade } from "./ArcadeProvider";

export function useOrderLinks() {
  const { location } = useLocationChoice();
  return {
    order: location?.orderUrl ?? site.links.orderOnline,
    reserve: location?.reservationUrl ?? site.links.reservation,
  };
}

export function Header({ logoSrc }: { logoSrc: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState(114);
  const headerRef = useRef<HTMLElement>(null);
  const { location, openPicker } = useLocationChoice();
  const { soundOn, toggleSound, score, blip } = useArcade();
  const links = useOrderLinks();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="bg-maple text-white">
        <Link href="/vip" className="wrap flex h-9 items-center justify-center gap-3 font-label text-[15px] font-extrabold tracking-[.16em] uppercase hover:underline">
          <span aria-hidden>★</span> Sign up for our VIP Club <span aria-hidden>★</span>
        </Link>
      </div>
      <header ref={headerRef} className={`sticky top-0 z-50 bg-char transition-shadow ${scrolled ? "shadow-[0_6px_0_rgba(0,0,0,.25)]" : ""}`}>
        <div className="wrap flex h-[72px] items-center gap-4 lg:gap-6">
          <Link href="/" className="shrink-0" aria-label="Wacky's home">
            <Logo src={logoSrc} />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 lg:block">
            <ul className="flex items-center gap-1 xl:gap-3">
              {NAV.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    onMouseEnter={() => blip("hover")}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex h-[72px] items-center gap-1 px-2 font-label text-[17px] font-bold tracking-[.16em] uppercase transition-colors ${isActive(item.href) ? "text-amber" : "text-birch hover:text-amber"}`}
                  >
                    <span className={isActive(item.href) ? "border-b-[3px] border-amber pb-1" : "pb-1"}>{item.label}</span>
                    {item.children && <Icon name="chevron" size={16} />}
                  </Link>
                  {item.children && (
                    <ul className="invisible absolute left-0 top-full min-w-56 translate-y-2 rounded-b-[12px] border-2 border-t-0 border-ember bg-smoke p-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded-[6px] px-3 py-2.5 font-label text-[16px] font-bold tracking-[.12em] uppercase text-birch hover:bg-ember hover:text-amber">{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li>
                <Link href="/vip" className="flex h-[72px] items-center whitespace-nowrap px-2 font-label text-[17px] font-bold tracking-[.16em] uppercase text-amber hover:text-birch">★ VIP ★</Link>
              </li>
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={openPicker}
              className="hidden h-11 max-w-[210px] items-center gap-2 rounded-[6px] border-2 border-ember px-3 text-left text-birch hover:border-amber md:flex"
              aria-label={location ? `Your location: ${location.name}. Change location` : "Choose your location"}
            >
              <Icon name="pin" size={20} className="shrink-0 text-amber" />
              <span className="truncate font-label text-[15px] font-bold tracking-[.1em] uppercase">{location ? location.name : "Select location"}</span>
            </button>
            <button
              onClick={toggleSound}
              aria-pressed={soundOn}
              aria-label={soundOn ? "Turn arcade sounds off" : "Turn arcade sounds on"}
              title={soundOn ? "Arcade sounds on" : "Arcade sounds off"}
              className="hidden size-11 place-items-center rounded-[6px] border-2 border-ember text-birch hover:border-aurora hover:text-aurora sm:grid"
            >
              <Icon name={soundOn ? "sound" : "mute"} size={20} />
            </button>
            <span className="pixel hidden min-w-[92px] rounded-[6px] bg-crt px-2 py-1 text-center text-[12px] leading-tight text-aurora xl:block" aria-label={`Fun score ${score}`}>
              1UP<br />{String(score).padStart(6, "0")}
            </span>
            <a href={links.reserve} className="btn btn-sm btn-outline-light hidden xl:inline-flex">Reservation</a>
            <a href={links.order} className="btn btn-sm btn-primary">Order<span className="hidden sm:inline">&nbsp;Online</span></a>
            <button
              className="grid size-11 place-items-center rounded-[6px] border-2 border-ember text-birch lg:hidden"
              aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => { setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 114); setOpen((o) => !o); }}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
        <div className="red-rule" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-char lg:hidden"
            style={{ top: menuTop }}
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile" className="wrap flex flex-col gap-1 py-6">
              {MOBILE_NAV.map((item, i) => (
                <motion.div key={item.href + item.label} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04, type: "spring", stiffness: 300, damping: 24 }}>
                  <Link href={item.href} className={`block border-b-2 border-ember py-3 font-display text-[clamp(1.75rem,8vw,2.5rem)] leading-none ${isActive(item.href) ? "text-amber" : "text-birch"}`}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 grid gap-3">
                <button onClick={() => { setOpen(false); openPicker(); }} className="btn btn-outline-light">
                  <Icon name="pin" size={20} /> {location ? location.name : "Select location"}
                </button>
                <a href={links.reserve} className="btn btn-amber">Reserve a table</a>
                <button onClick={toggleSound} aria-pressed={soundOn} className="btn btn-arcade">{soundOn ? "Sound: on" : "Sound: off"}</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
