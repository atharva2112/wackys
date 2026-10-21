# Wacky's — Eat. Drink. Game On!

A complete, production-grade rebuild of [wackys.com](https://wackys.com): restaurant, sports bar and arcade across Northern Ontario.
Built on the **Wacky's Design System v1.0 — "Northern Lodge × Neo-Arcade"** (colour, type, icons, textures and components taken from the design-system canvas; no colours outside it).

## Quick start

```bash
npm install
npm run dev              # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
npm run validate:content # schema-check all content + list items awaiting business sign-off
```

Copy `.env.example` to `.env.local` to switch on form delivery (see [docs/integrations.md](docs/integrations.md)).

## Hosting on GitHub Pages (temporary)

`.github/workflows/pages.yml` builds a static export and deploys it on every push to `main` (pull requests get a build check only).

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Merge to `main` (or run the workflow manually from the Actions tab). The site appears at `https://<owner>.github.io/<repo>/` — the base path is detected automatically.
3. Optional: add repository **variables** `PARTY_FORM_URL`, `CONTACT_FORM_URL`, `VIP_FORM_URL` pointing at a static form service (e.g. Formspree) to make the forms send.

Locally: `NEXT_PUBLIC_BASE_PATH=/wackys npm run build:pages` → `./out`.

What changes on Pages: there's no server, so the `/api/*` routes (files named `route.api.ts`) are left out of the build. Without the form variables above, the party, contact and VIP forms still validate, then offer the location's phone, a prefilled email or the official VIP page. Security headers from `next.config.ts` don't apply — GitHub Pages sets its own. Everything else (animations, location memory, explorer, roulette, finder, CMS-driven content) works the same.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4, design tokens in `src/app/globals.css` (`@theme`) |
| Motion | GSAP + ScrollTrigger (timelines, scroll scrub, pointer parallax), Motion (springs, layout, page UI), Lenis (smooth scroll) |
| Fonts | Alfa Slab One · Barlow Condensed · Barlow · Silkscreen — self-hosted via `next/font/local` |
| Content | Typed JSON in `content/`, validated with Zod at build; Decap CMS at `/admin` |
| Forms | Route handlers in `src/app/api/*` → Zod validation, honeypot, timing check, rate limit, signed webhook |

## Pages

Home · Food Menu · Wing Flavour Explorer · Drinks · Games & Entertainment · Specials & Events · Parties · Locations (+ a page per location) · About · VIP Club · Contact · Careers · Privacy · Accessibility · Terms · 404 ("Game Over") · `sitemap.xml` · `robots.txt`.

## What's interactive

- **Location awareness** — pick a location (or "Use my location") once; it's kept in `sessionStorage` for the visit and drives the header ordering/reservation links, specials, party packages, the menu filter, form defaults and the footer contact card.
- **Wing Flavour Explorer** — filter by wet/dry, profile and heat, search, tilt-on-hover cards with sauce-drip transitions, and **Surprise Me!**
- **Flavour Roulette** — three-reel slot machine that only ever lands on real menu names; awards decorative points to the header "1UP" score.
- **Arcade sounds** — synthesized 8-bit blips, **off by default**, opt-in toggle.
- **PRESS START** boot screen — ≤0.95 s, first page view per session only, dismissable, never blocks rendering.
- **Location finder** — stylised (not-to-scale) Northern Ontario map with keyboard-accessible pins, search, filters, "Near me", live open/closed for locations with published hours, Google Maps directions.
- **Menu browser** — sticky category nav with scroll-spy, search, dietary filter, location filter; links to the official menus remain.
- **Forms** — party enquiry, VIP signup and contact, with inline errors, focus management and an honest fallback (phone / prefilled email / official VIP page) whenever an integration isn't configured.

## Accessibility & performance

- WCAG 2.2 AA target: skip link, visible 3 px Sauce Orange focus ring, real buttons/links, labelled fields with `aria-describedby` errors, focus-trapped location dialog, heat shown as colour **and** flame count **and** label.
- `prefers-reduced-motion`: Lenis, GSAP reveals, parallax, the boot screen and letter animations are all skipped; CSS animations are neutralised.
- Static generation for every page except `/parties` (reads `?occasion=`); fonts self-hosted; no layout-shifting web fonts; decorative art is inline SVG (no image weight).
- Structured data: `Organization` + `Restaurant`/`BarOrPub` per location (address, geo, hours where published).

## Content management

All editable content lives in [`content/`](content):

| File | What staff edit |
|---|---|
| `promotions.json` | Weekly features — `active` toggle, optional `startDate`/`endDate`, per-location scope, featured-on-homepage |
| `locations.json` | Address, phone, hours (or none → "call to confirm"), status (open / temporarily-closed), ordering & reservation URLs, amenities (confirmed/unconfirmed), photo |
| `menu.json` | Categories, items, sizes, prices (blank = "price at location"), dietary tags, availability, per-location scope |
| `flavours.json` | Wing flavours, type, profiles, heat, descriptions, "new" flag |
| `drinks.json`, `games.json`, `parties.json`, `vip.json`, `careers.json`, `site.json` | Everything else, including homepage photos and approved social posts |

Edit through **Decap CMS at `/admin`** (editorial workflow: draft → review → publish via Git) or directly in Git. Every file is schema-validated at build, so a bad edit fails the build instead of breaking a page. Each record carries `source` and `verified` fields — `npm run validate:content` lists what still needs sign-off. Location-specific data is attached to records, never by duplicating pages.

**Migration path:** the Zod schemas in `src/lib/schemas.ts` are the content model; mapping them to Sanity/Contentful/Payload means swapping `src/lib/content.ts` for an API fetch — components don't change.

## Brand assets

- **Logo:** drop the official wordmark into `public/brand/` as `wackys-logo.svg|png|webp`; it's picked up automatically. Until then the approved "Est. 2007" seal stands in (the design system forbids retyping the wordmark).
- **Photography:** every photo position is a `MediaSlot` that names the expected file (e.g. `Eat header.jpg`, `Locations/WackyThunderBay.jpg`). Add images via the CMS; until then, original illustrated artwork and labelled slots are shown — no stock or AI imagery is passed off as Wacky's.

See [docs/content-sources.md](docs/content-sources.md) for sources and [docs/integrations.md](docs/integrations.md) for everything awaiting business approval.
