"use client";

import { useRef, useState } from "react";
import type { z } from "zod";
import { flattenErrors, type FieldErrors } from "@/lib/forms";

export type Status = "idle" | "sending" | "success" | "unconfigured" | "error";

export function useFormSubmit<T extends z.ZodTypeAny>(schema: T, endpoint: string) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  // Focus the first invalid field in page order (not schema order), after React has rendered the errors.
  const focusFirstError = (errs: FieldErrors) => {
    const names = Object.keys(errs);
    setTimeout(() => {
      const fields = formRef.current?.querySelectorAll<HTMLElement>("[name]") ?? [];
      Array.from(fields).find((f) => names.includes(f.getAttribute("name") ?? ""))?.focus();
    }, 0);
  };

  async function submit(values: Record<string, unknown>) {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs = flattenErrors(parsed.error);
      setErrors(errs);
      setStatus("idle");
      focusFirstError(errs);
      return false;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current, website: values.website ?? "" }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) { setStatus("success"); return true; }
      if (json.errors) { setErrors(json.errors); setStatus("idle"); focusFirstError(json.errors); return false; }
      if (json.unconfigured) { setStatus("unconfigured"); setMessage(json.error); return false; }
      setStatus("error");
      setMessage(json.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("You appear to be offline. Please try again.");
    }
    return false;
  }

  return { errors, setErrors, status, message, submit, formRef };
}

/** Labelled control with an error message wired up through aria-describedby. */
export function Field({
  label, name, error, required, hint, children, className = "",
}: { label: string; name: string; error?: string; required?: boolean; hint?: string; children: React.ReactElement<Record<string, unknown>>; className?: string }) {
  const errId = `${name}-error`;
  const hintId = hint ? `${name}-hint` : undefined;
  const child = children;
  const props = {
    id: name, name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": [error ? errId : null, hintId].filter(Boolean).join(" ") || undefined,
    "aria-required": required || undefined,
  };
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block font-label text-[15px] font-bold tracking-[.14em] uppercase">
        {label}{required && <span aria-hidden className="text-maple-deep"> *</span>}
      </label>
      {hint && <p id={hintId} className="mb-1.5 text-[14px] text-pine-ash">{hint}</p>}
      <child.type {...child.props} {...props} />
      {error && <p id={errId} className="mt-1.5 flex items-center gap-1.5 text-[15px] font-semibold text-maple-deep"><span aria-hidden>▲</span>{error}</p>}
    </div>
  );
}

/** Hidden from people, irresistible to bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>Website<input tabIndex={-1} autoComplete="off" name="website" value={value} onChange={(e) => onChange(e.target.value)} /></label>
    </div>
  );
}
