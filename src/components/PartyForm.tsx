"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { appliesTo, getLocation, openLocations, parties } from "@/lib/content";
import { PartyInput } from "@/lib/forms";
import { telHref } from "@/lib/hours";
import { Field, Honeypot, useFormSubmit } from "./form";
import { useLocationChoice } from "./LocationProvider";
import { useArcade } from "./ArcadeProvider";
import { Icon } from "./Icon";

export function PartyForm({ initialOccasion }: { initialOccasion?: string }) {
  const { slug } = useLocationChoice();
  const [v, setV] = useState({
    name: "", email: "", phone: "", location: "", occasion: initialOccasion ?? "", packageId: "",
    date: "", time: "", guests: "", notes: "", consent: false, website: "",
  });
  const { errors, status, message, submit, formRef } = useFormSubmit(PartyInput, "/api/party-enquiry");
  const { addPoints, blip } = useArcade();

  useEffect(() => { if (slug && !v.location) setV((s) => ({ ...s, location: slug })); }, [slug, v.location]);
  useEffect(() => { if (initialOccasion) setV((s) => ({ ...s, occasion: initialOccasion })); }, [initialOccasion]);

  const packages = useMemo(
    () => parties.packages.filter((p) => p.active && appliesTo(p.locations, v.location || null) && (!v.occasion || p.occasions.includes(v.occasion))),
    [v.location, v.occasion],
  );
  const loc = getLocation(v.location);
  const today = new Date().toISOString().slice(0, 10);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submit(v)) { addPoints(300); blip("win"); }
  };

  const mailto = useMemo(() => {
    const body = `Party enquiry\n\nName: ${v.name}\nPhone: ${v.phone}\nEmail: ${v.email}\nLocation: ${loc?.name ?? ""}\nOccasion: ${v.occasion}\nPackage: ${v.packageId}\nDate: ${v.date} ${v.time}\nGuests: ${v.guests}\n\n${v.notes}`;
    return `mailto:?subject=${encodeURIComponent(`Party enquiry — Wacky's ${loc?.name ?? ""}`)}&body=${encodeURIComponent(body)}`;
  }, [v, loc]);

  if (status === "success") {
    return (
      <div role="status" className="rounded-[12px] bg-white p-8 text-char stamped">
        <p className="pixel text-[15px] text-maple-deep">+300 · PARTY MODE</p>
        <h3 className="mt-2 font-display text-[2.25rem] leading-none">Enquiry sent!</h3>
        <p className="mt-3 max-w-lg">Thanks, {v.name.split(" ")[0]}. The {loc?.name} team will be in touch to lock in the details{loc?.phone ? <> — or call them now at <a className="font-semibold underline" href={telHref(loc.phone)}>{loc.phone}</a></> : null}.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5 rounded-[12px] bg-birch p-5 text-char stamped sm:p-8">
      <Honeypot value={v.website} onChange={(x) => setV((s) => ({ ...s, website: x }))} />
      {Object.keys(errors).length > 0 && (
        <div role="alert" className="rounded-[8px] border-2 border-maple-deep bg-white p-4 text-[15px]">
          <p className="font-semibold text-maple-deep">Please fix {Object.keys(errors).length} field{Object.keys(errors).length > 1 ? "s" : ""} below.</p>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Location" name="location" required error={errors.location}>
          <select className="field" value={v.location} onChange={set("location")}>
            <option value="">Choose a location</option>
            {openLocations.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
          </select>
        </Field>
        <Field label="Occasion" name="occasion" required error={errors.occasion}>
          <select className="field" value={v.occasion} onChange={set("occasion")}>
            <option value="">Pick one</option>
            {parties.occasions.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
            <option value="other">Something else</option>
          </select>
        </Field>
      </div>
      {packages.length > 0 && (
        <Field label="Package (optional)" name="packageId" error={errors.packageId} hint="Packages run at participating locations — your location will confirm.">
          <select className="field" value={v.packageId} onChange={set("packageId")}>
            <option value="">Not sure yet</option>
            {packages.flatMap((p) => p.tiers.map((t) => <option key={`${p.id}-${t.name}`} value={`${p.name} — ${t.name}`}>{p.name} — {t.name} ({t.price})</option>))}
          </select>
        </Field>
      )}
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Date" name="date" required error={errors.date}>
          <input type="date" min={today} className="field" value={v.date} onChange={set("date")} />
        </Field>
        <Field label="Start time" name="time" required error={errors.time}>
          <input type="time" step={900} className="field" value={v.time} onChange={set("time")} />
        </Field>
        <Field label="Guests" name="guests" required error={errors.guests}>
          <input type="number" min={1} max={300} inputMode="numeric" className="field" value={v.guests} onChange={set("guests")} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Your name" name="name" required error={errors.name}>
          <input type="text" autoComplete="name" className="field" value={v.name} onChange={set("name")} />
        </Field>
        <Field label="Email" name="email" required error={errors.email}>
          <input type="email" autoComplete="email" className="field" value={v.email} onChange={set("email")} />
        </Field>
        <Field label="Phone" name="phone" required error={errors.phone}>
          <input type="tel" autoComplete="tel" className="field" value={v.phone} onChange={set("phone")} />
        </Field>
      </div>
      <Field label="Anything else?" name="notes" error={errors.notes} hint="Allergies, accessibility needs, a cake coming in, team colours…">
        <textarea rows={4} className="field" value={v.notes} onChange={set("notes")} />
      </Field>
      <div>
        <label className="flex items-start gap-3 text-[15px]">
          <input type="checkbox" name="consent" checked={v.consent} onChange={set("consent")} aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "consent-error" : undefined} className="mt-1 size-5 accent-maple" />
          <span>Wacky&apos;s may contact me by email or phone about this enquiry. We only use your details for this booking — see our <a href="/privacy" className="underline underline-offset-4">privacy policy</a>.</span>
        </label>
        {errors.consent && <p id="consent-error" className="mt-1.5 text-[15px] font-semibold text-maple-deep">▲ {errors.consent}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary">{status === "sending" ? "Sending…" : "Send party enquiry"}</button>
        {loc?.phone && <a href={telHref(loc.phone)} className="link-arrow text-maple-deep">Or call {loc.phone}</a>}
      </div>
      <AnimatePresence>
        {(status === "unconfigured" || status === "error") && (
          <motion.div role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-[8px] border-2 border-maple bg-white p-4 text-[15px]">
            <p className="font-semibold">{message}</p>
            <p className="mt-1">Your details are still here. {loc?.phone ? <>Call <a className="font-semibold text-maple-deep underline" href={telHref(loc.phone)}>{loc.name} at {loc.phone}</a>, or </> : null}<a className="font-semibold text-maple-deep underline" href={mailto}>send it as an email <Icon name="mail" size={16} className="inline" /></a>.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
