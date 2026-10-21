import { PageHero } from "@/components/PageHero";
import { SpecialsBoard } from "@/components/SpecialsBoard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Specials & Events", "All-you-can-eat wings Wednesdays, Kids Eat Free Sundays, Half Price Games Tuesdays and more — filtered for your Wacky's.", "/specials");

export default function SpecialsPage() {
  return (
    <>
      <PageHero tone="birch" kicker="Wacky features" lines={["Something wacky", "every week."]} accentIndex={1} intro="Weekly features, game-night deals and combos. Pick your location to see exactly what's on there." />
      <SpecialsBoard />
    </>
  );
}
