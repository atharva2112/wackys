import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Accessibility", "Wacky's commitment to an accessible website and restaurants for every guest.", "/accessibility");

export default function AccessibilityPage() {
  return (
    <LegalPage kicker="Website" title="Accessibility">
      <p>Wacky&apos;s is committed to providing goods and services to everyone, in line with the Accessibility for Ontarians with Disabilities Act (AODA). This website targets the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA.</p>
      <h2>What we&apos;ve built in</h2>
      <ul>
        <li>Full keyboard navigation with a visible focus ring and a &ldquo;Skip to content&rdquo; link.</li>
        <li>Colour pairings checked for contrast; heat levels always pair colour with flame count and a text label.</li>
        <li>Reduced-motion support: if your device asks for less motion, animations, smooth scrolling and the start screen are switched off.</li>
        <li>Arcade sounds are off by default and only play if you turn them on.</li>
        <li>Forms with labelled fields, clear error messages and no time limits.</li>
      </ul>
      <h2>In our restaurants</h2>
      <p>If you have accessibility needs for your visit — seating, service animals, menu formats or allergens — call your location ahead and we&apos;ll do our best to help.</p>
      <h2>Feedback</h2>
      <p>Found a barrier on this site? <Link href="/contact">Tell us</Link> and we&apos;ll work to fix it. We can provide information in an alternate format on request.</p>
    </LegalPage>
  );
}
