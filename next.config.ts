import type { NextConfig } from "next";

/**
 * Two targets:
 *  - default: Node server (`next start`) with form API routes.
 *  - STATIC_EXPORT=1: plain static files for GitHub Pages. API routes are left out
 *    (they use the `.api.ts` extension, only registered for the server build) and
 *    forms post to the public endpoints in NEXT_PUBLIC_*_FORM_URL, if any.
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Exposed to the browser so forms know there's no API to post to.
  env: { NEXT_PUBLIC_STATIC_EXPORT: isStatic ? "1" : "" },
  pageExtensions: isStatic ? ["tsx", "ts"] : ["tsx", "ts", "api.ts"],
  ...(isStatic ? { output: "export", trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: isStatic,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "wackys.com" }],
  },
  ...(isStatic ? {} : { async headers() { return [{ source: "/:path*", headers: securityHeaders }]; } }),
};

export default nextConfig;
