export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { locations } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/menu", "/flavours", "/drinks", "/games", "/specials", "/parties", "/locations", "/about", "/vip", "/contact", "/careers", "/privacy", "/accessibility", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...locations.map((l) => ({ url: `${SITE_URL}/locations/${l.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
