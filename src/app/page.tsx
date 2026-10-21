import { Hero } from "@/components/home/Hero";
import { WingSection } from "@/components/home/WingSection";
import { EatDrinkGame } from "@/components/home/EatDrinkGame";
import { ArcadeSection } from "@/components/home/ArcadeSection";
import { SpecialsSection } from "@/components/home/SpecialsSection";
import { PartiesSection } from "@/components/home/PartiesSection";
import { LocationsSection } from "@/components/home/LocationsSection";
import { SocialSection } from "@/components/home/SocialSection";
import { VipSection } from "@/components/home/VipSection";
import { JsonLd } from "@/components/JsonLd";
import { openLocations } from "@/lib/content";
import { restaurantLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={openLocations.map(restaurantLd)} />
      <Hero />
      <WingSection />
      <EatDrinkGame />
      <ArcadeSection />
      <SpecialsSection />
      <PartiesSection />
      <LocationsSection />
      <SocialSection />
      <VipSection />
    </>
  );
}
