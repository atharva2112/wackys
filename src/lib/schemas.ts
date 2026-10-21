import { z } from "zod";

/** Verification status recorded against every fact so editors know what still needs sign-off. */
export const Verified = z.enum(["yes", "partial", "name", "needs-confirmation"]);
export const AmenityStatus = z.enum(["confirmed", "unconfirmed"]);
/** "all" = every open location, "participating" = offer runs at some locations (guest must confirm), or explicit slugs. */
export const LocationScope = z.preprocess((v) => {
  // The CMS edits this as text: accept "all", "participating", a JSON array or a comma-separated list of slugs.
  if (typeof v !== "string" || v === "all" || v === "participating") return v;
  const t = v.trim();
  if (t.startsWith("[")) { try { return JSON.parse(t); } catch { return v; } }
  return t.split(",").map((x) => x.trim()).filter(Boolean);
}, z.union([z.literal("all"), z.literal("participating"), z.array(z.string())]));

export const HoursRow = z.object({
  days: z.array(z.coerce.number().int().min(0).max(6)),
  open: z.string().regex(/^\d\d:\d\d$/),
  close: z.string().regex(/^\d\d:\d\d$/),
});

export const LocationSchema = z.object({
  slug: z.string(),
  name: z.string(),
  city: z.string(),
  status: z.enum(["open", "temporarily-closed", "coming-soon", "closed"]),
  statusNote: z.string().nullish(),
  address: z.object({ street: z.string(), city: z.string(), province: z.string(), postal: z.string().nullish() }),
  phone: z.string().nullish(),
  email: z.string().email().nullish(),
  geo: z.object({ lat: z.number(), lng: z.number(), approximate: z.boolean() }),
  hours: z.array(HoursRow).nullish(),
  hoursNote: z.string().nullish(),
  orderUrl: z.string().url().nullish(),
  reservationUrl: z.string().url().nullish(),
  officialPage: z.string().url().nullish(),
  image: z.string().nullish(),
  blurb: z.string(),
  amenities: z.object({
    dineIn: AmenityStatus, takeout: AmenityStatus, bar: AmenityStatus, sports: AmenityStatus,
    arcade: AmenityStatus, vr: AmenityStatus, billiards: AmenityStatus, airHockey: AmenityStatus,
  }),
  source: z.string(),
  verified: Verified,
});

export const FlavourSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["sauce", "dry"]),
  profiles: z.array(z.enum(["sweet", "smoky", "spicy", "tangy", "savoury", "cheesy", "garlicky", "adventurous"])),
  heat: z.number().int().min(1).max(5),
  description: z.string().nullish(),
  source: z.string(),
  verified: Verified,
  isNew: z.boolean(),
  available: z.boolean(),
});

export const FlavoursFile = z.object({
  totalClaim: z.string(),
  note: z.string(),
  sources: z.record(z.string()),
  items: z.array(FlavourSchema),
});

export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  sizes: z.array(z.string()).default([]),
  price: z.string().nullish(),
  tags: z.array(z.string()).default([]),
  dietary: z.array(z.string()).default([]),
  locations: LocationScope,
  available: z.boolean(),
  source: z.string(),
  verified: Verified,
});

export const MenuFile = z.object({
  note: z.string(),
  officialMenuUrl: z.string().url(),
  dineInMenuUrl: z.string().url(),
  allergenNote: z.string(),
  categories: z.array(z.object({
    id: z.string(), name: z.string(), kicker: z.string(), blurb: z.string(), items: z.array(MenuItemSchema),
  })),
});

export const DrinksFile = z.object({
  intro: z.string(),
  note: z.string(),
  source: z.string(),
  categories: z.array(z.object({
    id: z.string(), name: z.string(), kicker: z.string(), blurb: z.string(),
    items: z.array(z.object({ name: z.string(), description: z.string().nullish(), price: z.string().nullish() })),
  })),
});

export const GamesFile = z.object({
  intro: z.string(),
  source: z.string(),
  items: z.array(z.object({
    id: z.string(), name: z.string(), blurb: z.string(), icon: z.string(), locations: LocationScope,
  })),
  playCard: z.string(),
  scoreQuote: z.string(),
});

export const PromotionSchema = z.object({
  id: z.string(),
  active: z.boolean(),
  featured: z.boolean(),
  zone: z.enum(["eat", "drink", "game"]),
  day: z.string(),
  time: z.string().nullish(),
  title: z.string(),
  body: z.string(),
  price: z.string().nullish(),
  takeout: z.object({ label: z.string(), detail: z.string(), price: z.string() }).nullish(),
  finePrint: z.string(),
  quote: z.string().nullish(),
  locations: LocationScope,
  startDate: z.string().nullish(),
  endDate: z.string().nullish(),
  cta: z.object({ label: z.string(), href: z.string() }),
  source: z.string(),
  verified: Verified,
});

export const PartiesFile = z.object({
  intro: z.string(),
  occasions: z.array(z.object({ id: z.string(), name: z.string(), blurb: z.string() })),
  packages: z.array(z.object({
    id: z.string(),
    name: z.string(),
    occasions: z.array(z.string()),
    tiers: z.array(z.object({ name: z.string(), includes: z.string(), price: z.string(), verified: Verified })),
    finePrint: z.string(),
    locations: LocationScope,
    active: z.boolean(),
    source: z.string(),
  })),
  groupNote: z.string(),
  source: z.string(),
});

export const VipFile = z.object({
  headline: z.string(),
  perks: z.array(z.object({ id: z.string(), title: z.string(), detail: z.string(), icon: z.string() })),
  terms: z.string(),
  hype: z.string(),
  officialUrl: z.string().url(),
  source: z.string(),
  verified: Verified,
});

export const CareersFile = z.object({
  intro: z.string(),
  openings: z.array(z.object({ title: z.string(), location: z.string(), type: z.string(), url: z.string().url().nullish() })),
  howToApply: z.string(),
  applyUrl: z.string().url().nullish(),
  source: z.string(),
  verified: Verified,
});

export const SiteFile = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  founded: z.string(),
  foundedCity: z.string(),
  stats: z.array(z.object({ value: z.string(), label: z.string(), verified: z.boolean() })),
  links: z.object({
    orderOnline: z.string().url(), reservation: z.string().url(), vip: z.string().url(),
    officialMenu: z.string().url(), dineInMenu: z.string().url(), ayce: z.string().url(),
    features: z.string().url(), partyPackages: z.string().url(), about: z.string().url(),
    careers: z.string().url().nullish(),
  }),
  social: z.array(z.object({
    network: z.enum(["instagram", "facebook", "tiktok"]), handle: z.string(), label: z.string(),
    url: z.string().url(), location: z.string().nullish(),
  })),
  /** Public post URLs approved for embedding. Leave empty until the business confirms which posts may be shown. */
  socialPosts: z.array(z.object({ url: z.string().url(), network: z.enum(["instagram", "facebook"]), caption: z.string().nullish() })),
  homepage: z.object({
    heroKicker: z.string(), heroBody: z.string(),
    heroImage: z.string().nullish(), eatImage: z.string().nullish(),
    drinkImage: z.string().nullish(), gameImage: z.string().nullish(),
  }),
});

export type Location = z.infer<typeof LocationSchema>;
export type Flavour = z.infer<typeof FlavourSchema>;
export type MenuItem = z.infer<typeof MenuItemSchema>;
export type Promotion = z.infer<typeof PromotionSchema>;
export type LocationScopeT = z.infer<typeof LocationScope>;
