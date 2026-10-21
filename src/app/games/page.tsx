import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FlavourRoulette } from "@/components/FlavourRoulette";
import { PromoCard } from "@/components/PromoCard";
import { Icon } from "@/components/Icon";
import { games, getLocation, livePromotions } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Games & Entertainment", "Arcade games, VR, air hockey, billiards, tabletop games and sports on big screens at Wacky's.", "/games");

export default function GamesPage() {
  const gamePromos = livePromotions().filter((p) => p.zone === "game");
  return (
    <>
      <PageHero tone="arcade" kicker="GAME ROOM" lines={["GAME ON!"]} accentIndex={0} intro={games.intro} art="arcade" />
      <section className="bg-char py-20" aria-labelledby="games-h">
        <div className="wrap">
          <h2 id="games-h" className="display-l">Pick your game</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.items.map((g, i) => (
              <li key={g.id} data-reveal="pop" data-delay={i * 0.06} className="group flex flex-col gap-4 rounded-[12px] bg-scanlines p-6 glow-box transition-transform duration-300 hover:-translate-y-1">
                <span className="grid size-16 place-items-center rounded-[12px] border-2 border-aurora text-aurora transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"><Icon name={g.icon} size={36} /></span>
                <h3 className="font-display text-[1.75rem] leading-none">{g.name}</h3>
                <p className="text-bark">{g.blurb}</p>
                <p className="mt-auto text-[14px] text-lichen"><span className="pixel text-aurora">@</span> {g.locations === "all" ? "All locations" : g.locations === "participating" ? "Participating locations" : `Confirmed at ${g.locations.map((s) => getLocation(s)?.name ?? s).join(", ")} — call other locations to ask`}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-6 rounded-[12px] border-2 border-amber/50 bg-scoreboard p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <span className="grid size-20 place-items-center rounded-[14px] bg-char text-amber"><Icon name="playcard" size={44} /></span>
            <div>
              <h3 className="font-display text-[1.75rem] leading-none">Play Cards</h3>
              <p className="mt-2 text-bark">{games.playCard}</p>
            </div>
          </div>
        </div>
      </section>
      {gamePromos.length > 0 && (
        <section className="bg-birch py-20 text-char" aria-labelledby="game-deals">
          <div className="wrap">
            <h2 id="game-deals" className="display-l">Game-day deals</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">{gamePromos.map((p, i) => <PromoCard key={p.id} p={p} index={i} />)}</div>
          </div>
        </section>
      )}
      <section className="bg-crt py-20" aria-labelledby="g-roulette">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 id="g-roulette" className="pixel text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none glow-text">BONUS ROUND</h2>
            <p className="mt-4 max-w-md text-bark">Warm up with a spin, then bring your best game to the floor. Families, friends and leagues welcome.</p>
            <Link href="/parties" className="btn btn-arcade mt-6">Book a game party</Link>
          </div>
          <FlavourRoulette />
        </div>
      </section>
    </>
  );
}
