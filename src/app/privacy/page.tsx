import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Privacy Policy", "How Wacky's collects, uses and protects personal information shared through this website.", "/privacy");

export default function PrivacyPage() {
  return (
    <LegalPage kicker="Website" title="Privacy Policy">
      <p>Wacky&apos;s respects your privacy and handles personal information in line with Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA) and Canada&apos;s Anti-Spam Legislation (CASL).</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>VIP Club:</strong> email address, first name and preferred location.</li>
        <li><strong>Party enquiries:</strong> name, email, phone, location, date, guest count and any notes you choose to share.</li>
        <li><strong>Contact messages:</strong> name, email, optional phone and your message.</li>
        <li><strong>On your device:</strong> your chosen location, sound preference and arcade score are stored in your browser&apos;s session storage only and are never sent to us.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To respond to enquiries, manage bookings and — only if you joined the VIP Club — send offers and news. Every marketing email includes an unsubscribe link.</p>
      <h2>Sharing</h2>
      <p>We share information only with service providers who help us run bookings and email (for example, our email-marketing platform), and never sell it.</p>
      <h2>Location services</h2>
      <p>If you tap &ldquo;Use my location&rdquo; or &ldquo;Near me&rdquo;, your browser shares your position with this page to find the closest restaurant. It is not stored or sent to our servers.</p>
      <h2>Third-party links</h2>
      <p>Online ordering, reservations, maps and social media open third-party services with their own privacy policies.</p>
      <h2>Your rights</h2>
      <p>You can ask to access, correct or delete your information. <Link href="/contact">Contact us</Link> and we&apos;ll respond within 30 days.</p>
    </LegalPage>
  );
}
