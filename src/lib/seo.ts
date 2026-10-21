import type { Metadata } from "next";
import { locations, site } from "./content";
import type { Location } from "./schemas";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wackys.com";

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · Wacky's`, description, url: path, siteName: "Wacky's", locale: "en_CA", type: "website" },
    twitter: { card: "summary_large_image", title: `${title} · Wacky's`, description },
  };
}

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function restaurantLd(loc: Location) {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "BarOrPub"],
    "@id": `${SITE_URL}/locations/${loc.slug}#restaurant`,
    name: `Wacky's ${loc.name}`,
    url: `${SITE_URL}/locations/${loc.slug}`,
    servesCuisine: ["Chicken Wings", "Burgers", "Poutine", "Canadian"],
    telephone: loc.phone ? `+1-${loc.phone}` : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.province,
      postalCode: loc.address.postal ?? undefined,
      addressCountry: "CA",
    },
    geo: { "@type": "GeoCoordinates", latitude: loc.geo.lat, longitude: loc.geo.lng },
    openingHoursSpecification: loc.hours?.map((h) => ({
      "@type": "OpeningHoursSpecification", dayOfWeek: h.days.map((d) => DAY[d]), opens: h.open, closes: h.close,
    })),
    acceptsReservations: Boolean(loc.reservationUrl),
    hasMenu: site.links.officialMenu,
    parentOrganization: { "@id": `${SITE_URL}#org` },
    ...(loc.status !== "open" ? { description: `${loc.statusNote ?? "Temporarily closed."}` } : {}),
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#org`,
    name: "Wacky's",
    url: SITE_URL,
    slogan: site.tagline,
    foundingDate: "2007-12",
    foundingLocation: site.foundedCity,
    sameAs: site.social.map((s) => s.url),
    subOrganization: locations.filter((l) => l.status === "open").map((l) => ({ "@id": `${SITE_URL}/locations/${l.slug}#restaurant` })),
  };
}
