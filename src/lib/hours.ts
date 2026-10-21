import type { Location } from "./schemas";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function fmtTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 && h < 24 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function dayRange(days: number[]): string {
  const sorted = [...days].sort((a, b) => a - b);
  const contiguous = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
  if (sorted.length > 2 && contiguous) return `${DAY_NAMES[sorted[0]]}–${DAY_NAMES[sorted.at(-1)!]}`;
  return sorted.map((d) => DAY_NAMES[d]).join(", ");
}

export function hoursLines(loc: Location): string[] {
  if (!loc.hours) return [];
  return loc.hours.map((r) => `${dayRange(r.days)} · ${fmtTime(r.open)}–${fmtTime(r.close)}`);
}

/** Current time in Ontario, independent of the visitor's own time zone. */
function torontoNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = DAY_NAMES.indexOf(get("weekday").slice(0, 3));
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  return { day, minutes };
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** null when hours aren't published — the UI then says "call to confirm" instead of guessing. */
export function openState(loc: Location, now = new Date()): { open: boolean; label: string } | null {
  if (loc.status !== "open" || !loc.hours) return null;
  const { day, minutes } = torontoNow(now);
  const yesterday = (day + 6) % 7;
  for (const r of loc.hours) {
    const o = toMin(r.open);
    const c = toMin(r.close);
    const overnight = c <= o;
    if (r.days.includes(day) && minutes >= o && (overnight || minutes < c)) {
      return { open: true, label: `Open until ${fmtTime(r.close)}` };
    }
    if (overnight && r.days.includes(yesterday) && minutes < c) {
      return { open: true, label: `Open until ${fmtTime(r.close)}` };
    }
  }
  const todays = loc.hours.find((r) => r.days.includes(day));
  if (todays && minutes < toMin(todays.open)) return { open: false, label: `Opens ${fmtTime(todays.open)}` };
  return { open: false, label: "Closed now" };
}

export function fullAddress(loc: Location): string {
  const a = loc.address;
  return [a.street, `${a.city}, ${a.province}${a.postal ? ` ${a.postal}` : ""}`].join(", ");
}

export function directionsUrl(loc: Location): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`Wacky's ${fullAddress(loc)}`)}`;
}

export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}
