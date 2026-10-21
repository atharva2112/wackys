import { PageHero } from "@/components/PageHero";
import { VipSection } from "@/components/home/VipSection";
import { vip } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("VIP Club", "Join the Wacky's VIP Club: a free appetizer for signing up, a birthday 4-Cheese Spinach Dip and a chance to win free wings for a year.", "/vip");

export default function VipPage() {
  return (
    <>
      <PageHero kicker="★ VIP Club ★" lines={["Join the", "VIP Club."]} accentIndex={1} intro={vip.hype} art="party" />
      <VipSection />
      <section className="bg-birch py-16 text-char" aria-labelledby="vip-faq">
        <div className="wrap max-w-3xl">
          <h2 id="vip-faq" className="display-m">The fine print</h2>
          <dl className="mt-6 divide-y-2 divide-bark">
            <div className="py-4"><dt className="font-label text-xl font-extrabold tracking-[.06em] uppercase">What am I signing up for?</dt><dd className="mt-1 text-ember">{vip.terms.replace("*Note: ", "")} You can unsubscribe any time from any email.</dd></div>
            <div className="py-4"><dt className="font-label text-xl font-extrabold tracking-[.06em] uppercase">Which location should I pick?</dt><dd className="mt-1 text-ember">The Wacky&apos;s you visit most — offers and news can be location-specific.</dd></div>
            <div className="py-4"><dt className="font-label text-xl font-extrabold tracking-[.06em] uppercase">How do I redeem my perks?</dt><dd className="mt-1 text-ember">Follow the instructions in your welcome and birthday emails, or ask your server.</dd></div>
          </dl>
        </div>
      </section>
    </>
  );
}
