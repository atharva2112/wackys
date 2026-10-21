"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, drinks, games } from "@/lib/content";
import { MediaSlot } from "../MediaSlot";
import { Icon } from "../Icon";
import { WingArt, Splash } from "../Art";
import { useLocationChoice } from "../LocationProvider";

function Glass() {
  return (
    <svg viewBox="0 0 220 320" className="w-full" aria-hidden>
      <defs>
        <clipPath id="glass-clip"><path d="M40 40h140l-14 250a14 14 0 0 1-14 13H68a14 14 0 0 1-14-13z" /></clipPath>
        <linearGradient id="beer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC23D" /><stop offset="1" stopColor="#F5821F" /></linearGradient>
      </defs>
      <g clipPath="url(#glass-clip)">
        <rect x="0" y="0" width="220" height="320" fill="#120E0C" opacity=".35" />
        <g className="glass-fill">
          <path className="glass-wave" d="M-220 92 Q-165 78 -110 92 T0 92 T110 92 T220 92 T330 92 T440 92 V330 H-220z" fill="url(#beer)" />
          <path className="glass-wave glass-wave-2" d="M-220 86 Q-165 74 -110 86 T0 86 T110 86 T220 86 T330 86 T440 86 V96 H-220z" fill="#F5EEE2" opacity=".95" />
        </g>
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} className="glass-bubble" cx={70 + ((i * 19) % 90)} cy="300" r={2 + (i % 3)} fill="#F5EEE2" opacity=".7" style={{ animationDelay: `${(i * 0.45) % 3}s`, animationDuration: `${2.6 + (i % 4) * 0.5}s` }} />
        ))}
      </g>
      <path d="M40 40h140l-14 250a14 14 0 0 1-14 13H68a14 14 0 0 1-14-13z" fill="none" stroke="#F5EEE2" strokeWidth="5" strokeLinejoin="round" />
      <path d="M180 92h12a22 22 0 0 1 0 44h-16" fill="none" stroke="#F5EEE2" strokeWidth="5" strokeLinecap="round" />
      {/* reflections */}
      <path d="M62 60l-6 200" stroke="#fff" strokeOpacity=".5" strokeWidth="7" strokeLinecap="round" />
      <path d="M78 70l-3 60" stroke="#fff" strokeOpacity=".35" strokeWidth="4" strokeLinecap="round" />
      <style>{`
        .glass-wave{animation:wave 3.2s linear infinite}
        .glass-wave-2{animation-duration:2.4s}
        .glass-fill{animation:pour 2.6s cubic-bezier(.16,1,.3,1) both}
        .glass-bubble{animation:bubble 3s ease-in infinite}
        @keyframes wave{to{transform:translateX(220px)}}
        @keyframes pour{from{transform:translateY(220px)}to{transform:translateY(0)}}
        @keyframes bubble{from{transform:translateY(0);opacity:0}20%{opacity:.8}to{transform:translateY(-200px);opacity:0}}
      `}</style>
    </svg>
  );
}

