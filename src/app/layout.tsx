import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import fs from "node:fs";
import path from "node:path";
import "./globals.css";
import { site } from "@/lib/content";
import { SITE_URL, organizationLd } from "@/lib/seo";
import { LocationProvider } from "@/components/LocationProvider";
import { ArcadeProvider } from "@/components/ArcadeProvider";
import { MotionProvider } from "@/components/MotionProvider";
import { LocationPicker } from "@/components/LocationPicker";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PressStart } from "@/components/PressStart";
import { JsonLd } from "@/components/JsonLd";

const alfa = localFont({ src: "./fonts/alfa-slab-one-latin-400-normal.woff2", variable: "--font-alfa", display: "swap", weight: "400" });
const barlow = localFont({
  src: [
    { path: "./fonts/barlow-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/barlow-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/barlow-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/barlow-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow", display: "swap",
});
const barlowCondensed = localFont({
  src: [
    { path: "./fonts/barlow-condensed-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/barlow-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/barlow-condensed-latin-700-normal.woff2", weight: "700" },
    { path: "./fonts/barlow-condensed-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-barlow-condensed", display: "swap",
});
const silkscreen = localFont({
  src: [
    { path: "./fonts/silkscreen-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/silkscreen-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-silkscreen", display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Wacky's — Eat. Drink. Game On!", template: "%s · Wacky's" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { siteName: "Wacky's", locale: "en_CA", type: "website", title: "Wacky's — Eat. Drink. Game On!", description: site.description },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#1B1512", width: "device-width", initialScale: 1 };

/** The real wordmark goes in /public/brand/ — the header picks it up automatically. */
function findLogo(): string | null {
  for (const f of ["wackys-logo.svg", "wackys-logo.png", "wackys-logo.webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "brand", f))) return `/brand/${f}`;
  }
  return null;
}

// Runs before paint so [data-reveal] elements start hidden only when motion is allowed.
const motionBoot = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const logoSrc = findLogo();
  return (
    <html lang="en-CA" className={`${alfa.variable} ${barlow.variable} ${barlowCondensed.variable} ${silkscreen.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <JsonLd data={organizationLd()} />
        <LocationProvider>
          <ArcadeProvider>
            <MotionProvider>
              <PressStart />
              <Header logoSrc={logoSrc} />
              <main id="main" tabIndex={-1} className="outline-none">{children}</main>
              <Footer logoSrc={logoSrc} />
              <LocationPicker />
            </MotionProvider>
          </ArcadeProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
