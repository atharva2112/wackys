import { PageHero } from "@/components/PageHero";
import { LocationFinder } from "@/components/LocationFinder";
import { JsonLd } from "@/components/JsonLd";
import { openLocations } from "@/lib/content";
import { pageMeta, restaurantLd } from "@/lib/seo";

export const metadata = pageMeta("Locations", "Find a Wacky's in Sault Ste. Marie, North Bay, Thunder Bay or Timmins — addresses, hours, directions, ordering and reservations.", "/locations");

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={openLocations.map(restaurantLd)} />
      <PageHero kicker="Explore locations" lines={["Find your", "Wacky's."]} accentIndex={1} intro="Five Northern Ontario cabins, each with its own line-up of games and features. Set your location and the site follows you." />
      <section className="bg-char pb-24" aria-label="Location finder">
        <div className="wrap"><LocationFinder /></div>
      </section>
    </>
  );
}
