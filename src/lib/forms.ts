import { z } from "zod";
import { locations } from "./content";

const openSlugs = locations.filter((l) => l.status === "open").map((l) => l.slug) as [string, ...string[]];
const text = (max: number) => z.string().trim().max(max, `Keep it under ${max} characters`);
const phone = z.string().trim().regex(/^[+()\d\s.-]{10,20}$/, "Enter a valid phone number, e.g. 705-555-0123");

/** Shared by client (instant feedback) and server (authoritative). */
export const VipInput = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(200),
  firstName: text(60).min(1, "Tell us your first name"),
  location: z.enum(openSlugs, { errorMap: () => ({ message: "Choose your Wacky's" }) }),
});

export const PartyInput = z.object({
  name: text(100).min(2, "Tell us who's planning"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(200),
  phone,
  location: z.enum(openSlugs, { errorMap: () => ({ message: "Choose a location" }) }),
  occasion: text(40).min(1, "Pick an occasion"),
  packageId: text(60).optional().or(z.literal("")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date").refine((d) => d >= new Date().toISOString().slice(0, 10), "Pick a date in the future"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Pick a start time"),
  guests: z.coerce.number({ invalid_type_error: "How many guests?" }).int().min(1, "At least 1 guest").max(300, "For 300+ guests, call the location"),
  notes: text(1500).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "We need your OK to contact you about this booking" }) }),
});

export const ContactInput = z.object({
  name: text(100).min(2, "Tell us your name"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(200),
  phone: phone.optional().or(z.literal("")),
  location: z.enum([...openSlugs, "general"] as [string, ...string[]], { errorMap: () => ({ message: "Choose a location" }) }),
  topic: z.enum(["general", "feedback", "parties", "media", "lost-found"], { errorMap: () => ({ message: "Pick a topic" }) }),
  message: text(3000).min(10, "Give us a bit more detail (10+ characters)"),
});

export type FieldErrors = Record<string, string>;

export function flattenErrors(err: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
