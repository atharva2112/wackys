import { NextResponse } from "next/server";
import crypto from "node:crypto";
import type { z } from "zod";
import { flattenErrors } from "./forms";

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

/** Best-effort per-instance rate limit. Put a WAF/edge limit in front for production. */
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

/**
 * Validate → anti-spam → forward to an authorised webhook. When the webhook isn't configured
 * we say so honestly (503 + `unconfigured`) and the client offers phone/email instead.
 */
export async function handleSubmission<T extends z.ZodTypeAny>(req: Request, schema: T, opts: { kind: string; webhookEnv: string }) {
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 20_000) return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`${opts.kind}:${ip}`)) {
    return NextResponse.json({ ok: false, error: "Too many submissions — please try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 }); }

  // Honeypot + minimum fill time: bots fill hidden fields and submit instantly.
  if (body.website || (typeof body.startedAt === "number" && Date.now() - body.startedAt < 2500)) {
    return NextResponse.json({ ok: true }); // silently accept
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: flattenErrors(parsed.error) }, { status: 422 });

  const url = process.env[opts.webhookEnv];
  if (!url) {
    return NextResponse.json({ ok: false, unconfigured: true, error: "Online submissions aren't switched on yet." }, { status: 503 });
  }

  const payload = JSON.stringify({ kind: opts.kind, submittedAt: new Date().toISOString(), data: parsed.data });
  const headers: Record<string, string> = { "content-type": "application/json" };
  const secret = process.env.WEBHOOK_SHARED_SECRET;
  if (secret) headers["x-wackys-signature"] = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  try {
    const res = await fetch(url, { method: "POST", headers, body: payload, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
  } catch (e) {
    console.error(`[${opts.kind}] delivery failed`, e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, error: "We couldn't send that right now. Please call the location." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
