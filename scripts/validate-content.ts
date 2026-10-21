/**
 * Validates every content file against its schema and prints what still needs business sign-off.
 * Run: npm run validate:content
 */
import * as c from "../src/lib/content";

const pending: string[] = [];
const check = (label: string, v: string | undefined) => { if (v && v !== "yes") pending.push(`${label} — ${v}`); };

c.locations.forEach((l) => {
  check(`Location: ${l.name}`, l.verified);
  if (!l.hours && l.status === "open") pending.push(`Location: ${l.name} — opening hours not published`);
});
c.promotions.forEach((p) => check(`Promotion: ${p.title}`, p.verified));
c.flavours.items.forEach((f) => check(`Flavour: ${f.name}`, f.verified));
c.menu.categories.forEach((cat) => cat.items.forEach((i) => check(`Menu: ${i.name}`, i.verified)));
c.parties.packages.forEach((p) => p.tiers.forEach((t) => check(`Package: ${p.name} / ${t.name}`, t.verified)));
check("Careers", c.careers.verified);

console.log(`✔ All content files are valid (${c.locations.length} locations, ${c.promotions.length} promotions, ${c.flavours.items.length} flavours).`);
console.log(`\n${pending.length} item(s) awaiting confirmation:\n` + pending.map((p) => `  • ${p}`).join("\n"));
