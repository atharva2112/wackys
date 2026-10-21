import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Terms of Use", "Terms for using the Wacky's website.", "/terms");

export default function TermsPage() {
  return (
    <LegalPage kicker="Website" title="Terms of Use">
      <p>By using this website you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>
      <h2>Menu, prices and offers</h2>
      <p>Menu items, prices, hours, games and promotions vary by location and may change without notice. Offers are valid at participating locations only, cannot be combined unless stated, and exclude applicable taxes. Please confirm details with your location.</p>
      <h2>Online ordering and reservations</h2>
      <p>Ordering and reservations are handled by third-party services subject to their own terms.</p>
      <h2>The arcade on this site</h2>
      <p>The score counter, roulette and other games on this website are for fun only. Points have no cash value and can&apos;t be redeemed for food, drink, Play Card credit or prizes.</p>
      <h2>Content</h2>
      <p>All content, logos and artwork belong to Wacky&apos;s or their licensors and may not be reused without permission.</p>
      <h2>Alcohol</h2>
      <p>Alcohol is served only to guests of legal drinking age (19+ in Ontario). Please drink responsibly.</p>
    </LegalPage>
  );
}
