import { z } from "zod";
import siteJson from "@content/site.json";
import locationsJson from "@content/locations.json";
import flavoursJson from "@content/flavours.json";
import menuJson from "@content/menu.json";
import drinksJson from "@content/drinks.json";
import gamesJson from "@content/games.json";
import promotionsJson from "@content/promotions.json";
import partiesJson from "@content/parties.json";
import vipJson from "@content/vip.json";
import careersJson from "@content/careers.json";
import {
  SiteFile, LocationSchema, FlavoursFile, MenuFile, DrinksFile, GamesFile,
  PromotionSchema, PartiesFile, VipFile, CareersFile,
  type Location, type LocationScopeT, type Promotion,
} from "./schemas";

// Parsing at import time means a bad CMS edit fails the build loudly instead of shipping a broken page.
export const site = SiteFile.parse(siteJson);
export const locations = z.object({ locations: z.array(LocationSchema) }).parse(locationsJson).locations;
export const flavours = FlavoursFile.parse(flavoursJson);
export const menu = MenuFile.parse(menuJson);
export const drinks = DrinksFile.parse(drinksJson);
export const games = GamesFile.parse(gamesJson);
export const promotions = z.object({ promotions: z.array(PromotionSchema) }).parse(promotionsJson).promotions;
export const parties = PartiesFile.parse(partiesJson);
export const vip = VipFile.parse(vipJson);
export const careers = CareersFile.parse(careersJson);

export const openLocations = locations.filter((l) => l.status === "open");

export function getLocation(slug: string | null | undefined): Location | undefined {
  return slug ? locations.find((l) => l.slug === slug) : undefined;
}

/** Does content scoped to `scope` apply at `slug`? With no location chosen, everything shows. */
export function appliesTo(scope: LocationScopeT, slug: string | null): boolean {
  if (!slug || scope === "all" || scope === "participating") return true;
  return scope.includes(slug);
}

export function scopeLabel(scope: LocationScopeT): string {
  if (scope === "all") return "All locations";
  if (scope === "participating") return "Participating locations";
  const names = scope.map((s) => getLocation(s)?.name ?? s);
  return names.length === 1 ? `${names[0]} only` : names.join(" · ");
}

/** Active and inside its optional date window. Staff deactivate an offer by flipping `active` or setting `endDate`. */
export function isLive(p: Promotion, now = new Date()): boolean {
  if (!p.active) return false;
  const today = now.toISOString().slice(0, 10);
  if (p.startDate && today < p.startDate) return false;
  if (p.endDate && today > p.endDate) return false;
  return true;
}

export const livePromotions = () => promotions.filter((p) => isLive(p));

export function resolveHref(href: string): string {
  if (href === "reservation") return site.links.reservation;
  if (href === "order") return site.links.orderOnline;
  return href;
}
