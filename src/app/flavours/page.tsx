import { PageHero } from "@/components/PageHero";
import { FlavourExplorer } from "@/components/FlavourExplorer";
import { FlavourRoulette } from "@/components/FlavourRoulette";
import { HeatChip } from "@/components/Heat";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Wing Flavour Explorer", "Browse Wacky's wing flavours — wet sauces and dry seasonings, mild to wacky. Filter by profile and heat or let us surprise you.", "/flavours");

export default function FlavoursPage() {
  return (
    <>
      <PageHero kicker="Wing flavour explorer" lines={["100+ flavours.", "Zero boring bites."]} accentIndex={1} intro="Wet sauce or dry shaker, sweet heat or smoky — filter the board, or hit Surprise Me and let fate pick your wings." />
      <section className="bg-char pb-20" aria-label="Flavour explorer">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-[12px] border-2 border-ember p-4">
            <span className="label-s text-amber">Heat scale</span>
            {[1, 2, 3, 4, 5].map((l) => <HeatChip key={l} level={l} />)}
            <span className="text-[14px] text-lichen">Colour always comes with a flame count and label.</span>
          </div>
          <FlavourExplorer />
        </div>
      </section>
      <section className="bg-scanlines py-20" aria-labelledby="roulette-h">
        <div className="wrap text-center">
          <h2 id="roulette-h" className="pixel text-[clamp(1.75rem,5vw,3rem)] font-bold glow-text">STILL CAN&apos;T DECIDE?</h2>
          <p className="mx-auto mt-3 max-w-lg text-bark">Pull the lever. The machine has never once ordered plain.</p>
          <div className="mt-10"><FlavourRoulette /></div>
        </div>
      </section>
    </>
  );
}
