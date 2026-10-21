import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MediaSlot } from "@/components/MediaSlot";
import { Seal } from "@/components/Logo";
import { openLocations, site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("About Wacky's", "Since December 2007, Wacky's has served hand-tossed wings in over 100 flavours inside Northern white cedar cabins across Northern Ontario.", "/about");

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About Wacky's" lines={["Cabin by day.", "Arcade by night."]} accentIndex={1} intro="A Northern Ontario cedar-log cabin serving hand-tossed wings in over 100 flavours, a full bar and an arcade under one roof." />

      <section className="bg-birch py-20 text-char" aria-labelledby="story-h">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker text-maple-deep">Our story</p>
            <h2 id="story-h" className="display-l mt-2">Born in the Soo, December 2007</h2>
            <div className="mt-6 space-y-4 text-[18px] leading-relaxed text-ember">
              <p>Wacky&apos;s opened its doors in Sault Ste. Marie, Ontario in December 2007 with a simple idea: the best wings in the North, more flavours than anyone thought possible, and a room where the whole family could hang out.</p>
              <p>Walk in and you&apos;re in a cabin — walls covered in Northern white cedar logs, custom wooden tables, chairs and bar tops — with big screens on every wall and the glow of the game room around the corner.</p>
              <p>Today there are {openLocations.length} Wacky&apos;s across Northern Ontario, still tossing wings by hand in over 100 flavours.</p>
            </div>
          </div>
          <div className="relative">
            <MediaSlot src={null} alt="Cedar-log interior of a Wacky's restaurant" expected="Locations/WackyLake.jpg" tone="cedar" className="aspect-[4/3] rotate-1 rounded-[12px] stamped" />
            <div className="absolute -bottom-10 -left-6 rotate-[-8deg] rounded-full bg-char p-2 shadow-[5px_5px_0_#1B1512]"><Seal size={128} /></div>
          </div>
        </div>
      </section>

      <section className="bg-char py-20" aria-labelledby="numbers-h">
        <div className="wrap">
          <h2 id="numbers-h" className="sr-only">Wacky&apos;s by the numbers</h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.stats.map((s, i) => (
              <li key={s.label} data-reveal="up" data-delay={i * 0.08} className="border-t-4 border-maple pt-5">
                <p className={`font-display text-[clamp(3rem,6vw,4.5rem)] leading-none ${["text-amber", "text-sauce", "text-birch", "text-aurora"][i % 4]}`}>{s.value}</p>
                <p className="mt-2 text-lichen">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-birch py-20 text-char" aria-labelledby="zones-h">
        <div className="wrap">
          <h2 id="zones-h" className="display-l">Three zones, one lodge</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[12px] border-t-8 border-maple bg-white p-6 stamped"><p className="font-display text-[2.5rem] leading-none text-maple-deep">Eat</p><p className="mt-3 text-ember">Warm, hearty, appetite-first — the wings, the poutine, the burgers and the takeout.</p></div>
            <div className="rounded-[12px] border-t-8 border-amber bg-spruce p-6 text-birch"><p className="font-display text-[2.5rem] leading-none text-amber">Drink</p><p className="mt-3 text-bark">The lodge bar — beer, classic cocktails, MEGAS and big screens on every wall.</p></div>
            <div className="rounded-[12px] bg-scanlines p-6 text-birch glow-box"><p className="pixel text-[2rem] font-bold leading-none glow-text">GAME ON</p><p className="mt-3 text-bark">Neon-on-dark fun for families and friends — games, competition and sport.</p></div>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/locations" className="btn btn-primary">Visit a location</Link>
            <Link href="/careers" className="btn btn-outline-dark">Work with us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
