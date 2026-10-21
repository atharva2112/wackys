import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { drinks } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { Icon } from "@/components/Icon";

export const metadata = pageMeta("Drinks", "Classic and specialty cocktails, MEGAS and plenty of beer — craft included — with big screens on every wall.", "/drinks");

const ICONS: Record<string, string> = { megas: "beer", "classic-cocktails": "cocktails", "specialty-cocktails": "cocktails", beer: "beer" };

export default function DrinksPage() {
  return (
    <>
      <PageHero tone="spruce" kicker="The lodge bar" lines={["Pour one", "for the team."]} accentIndex={1} intro={drinks.intro} art="none">
        <Link href="/locations" className="btn btn-amber">Find your bar</Link>
      </PageHero>
      <section className="bg-char py-20" aria-labelledby="drink-cats">
        <div className="wrap">
          <h2 id="drink-cats" className="display-l">On the board</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {drinks.categories.map((c, i) => (
              <li key={c.id} data-reveal="up" data-delay={i * 0.08} className="group relative overflow-hidden rounded-[12px] border-2 border-amber/50 bg-scoreboard p-8 transition-transform duration-300 hover:-translate-y-1">
                <div aria-hidden className="absolute -right-8 -top-8 text-amber/15 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"><Icon name={ICONS[c.id] ?? "beer"} size={180} strokeWidth={1.5} /></div>
                <p className="kicker text-amber">{c.kicker}</p>
                <h3 className="mt-2 font-display text-[clamp(2.25rem,4vw,3rem)] leading-none text-birch">{c.name}</h3>
                <p className="mt-3 max-w-md text-bark">{c.blurb}</p>
                {c.items.length > 0 ? (
                  <ul className="mt-6 divide-y-2 divide-dashed divide-amber/30">
                    {c.items.map((d) => (
                      <li key={d.name} className="flex items-baseline justify-between gap-4 py-3">
                        <span><span className="font-label text-lg font-extrabold uppercase tracking-[.06em]">{d.name}</span>{d.description && <span className="block text-[15px] text-bark">{d.description}</span>}</span>
                        {d.price && <span className="font-display text-amber">{d.price}</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 inline-block rounded-[6px] bg-char/60 px-3 py-2 text-[15px] text-amber">Ask your server for today&apos;s list.</p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-[15px] text-lichen">{drinks.note} Alcohol is served to guests of legal drinking age (19+ in Ontario) — please bring ID and drink responsibly.</p>
        </div>
      </section>
    </>
  );
}
