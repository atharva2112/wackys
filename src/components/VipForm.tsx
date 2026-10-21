"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { openLocations, vip } from "@/lib/content";
import { VipInput } from "@/lib/forms";
import { FORM_ENDPOINTS } from "@/lib/paths";
import { Field, Honeypot, useFormSubmit } from "./form";
import { useLocationChoice } from "./LocationProvider";
import { useArcade } from "./ArcadeProvider";
import { Star } from "./Art";

const CONFETTI = ["#D52B1E", "#FFC23D", "#F5821F", "#3EF0A6", "#F5EEE2"];

export function VipForm({ dark = false }: { dark?: boolean }) {
  const { slug } = useLocationChoice();
  const [values, setValues] = useState({ email: "", firstName: "", location: "", website: "" });
  const { errors, status, message, submit, formRef } = useFormSubmit(VipInput, FORM_ENDPOINTS.vip);
  const { addPoints, blip } = useArcade();

  useEffect(() => { if (slug && !values.location) setValues((v) => ({ ...v, location: slug })); }, [slug, values.location]);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submit(values)) { addPoints(500); blip("win"); }
  };

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-[12px] bg-amber p-8 text-center text-char stamped" role="status">
        {CONFETTI.flatMap((c, i) => [0, 1, 2, 3].map((j) => (
          <motion.span key={`${i}-${j}`} aria-hidden className="absolute left-1/2 top-1/2 h-3 w-2 rounded-[1px]" style={{ background: c }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: (Math.random() - 0.5) * 520, y: (Math.random() - 0.8) * 320, rotate: Math.random() * 720, opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }} />
        )))}
        <Star className="mx-auto w-12" color="#D52B1E" />
        <p className="pixel mt-3 text-[15px]">+500 · VIP UNLOCKED</p>
        <p className="mt-2 font-display text-[2.25rem] leading-none">Welcome to the club!</p>
        <p className="mx-auto mt-3 max-w-md">{vip.hype} Watch your inbox for your free appetizer.</p>
      </div>
    );
  }

  const tone = dark ? "text-birch" : "text-char";
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={`relative grid gap-4 ${tone}`}>
      <Honeypot value={values.website} onChange={(v) => setValues((s) => ({ ...s, website: v }))} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" name="email" required error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" className="field" value={values.email} onChange={set("email")} />
        </Field>
        <Field label="First name" name="firstName" required error={errors.firstName}>
          <input type="text" autoComplete="given-name" className="field" value={values.firstName} onChange={set("firstName")} />
        </Field>
      </div>
      <Field label="Location" name="location" required error={errors.location}>
        <select className="field" value={values.location} onChange={set("location")}>
          <option value="">Choose your Wacky&apos;s</option>
          {openLocations.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
        </select>
      </Field>
      <button type="submit" disabled={status === "sending"} className="btn btn-amber w-full !border-2 !border-char sm:w-auto sm:justify-self-start">
        {status === "sending" ? "Registering…" : "★ Register ★"}
      </button>
      <p className={`text-[14px] ${dark ? "text-lichen" : "text-pine-ash"}`}>{vip.terms}</p>
      <AnimatePresence>
        {(status === "unconfigured" || status === "error") && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert"
            className="rounded-[8px] border-2 border-maple bg-white p-4 text-[15px] text-char">
            <p className="font-semibold">{message}</p>
            {status === "unconfigured" && (
              <p className="mt-1">Sign up on the official VIP page for now: <a className="font-semibold text-maple-deep underline underline-offset-4" href={vip.officialUrl}>wackys.com/vip</a>.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
