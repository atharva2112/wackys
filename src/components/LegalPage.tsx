import { PageHero } from "./PageHero";

/** Shared layout for policy pages. Copy is a draft until Wacky's counsel signs it off. */
export function LegalPage({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero kicker={kicker} lines={[title]} art="none" />
      <section className="bg-birch py-16 text-char">
        <div className="wrap max-w-3xl">
          <p className="rounded-[8px] border-2 border-dashed border-pine-ash bg-white p-4 text-[15px] text-pine-ash">Draft prepared for review by Wacky&apos;s. Last updated: pending legal approval.</p>
          <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-ember [&_a]:text-maple-deep [&_a]:underline [&_h2]:mt-10 [&_h2]:font-label [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-[.06em] [&_h2]:text-char [&_li]:ml-5 [&_li]:list-disc">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
