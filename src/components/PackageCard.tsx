import { parties, scopeLabel } from "@/lib/content";

type Pkg = (typeof parties.packages)[number];

/** Package card with notched ticket prices (prices always in Alfa Slab). */
export function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <article className="rounded-[12px] bg-white p-6 text-char stamped">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-[1.75rem] leading-none">{pkg.name}</h3>
        <span className="tag bg-char text-amber">{scopeLabel(pkg.locations)}</span>
      </div>
      <ul className="mt-5 grid gap-4">
        {pkg.tiers.map((t) => (
          <li key={t.name} className="flex flex-col items-start justify-between gap-4 rounded-[10px] border-2 border-bark p-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-label text-[18px] font-extrabold tracking-[.12em] uppercase">{t.name}</p>
              <p className="mt-1 text-[15px] text-pine-ash">{t.includes}</p>
            </div>
            <div className="ticket shrink-0 bg-maple px-6 py-2 text-center text-white">
              <span className="block font-label text-[11px] font-bold tracking-[.18em] uppercase">From</span>
              <span className="block font-display text-[1.6rem] leading-none">{t.price}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[14px] text-pine-ash">{pkg.finePrint}</p>
    </article>
  );
}
