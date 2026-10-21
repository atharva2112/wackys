import { notFound } from "next/navigation";
import Link from "next/link";
import { games, getLocation, livePromotions, appliesTo, locations, site } from "@/lib/content";
import { directionsUrl, fullAddress, hoursLines, telHref } from "@/lib/hours";
import { pageMeta, restaurantLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PromoCard } from "@/components/PromoCard";
import { AmenityList } from "@/components/LocationCard";
import { SetLocationButton, OpenNow } from "@/components/LocationActions";
import { MediaSlot } from "@/components/MediaSlot";
import { Icon } from "@/components/Icon";
import { SplitHeadline } from "@/components/SplitHeadline";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const loc = getLocation((await params).slug);
  if (!loc) return {};
  return pageMeta(`Wacky's ${loc.name}`, loc.status === "open" ? `${loc.blurb} ${fullAddress(loc)} · ${loc.phone ?? ""}` : `${loc.name}: ${loc.statusNote}`, `/locations/${loc.slug}`);
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const loc = getLocation((await params).slug);
  if (!loc) notFound();
  const closed = loc.status !== "open";
  const promos = livePromotions().filter((p) => appliesTo(p.locations, loc.slug) && p.locations !== "all");
  const localGames = games.items.filter((g) => g.locations === "all" || g.locations.includes(loc.slug));
  const social = site.social.filter((s) => s.location === loc.slug);

  return (
    <>
      <JsonLd data={restaurantLd(loc)} />
      <section className="relative overflow-hidden bg-char">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="label-s text-lichen"><Link href="/locations" className="hover:text-amber">Locations</Link> <span aria-hidden>/</span> <span aria-current="page" className="text-birch">{loc.name}</span></nav>
            <SplitHeadline as="h1" lines={[loc.name]} onScroll={false} className="display-xl mt-4" />
            {closed ? (
              <p className="mt-6 inline-flex items-center gap-2 rounded-[6px] bg-amber px-4 py-2 font-label text-xl font-extrabold tracking-[.08em] text-char uppercase">Temporarily closed · {loc.statusNote}</p>
            ) : (
              <div className="mt-6"><OpenNow slug={loc.slug} /></div>
            )}
            <p className="body-l mt-6 max-w-xl text-bark">{loc.blurb}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {!closed && loc.orderUrl && <a href={loc.orderUrl} className="btn btn-primary">Order online</a>}
              {!closed && loc.reservationUrl && <a href={loc.reservationUrl} className="btn btn-amber">Reserve a table</a>}
              {!closed && <SetLocationButton slug={loc.slug} />}
              {closed && <Link href="/vip" className="btn btn-amber">Join VIP for reopening news</Link>}
            </div>
          </div>
          <MediaSlot src={loc.image} alt={`Inside Wacky's ${loc.name}`} expected={`Locations/Wacky${loc.city.replace(/\W/g, "")}.jpg`} tone="cedar" className="aspect-[4/3] rounded-[12px] stamped" />
        </div>
      </section>

      {!closed && (
        <section className="bg-birch py-16 text-char" aria-label="Visit details">
          <div className="wrap grid gap-6 md:grid-cols-3">
            <div className="rounded-[12px] bg-white p-6 stamped">
              <h2 className="label-s text-maple-deep">Address</h2>
              <p className="mt-3 text-[18px]">{fullAddress(loc)}</p>
              <a href={directionsUrl(loc)} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark mt-4"><Icon name="pin" size={18} /> Directions<span className="sr-only"> (opens Google Maps)</span></a>
            </div>
            <div className="rounded-[12px] bg-white p-6 stamped">
              <h2 className="label-s text-maple-deep">Call</h2>
              {loc.phone && <a href={telHref(loc.phone)} className="mt-3 block font-display text-[2rem] leading-none hover:text-maple-deep">{loc.phone}</a>}
              <p className="mt-3 text-[15px] text-pine-ash">Takeout, reservations, parties and today&apos;s hours.</p>
            </div>
            <div className="rounded-[12px] bg-white p-6 stamped">
              <h2 className="label-s text-maple-deep">Hours</h2>
              <div className="mt-3 space-y-1 text-[17px]">{hoursLines(loc).map((h) => <p key={h}>{h}</p>)}</div>
              {loc.hoursNote && <p className="mt-2 text-[15px] text-pine-ash">{loc.hoursNote}</p>}
            </div>
          </div>
          <div className="wrap mt-10">
            <h2 className="heading">At this location</h2>
            <div className="mt-4"><AmenityList loc={loc} /></div>
            {social.length > 0 && (
              <p className="mt-6 flex flex-wrap items-center gap-3 text-[16px]">Follow this location:
                {social.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"><Icon name={s.network} size={18} /> {s.handle}</a>)}
              </p>
            )}
          </div>
        </section>
      )}

      {!closed && localGames.length > 0 && (
        <section className="bg-scanlines py-16" aria-labelledby="loc-games">
          <div className="wrap">
            <h2 id="loc-games" className="pixel text-[clamp(1.75rem,4vw,2.75rem)] font-bold glow-text">GAME ON HERE</h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {localGames.map((g) => <li key={g.id} className="chip border-aurora text-aurora"><Icon name={g.icon} size={18} /> {g.name}</li>)}
            </ul>
            {loc.amenities.arcade !== "confirmed" && <p className="mt-4 text-[15px] text-lichen">Call ahead to ask what games are on the floor at {loc.name}.</p>}
          </div>
        </section>
      )}

      {!closed && promos.length > 0 && (
        <section className="bg-birch py-16 text-char" aria-labelledby="loc-promos">
          <div className="wrap">
            <h2 id="loc-promos" className="display-l">Specials here</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{promos.map((p, i) => <PromoCard key={p.id} p={p} index={i} />)}</div>
            <Link href="/specials" className="link-arrow mt-8 inline-block text-maple-deep">All specials →</Link>
          </div>
        </section>
      )}
    </>
  );
}
