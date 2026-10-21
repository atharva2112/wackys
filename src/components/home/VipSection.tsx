import { vip } from "@/lib/content";
import { VipForm } from "../VipForm";
import { Icon } from "../Icon";
import { TicketStrip, Star } from "../Art";

export function VipSection() {
  return (
    <section className="relative overflow-hidden bg-maple py-20 sm:py-28" aria-labelledby="vip-title">
      <div aria-hidden className="absolute inset-0 bg-plaid opacity-40" />
      <TicketStrip className="animate-float absolute -left-6 top-10 hidden w-56 -rotate-12 lg:block" text="VIP ONLY" />
      <TicketStrip className="animate-float absolute bottom-10 right-4 hidden w-48 rotate-[14deg] lg:block" text="ADMIT ONE" style={{ animationDelay: "1.4s" }} />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div className="text-white">
          <p className="flex items-center gap-3 font-label text-[clamp(1rem,2vw,1.4rem)] font-extrabold tracking-[.16em] uppercase text-white">
            <Star className="w-5" /> VIP Club <Star className="w-5" />
          </p>
          <h2 id="vip-title" className="display-l mt-3">{vip.headline}</h2>
          <ul className="mt-8 grid gap-3">
            {vip.perks.map((p, i) => (
              <li key={p.id} data-reveal="left" data-delay={i * 0.1} className="ticket flex items-center gap-4 bg-birch px-7 py-4 text-char">
                <span className="grid size-12 shrink-0 place-items-center rounded-[10px] bg-maple text-white"><Icon name={p.icon} size={26} /></span>
                <span>
                  <span className="block font-label text-xl font-extrabold tracking-[.08em] uppercase">{p.title}</span>
                  <span className="block text-[15px] text-pine-ash">{p.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[16px] bg-birch p-6 text-char stamped sm:p-8">
          <p className="pixel text-[14px] text-maple-deep">PLAYER SIGN-UP</p>
          <p className="mt-1 font-display text-[1.9rem] leading-none">Get ready for a Wacky ride</p>
          <div className="mt-6"><VipForm /></div>
        </div>
      </div>
    </section>
  );
}
