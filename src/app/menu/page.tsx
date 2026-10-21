import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MenuBrowser } from "@/components/MenuBrowser";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Food Menu", "Wings in 100+ flavours, smashburgers, poutine, tenders and more. Search the Wacky's menu by category and location.", "/menu");

export default function MenuPage() {
  return (
    <>
      <PageHero kicker="Food menu" lines={["Get saucy.", "Stay hungry."]} accentIndex={1} intro="Hand-tossed wings, smashed-to-order burgers and loaded poutine. Search it, filter it, then order it.">
        <Link href="/flavours" className="btn btn-amber">Wing flavour explorer</Link>
        <Link href="/specials" className="btn btn-outline-light">This week&apos;s specials</Link>
      </PageHero>
      <MenuBrowser />
    </>
  );
}
