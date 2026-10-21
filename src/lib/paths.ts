/** Sub-path the site is served from (e.g. "/wackys" on GitHub Pages). next/link adds it automatically; raw asset URLs need this. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset<T extends string | null | undefined>(src: T): T {
  return (src && src.startsWith("/") && !src.startsWith(`${BASE_PATH}/`) ? `${BASE_PATH}${src}` : src) as T;
}

export const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/**
 * Where each form posts. On the Node build: our own API routes. On a static host:
 * a public form endpoint (e.g. Formspree) if configured, otherwise null → the form
 * shows its phone/email fallback without pretending to send.
 */
export const FORM_ENDPOINTS = {
  vip: IS_STATIC ? process.env.NEXT_PUBLIC_VIP_FORM_URL || null : "/api/vip",
  party: IS_STATIC ? process.env.NEXT_PUBLIC_PARTY_FORM_URL || null : "/api/party-enquiry",
  contact: IS_STATIC ? process.env.NEXT_PUBLIC_CONTACT_FORM_URL || null : "/api/contact",
};
