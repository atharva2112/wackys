# Integrations & items requiring business approval

Everything below has a **clearly identified configuration point** and a **working fallback** — nothing pretends to work.

## Integrations

| Integration | Config point | Behaviour until configured |
|---|---|---|
| Party enquiries | `PARTY_ENQUIRY_WEBHOOK_URL` (+ optional `WEBHOOK_SHARED_SECRET`, sent as `X-Wackys-Signature` HMAC-SHA256) | Validates, then tells the guest online enquiries aren't on yet and offers the location's phone and a prefilled email — details stay in the form |
| Contact form | `CONTACT_WEBHOOK_URL` | Same honest fallback with location phone |
| VIP Club signup | `VIP_SIGNUP_WEBHOOK_URL` — point at the authorised email platform (Mailchimp, Klaviyo, etc. via Zapier/Make or a direct endpoint) | Sends guests to the official wackys.com/vip page |
| Online ordering | `orderUrl` per location in `content/locations.json`; default `site.json → links.orderOnline` (wackys.com/onlineordering) | Links to the existing location-selection ordering page. **Confirm per-location deep links** (e.g. orders.wackys.com store URLs) |
| Reservations | `reservationUrl` per location; default wackys.com/make-a-reservation/ | Links to the existing reservation page. Confirm whether each location takes reservations |
| Content manager | `public/admin/config.yml` → `backend` | Needs a GitHub OAuth app (set `base_url`) or Netlify Identity + `git-gateway`. Content stays editable in Git meanwhile |
| Social embeds | `content/site.json → socialPosts` | Profile link tiles only. Add post URLs only for posts Wacky's owns/approves |
| Maps | none (stylised SVG + Google Maps directions links) | Works now. Swap for a tile map later if wanted |
| Analytics / consent | not included | Add with a consent banner if required |

**Static hosting (GitHub Pages):** the webhook variables above need the Node server. On Pages, set the repository variables `PARTY_FORM_URL`, `CONTACT_FORM_URL`, `VIP_FORM_URL` (public endpoints such as Formspree, which accept browser `POST` JSON) — unset means the fallback described above. The honeypot travels with the payload; spam filtering and rate limiting are then the form service's job.

Webhook payload: `{ "kind": "party-enquiry" | "contact" | "vip-signup", "submittedAt": ISO, "data": {…validated fields} }`.
Rate limiting in `src/lib/submit.ts` is per-instance; put an edge/WAF limit in front in production.

## Content to confirm before launch

Run `npm run validate:content` for the live list. Highlights:

1. **Opening hours** for SSM Lake Street, SSM Great Northern, North Bay and Timmins (Thunder Bay published; kitchen/game-room hours may differ).
2. **Games per location** — only Thunder Bay's line-up is confirmed.
3. **Sudbury** status and street address.
4. **Wing flavours** — full 100+ list, which legacy names are still poured, descriptions and heat ratings.
5. **Menu items & prices** — the item list partly comes from delivery-partner listings; no prices are shown until official.
6. **Eat 'N Game On! combos** — what each $25 / $33 / $41 tier includes, and which locations run them.
7. **Gettin' Spoiled** ($39.99) party tier inclusions; which locations offer the Kids Eat 'N Play Combo.
8. **Drink lists** per location (categories only today).
9. **Careers** — current openings and the application link.
10. **Logo files** (`public/brand/`) and **photography** with confirmed usage rights for each `MediaSlot`.
11. **Legal pages** — Privacy, Terms and Accessibility are drafts for counsel review (marked on-page).
12. **Social posts** approved for embedding.
