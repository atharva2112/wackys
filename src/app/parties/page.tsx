import { PageHero } from "@/components/PageHero";
import { PartyPlanner } from "@/components/PartyPlanner";
import { parties } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Parties & Group Bookings", "Kids birthdays, sports team parties, team building and grad nights at Wacky's. See packages for your location and send an enquiry.", "/parties");

export default async function PartiesPage({ searchParams }: { searchParams: Promise<{ occasion?: string }> }) {
  const { occasion } = await searchParams;
  const valid = parties.occasions.some((o) => o.id === occasion) ? occasion : undefined;
  return (
    <>
      <PageHero tone="plaid" kicker="Parties & celebrations" lines={["Bring the", "whole crew."]} accentIndex={1} intro={parties.intro} art="party">
        <a href="#enquire" className="btn btn-amber">Start an enquiry</a>
      </PageHero>
      <PartyPlanner initialOccasion={valid} />
    </>
  );
}
