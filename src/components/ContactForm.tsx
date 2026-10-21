"use client";

import { useEffect, useState } from "react";
import { getLocation, openLocations } from "@/lib/content";
import { ContactInput } from "@/lib/forms";
import { telHref } from "@/lib/hours";
import { Field, Honeypot, useFormSubmit } from "./form";
import { useLocationChoice } from "./LocationProvider";

const TOPICS = [
  { id: "general", label: "General question" },
  { id: "feedback", label: "Feedback" },
  { id: "parties", label: "Parties & groups" },
  { id: "media", label: "Media & partnerships" },
  { id: "lost-found", label: "Lost & found" },
];

export function ContactForm() {
  const { slug } = useLocationChoice();
  const [v, setV] = useState({ name: "", email: "", phone: "", location: "", topic: "", message: "", website: "" });
  const { errors, status, message, submit, formRef } = useFormSubmit(ContactInput, "/api/contact");
  useEffect(() => { if (slug && !v.location) setV((s) => ({ ...s, location: slug })); }, [slug, v.location]);
  const loc = getLocation(v.location);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV((s) => ({ ...s, [k]: e.target.value }));

  if (status === "success") {
    return (
      <div role="status" className="rounded-[12px] bg-white p-8 text-char stamped">
        <h3 className="font-display text-[2rem] leading-none">Message received!</h3>
        <p className="mt-3">Thanks, {v.name.split(" ")[0]} — we&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={(e) => { e.preventDefault(); submit(v); }} noValidate className="relative grid gap-5 rounded-[12px] bg-birch p-5 text-char stamped sm:p-8">
      <Honeypot value={v.website} onChange={(x) => setV((s) => ({ ...s, website: x }))} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Location" name="location" required error={errors.location}>
          <select className="field" value={v.location} onChange={set("location")}>
            <option value="">Choose a location</option>
            <option value="general">Not location-specific</option>
            {openLocations.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
          </select>
        </Field>
        <Field label="Topic" name="topic" required error={errors.topic}>
          <select className="field" value={v.topic} onChange={set("topic")}>
            <option value="">Pick a topic</option>
            {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Name" name="name" required error={errors.name}><input type="text" autoComplete="name" className="field" value={v.name} onChange={set("name")} /></Field>
        <Field label="Email" name="email" required error={errors.email}><input type="email" autoComplete="email" className="field" value={v.email} onChange={set("email")} /></Field>
        <Field label="Phone" name="phone" error={errors.phone}><input type="tel" autoComplete="tel" className="field" value={v.phone} onChange={set("phone")} /></Field>
      </div>
      <Field label="Message" name="message" required error={errors.message}><textarea rows={5} className="field" value={v.message} onChange={set("message")} /></Field>
      <button type="submit" disabled={status === "sending"} className="btn btn-primary justify-self-start">{status === "sending" ? "Sending…" : "Send message"}</button>
      {(status === "unconfigured" || status === "error") && (
        <div role="alert" className="rounded-[8px] border-2 border-maple bg-white p-4 text-[15px]">
          <p className="font-semibold">{message}</p>
          {loc?.phone ? <p className="mt-1">Please call <a className="font-semibold text-maple-deep underline" href={telHref(loc.phone)}>{loc.name} at {loc.phone}</a>.</p> : <p className="mt-1">Please call your nearest location — numbers are listed on this page.</p>}
        </div>
      )}
    </form>
  );
}
