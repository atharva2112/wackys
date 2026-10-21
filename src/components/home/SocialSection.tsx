import { site } from "@/lib/content";
import { Icon } from "../Icon";
import { WingArt, Joystick, Token } from "../Art";

/**
 * Real accounts only. Post embeds appear once the business lists approved post URLs in
 * site.json → socialPosts; until then the grid links straight to each official profile.
 */
export function SocialSection() {
  const [main, ...rest] = site.social;
  const tiles = [
    { cls: "bg-cedar", art: <WingArt hue="sauce" className="absolute -bottom-6 -right-6 w-48 rotate-12 opacity-90" /> },
    { cls: "bg-scanlines glow-box", art: <Joystick className="absolute -bottom-2 right-2 w-24 opacity-90" /> },
    { cls: "bg-scoreboard border-2 border-amber/50", art: <Token className="absolute -bottom-4 right-3 w-24 rotate-12" /> },
  ];
  return (
    <section className="bg-char py-20 sm:py-28" aria-labelledby="social-title">
      <div className="wrap">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker text-sauce">@wackys_canada</p>
            <h2 id="social-title" className="display-l mt-2">Fresh off the feed</h2>
          </div>
          <p className="max-w-md text-lichen">Flavour drops, game nights and what&apos;s on this week — straight from our official accounts.</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <a href={main.url} target="_blank" rel="noopener noreferrer" className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[12px] bg-plaid p-6 md:row-span-2">
            <span className="flex items-center gap-2 font-label text-[16px] font-bold tracking-[.14em] uppercase"><Icon name={main.network} size={22} /> {main.label}</span>
            <WingArt hue="fire" className="absolute left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_30px_30px_rgba(0,0,0,.6)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
            <span className="relative">
              <span className="block break-words font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none">{main.handle}</span>
              <span className="mt-3 inline-flex items-center gap-2 rounded-[6px] bg-char px-4 py-2 font-label font-extrabold tracking-[.12em] uppercase">Follow on {main.network === "instagram" ? "Instagram" : "Facebook"} <Icon name="external" size={16} /></span>
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          {rest.map((s, i) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className={`group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[12px] p-5 transition-transform duration-300 hover:-translate-y-1 ${tiles[i % tiles.length].cls}`}>
              {tiles[i % tiles.length].art}
              <span className="relative flex items-center gap-2 font-label text-[15px] font-bold tracking-[.14em] uppercase"><Icon name={s.network} size={20} /> {s.network}</span>
              <span className="relative">
                <span className="block font-display text-[1.6rem] leading-none">{s.label}</span>
                <span className="mt-1 block text-[15px] text-bark">{s.handle}</span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
          <div className="flex min-h-[200px] flex-col justify-between rounded-[12px] border-2 border-dashed border-ember p-5">
            <span className="label-s text-amber">Your turn</span>
            <span>
              <span className="block font-display text-[1.6rem] leading-none">Tag your table</span>
              <span className="mt-2 block text-[15px] text-lichen">Wing piles, high scores, birthday crews — tag {main.handle} and you might see it on our feed.</span>
            </span>
          </div>
          {site.socialPosts.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="flex min-h-[200px] flex-col justify-end rounded-[12px] bg-smoke p-5">
              <span className="label-s text-amber">View post on {p.network}</span>
              {p.caption && <span className="mt-2 block text-[15px]">{p.caption}</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
