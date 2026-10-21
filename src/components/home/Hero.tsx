"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/content";
import { SplitHeadline } from "../SplitHeadline";
import { Marquee } from "../Marquee";
import { Splash, Star, Token, WingPile, MapleLeaf, Joystick, TicketStrip } from "../Art";
import { MediaSlot } from "../MediaSlot";
import { useOrderLinks } from "../Header";
import { Icon } from "../Icon";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { order } = useOrderLinks();

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero='kicker']", { y: 20, opacity: 0, duration: 0.7 }, 0.15)
        .from("[data-hero='plate']", { scale: 0.4, rotate: -40, opacity: 0, duration: 1.4, ease: "back.out(1.4)" }, 0.1)
        .from("[data-hero='splash']", { scale: 0, opacity: 0, duration: 0.9, stagger: 0.08, ease: "back.out(2.4)" }, 0.45)
        .from("[data-hero='float']", { y: 60, opacity: 0, duration: 1, stagger: 0.07 }, 0.6)
        .from("[data-hero='body']", { y: 24, opacity: 0, duration: 0.8 }, 0.75)
        .from("[data-hero='cta'] > *", { y: 30, scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(2)" }, 0.9);

      // Scroll: plate drifts and spins, headline lifts away.
      gsap.to("[data-hero='plate']", { yPercent: 18, rotate: 25, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-hero='copy']", { yPercent: -12, opacity: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "30% top", end: "bottom top", scrub: true } });

      // Pointer parallax on desktop.
      if (window.matchMedia("(pointer: fine)").matches) {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((n) => ({
          x: gsap.quickTo(n, "x", { duration: 0.8, ease: "power3" }),
          y: gsap.quickTo(n, "y", { duration: 0.8, ease: "power3" }),
          d: Number(n.dataset.depth),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => { l.x(nx * l.d * 60); l.y(ny * l.d * 60); });
        };
        el.addEventListener("pointermove", onMove);
        return () => el.removeEventListener("pointermove", onMove);
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate overflow-hidden bg-char" aria-labelledby="hero-title">
      {/* warm light + log-wall horizon */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_72%_45%,rgba(213,43,30,.38),transparent_65%),radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(245,130,31,.25),transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-cedar opacity-25 [mask-image:linear-gradient(to_top,#000,transparent)]" />

      <div className="wrap grid min-h-[calc(100svh-114px)] items-center gap-8 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-16">
        <div data-hero="copy" className="relative z-10">
          <p data-hero="kicker" className="kicker text-sauce">{site.homepage.heroKicker}</p>
          <SplitHeadline
            as="h1"
            lines={["Eat. Drink.", "Game On!"]}
            accentIndex={1}
            onScroll={false}
            delay={0.25}
            className="display-xl mt-4"
            id="hero-title"
          />
          <p data-hero="body" className="body-l mt-6 max-w-[34rem] text-bark">{site.homepage.heroBody}</p>
          <div data-hero="cta" className="mt-8 flex flex-wrap gap-3">
            <a href={order} className="btn btn-primary !min-h-[58px] !px-8 !text-[1.25rem]">Order now <Icon name="arrow" size={22} /></a>
            <Link href="/menu" className="btn btn-outline-light !min-h-[58px] !px-8 !text-[1.25rem]">Explore the menu</Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[620px]">
          <div data-depth="0.3" className="absolute inset-0">
            <div data-hero="plate" className="absolute inset-[4%]">
              {site.homepage.heroImage ? (
                <MediaSlot src={site.homepage.heroImage} alt="A pile of saucy Wacky's wings" expected="wings.webp" className="h-full w-full rounded-full" priority />
              ) : (
                <WingPile className="h-full w-full" />
              )}
              {/* rotating flavour ring */}
              <svg viewBox="0 0 200 200" className="animate-spin-slow absolute -inset-[5%] h-[110%] w-[110%]" aria-hidden>
                <defs><path id="ring" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" /></defs>
                <text fill="#FFC23D" fontFamily="var(--font-barlow-condensed)" fontWeight="800" fontSize="10.5" letterSpacing="4.2">
                  <textPath href="#ring">100+ FLAVOURS ★ HAND-TOSSED ★ WET OR DRY ★ 100+ FLAVOURS ★ HAND-TOSSED ★</textPath>
                </text>
              </svg>
            </div>
          </div>
          {/* splashes & sparks */}
          <div data-depth="0.6" className="pointer-events-none absolute inset-0" aria-hidden>
            <div data-hero="splash" className="absolute -left-[4%] top-[8%] w-[26%] opacity-90"><Splash color="#F5821F" /></div>
            <div data-hero="splash" className="absolute -right-[2%] bottom-[10%] w-[22%] rotate-45 opacity-90"><Splash color="#D52B1E" /></div>
            <div data-hero="splash" className="absolute right-[12%] top-[0%] w-[12%] opacity-80"><Splash color="#FFC23D" /></div>
          </div>
          <div data-depth="1" className="pointer-events-none absolute inset-0" aria-hidden>
            <div data-hero="float" className="absolute left-[2%] bottom-[16%] w-[15%]"><Token className="animate-float w-full" style={{ ["--r" as string]: "-12deg" }} /></div>
            <div data-hero="float" className="absolute right-[0%] top-[30%] w-[13%]"><Joystick className="animate-float w-full" style={{ animationDelay: "1s", ["--r" as string]: "10deg" }} /></div>
            <div data-hero="float" className="absolute left-[18%] top-[-2%] w-[7%]"><Star className="animate-float w-full" style={{ animationDelay: ".5s" }} /></div>
            <div data-hero="float" className="absolute bottom-[2%] right-[26%] w-[8%]"><MapleLeaf className="animate-float w-full" style={{ animationDelay: "2s", ["--r" as string]: "20deg" }} /></div>
            <div data-hero="float" className="absolute -bottom-[2%] left-[24%] w-[30%] -rotate-6"><TicketStrip className="w-full" text="GAME ON!" /></div>
            {/* steam */}
            {[0, 1, 2].map((i) => (
              <span key={i} className="absolute top-[30%] block h-16 w-6 rounded-full bg-birch/30 blur-md"
                style={{ left: `${40 + i * 9}%`, animation: `rise ${3.2 + i * 0.6}s ease-out ${i * 0.9}s infinite` }} />
            ))}
            {/* flavour sparks */}
            {Array.from({ length: 10 }, (_, i) => (
              <span key={`s${i}`} className="absolute block size-1.5 rounded-full"
                style={{ left: `${20 + ((i * 37) % 60)}%`, top: `${55 + ((i * 23) % 30)}%`, background: i % 3 ? "#FFC23D" : "#F5821F", animation: `rise ${2.4 + (i % 4) * 0.5}s ease-out ${(i * 0.37) % 2.5}s infinite`, boxShadow: "0 0 8px currentColor" }} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative -rotate-1 border-y-4 border-char bg-maple py-3 font-label text-[clamp(1.1rem,2.4vw,1.6rem)] font-extrabold tracking-[.14em] text-white uppercase">
        <Marquee items={["100+ wing flavours", "Full bar & MEGAS", "Arcade & VR", "Sports on every wall", "Kids eat free Sundays", "AYCE wings Wednesdays", "Est. 2007 · Northern Ontario"]} />
      </div>
    </section>
  );
}
