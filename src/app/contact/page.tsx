import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { openLocations } from "@/lib/content";
import { fullAddress, telHref } from "@/lib/hours";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Contact Us", "Call your local Wacky's or send us a message about feedback, parties, media or lost and found.", "/contact");

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact us" lines={["Holler at", "the host."]} accentIndex={1} intro="Fastest answer? Call your location. For everything else, send us a message." />
      <section className="bg-birch py-20 text-char" aria-label="Contact">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="heading">Call a location</h2>
            <ul className="mt-6 grid gap-3">
              {openLocations.map((l) => (
                <li key={l.slug} className="rounded-[12px] bg-white p-4 stamped">
                  <p className="font-label text-xl font-extrabold tracking-[.06em] uppercase">{l.name}</p>
                  <p className="text-[15px] text-pine-ash">{fullAddress(l)}</p>
                  {l.phone && <a href={telHref(l.phone)} className="mt-1 inline-block font-display text-[1.4rem] text-maple-deep hover:underline">{l.phone}</a>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="heading">Send a message</h2>
            <div className="mt-6"><ContactForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