export function EatDrinkGame() {
  const ref = useRef<HTMLDivElement>(null);
  const { location, openPicker } = useLocationChoice();

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-zone]").forEach((zone, i) => {
        // Each zone wipes in over the last: circle (Eat), diagonal (Drink), CRT power-on (Game On).
        const from = ["circle(0% at 50% 100%)", "polygon(0 0, 0 0, 0 100%, 0 100%)", "inset(49% 0 49% 0)"][i];
        const to = ["circle(150% at 50% 100%)", "polygon(0 0, 130% 0, 100% 100%, 0 100%)", "inset(0% 0 0% 0)"][i];
        gsap.fromTo(zone, { clipPath: from }, { clipPath: to, ease: "none", scrollTrigger: { trigger: zone, start: "top 95%", end: "top 30%", scrub: 0.6 } });
        gsap.from(zone.querySelectorAll("[data-zone-item]"), { y: 60, opacity: 0, stagger: 0.08, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: zone, start: "top 55%", once: true } });
      });
      const glass = el.querySelector<SVGGElement>(".glass-fill");
      if (glass) {
        glass.style.animationPlayState = "paused";
        ScrollTrigger.create({ trigger: glass, start: "top 80%", once: true, onEnter: () => { glass.style.animationPlayState = "running"; } });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  const favourites = [
    { label: "Wings", note: "100+ flavours", href: "/menu#wings", icon: "wings" },
    { label: "Smashburgers", note: "Build your own", href: "/menu#burgers", icon: "takeout" },
    { label: "Poutine", note: "Loaded & classic", href: "/menu#poutine", icon: "heat" },
    { label: "Tenders & apps", note: "For the table", href: "/menu#tenders-apps", icon: "parties" },
  ];

  return (
    <div ref={ref} aria-label="One cabin, three ways to play">
      <div className="bg-char pb-10 pt-4 text-center">
        <p className="kicker text-sauce">One cabin. Three ways to play.</p>
      </div>

      {/* EAT */}
      <section data-zone className="relative overflow-hidden bg-birch py-20 text-char sm:py-28" aria-labelledby="zone-eat">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p data-zone-item className="kicker text-maple-deep">01 · Eat</p>
            <h2 id="zone-eat" data-zone-item className="mt-2 font-display text-[clamp(4rem,12vw,9rem)] leading-[.85] text-maple-deep">Eat</h2>
            <p data-zone-item className="body-l mt-6 max-w-xl text-ember">Over 100 wing flavours from wet sauces to dry seasonings, 20+ fry flavours, handmade burgers and loaded poutines.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {favourites.map((f) => (
                <li key={f.label} data-zone-item>
                  <Link href={f.href} className="group flex items-center gap-4 rounded-[12px] bg-white p-4 stamped transition-transform duration-300 hover:-translate-y-1 hover:-rotate-1">
                    <span className="grid size-12 shrink-0 place-items-center rounded-[10px] bg-birch text-maple-deep transition-colors group-hover:bg-maple group-hover:text-white"><Icon name={f.icon} size={28} /></span>
                    <span>
                      <span className="block font-label text-xl font-extrabold tracking-[.06em] uppercase">{f.label}</span>
                      <span className="block text-[15px] text-pine-ash">{f.note}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link data-zone-item href="/menu" className="btn btn-primary mt-8">View the menu</Link>
          </div>
          <div data-zone-item className="relative">
            <MediaSlot src={site.homepage.eatImage} alt="Wings, burgers and poutine on a cedar table" expected="Eat header.jpg" className="aspect-[4/5] -rotate-2 rounded-[12px] stamped" tone="cedar">
              <WingArt hue="sauce" className="absolute left-[8%] top-[12%] w-[80%] drop-shadow-[0_30px_30px_rgba(0,0,0,.5)]" />
            </MediaSlot>
            <Splash className="absolute -bottom-8 -right-6 w-28 sm:w-36" color="#F5821F" />
            <div className="absolute -left-4 -top-5 rotate-[-4deg] rounded-[6px] bg-amber px-5 py-3 font-label text-xl font-extrabold tracking-[.08em] uppercase stamped">20+ fry flavours</div>
          </div>
        </div>
      </section>

      {/* DRINK */}
      <section data-zone className="relative overflow-hidden bg-scoreboard py-20 text-birch sm:py-28" aria-labelledby="zone-drink">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div data-zone-item className="relative order-2 mx-auto w-full max-w-sm lg:order-1">
            <div className="absolute inset-[10%] rounded-full bg-amber/20 blur-3xl" aria-hidden />
            <Glass />
          </div>
          <div className="order-1 lg:order-2">
            <p data-zone-item className="kicker text-amber">02 · Drink</p>
            <h2 id="zone-drink" data-zone-item className="mt-2 font-display text-[clamp(4rem,12vw,9rem)] leading-[.85] text-amber">Drink</h2>
            <p data-zone-item className="body-l mt-6 max-w-xl text-bark">{drinks.intro}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {drinks.categories.map((c) => (
                <li key={c.id} data-zone-item className="chip border-amber text-amber">{c.name}</li>
              ))}
            </ul>
            <Link data-zone-item href="/drinks" className="btn btn-amber mt-8">Drink menu</Link>
          </div>
        </div>
      </section>

      {/* GAME ON */}
      <section data-zone className="relative overflow-hidden bg-scanlines py-20 text-birch sm:py-28" aria-labelledby="zone-game">
        <div className="wrap">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <p data-zone-item className="pixel text-[15px] text-aurora">03 · GAME ON</p>
              <h2 id="zone-game" data-zone-item className="pixel animate-flicker mt-3 text-[clamp(3rem,10vw,7.5rem)] font-bold leading-[.95] glow-text">GAME ON</h2>
            </div>
            <p data-zone-item className="body-l max-w-xl text-bark">{games.intro}</p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {games.items.map((g) => (
              <li key={g.id} data-zone-item className="group flex flex-col items-center gap-3 rounded-[12px] border-2 border-aurora/40 bg-char/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-aurora hover:shadow-[0_0_24px_rgba(62,240,166,.35)]">
                <span className="text-aurora transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6"><Icon name={g.icon} size={40} /></span>
                <span className="font-label text-[17px] font-extrabold tracking-[.08em] uppercase">{g.name}</span>
              </li>
            ))}
          </ul>
          <div data-zone-item className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/games" className="btn btn-arcade">See the game room</Link>
            <button onClick={openPicker} className="btn btn-outline-light">{location ? `Playing at ${location.name}` : "Select location"}</button>
            <p className="text-[15px] text-lichen">Game line-ups vary by location.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
