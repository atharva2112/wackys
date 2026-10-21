import { LocationList } from "../LocationList";

export function LocationsSection() {
  return (
    <section id="locations" className="bg-char py-20 sm:py-28" aria-labelledby="locations-title">
      <div className="wrap">
        <p className="kicker text-sauce">Explore locations</p>
        <h2 id="locations-title" className="display-l mt-2">Find your Wacky&apos;s</h2>
        <p className="mt-3 max-w-2xl text-lichen">Five Northern Ontario cabins, each with its own line-up. Set your location and the whole site follows — offers, hours and ordering.</p>
        <div className="mt-10"><LocationList /></div>
      </div>
    </section>
  );
}
