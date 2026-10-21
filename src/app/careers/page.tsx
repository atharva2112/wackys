import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { careers, openLocations } from "@/lib/content";
import { telHref } from "@/lib/hours";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Careers", "Work at Wacky's — servers, bartenders, cooks, hosts and game-room crew across Northern Ontario.", "/careers");

export default function CareersPage() {
  return (
    <>
      <PageHero kicker="Careers" lines={["Join the", "crew."]} accentIndex={1} intro={careers.intro} />
      <section className="bg-birch py-20 text-char" aria-labelledby="open-h">
        <div className="wrap grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 id="open-h" className="display-m">Current openings</h2>
            {careers.openings.length > 0 ? (
              <ul className="mt-6 grid gap-3">
                {careers.openings.map((o) => (
                  <li key={o.title + o.location} className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] bg-white p-5 stamped">
                    <div><p className="font-label text-xl font-extrabold uppercase tracking-[.06em]">{o.title}</p><p className="text-pine-ash">{o.location} · {o.type}</p></div>
                    {o.url && <a href={o.url} className="btn btn-sm btn-primary">Apply</a>}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-[12px] border-2 border-dashed border-pine-ash p-6">
                <p className="font-label text-xl font-extrabold uppercase tracking-[.06em]">No online postings right now</p>
                <p className="mt-2 text-ember">{careers.howToApply}</p>
              </div>
            )}
            {careers.applyUrl && <a href={careers.applyUrl} className="btn btn-primary mt-6">Apply online</a>}
          </div>
          <div className="rounded-[12px] bg-char p-6 text-birch">
            <h2 className="heading text-amber">Ask who&apos;s hiring</h2>
            <ul className="mt-4 divide-y-2 divide-ember">
              {openLocations.map((l) => (
                <li key={l.slug} className="flex items-center justify-between gap-3 py-3">
                  <span className="font-label text-lg font-bold uppercase tracking-[.08em]">{l.name}</span>
                  {l.phone && <a href={telHref(l.phone)} className="text-aurora underline underline-offset-4">{l.phone}</a>}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-sm btn-outline-light mt-6">Send us a message</Link>
          </div>
        </div>
      </section>
    </>
  );
}
