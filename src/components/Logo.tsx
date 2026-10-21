import Image from "next/image";
import { asset } from "@/lib/paths";

/**
 * Brand mark. The master wordmark (wackys_logo.png) must be supplied by Wacky's — the
 * design system forbids retyping the name in a font. Until it's dropped into
 * /public/brand/, the "Est. 2007" seal (an approved secondary mark) stands in.
 */
export function Logo({ src, size = "md" }: { src: string | null; size?: "md" | "lg" }) {
  if (src) {
    return (
      <Image
        src={asset(src)} alt="Wacky's" width={size === "lg" ? 240 : 150} height={size === "lg" ? 100 : 56}
        className={size === "lg" ? "h-24 w-auto" : "h-12 w-auto"} priority={size === "md"}
      />
    );
  }
  return <Seal size={size === "lg" ? 128 : 54} />;
}

export function Seal({ size = 54, light = true }: { size?: number; light?: boolean }) {
  const big = size >= 100;
  return (
    <span
      className="relative inline-flex shrink-0 flex-col items-center justify-center rounded-full text-center"
      style={{ width: size, height: size, border: `${big ? 4 : 3}px double #FFC23D` }}
    >
      <span className="sr-only">Wacky&apos;s — home</span>
      <span aria-hidden className="font-label font-bold text-amber" style={{ fontSize: big ? 12 : 7, letterSpacing: ".2em" }}>★ EST. ★</span>
      <span aria-hidden className="font-display leading-none" style={{ fontSize: big ? 34 : 15, color: light ? "#F5EEE2" : "#1B1512" }}>2007</span>
      {big && <span aria-hidden className="font-label font-bold text-amber" style={{ fontSize: 11, letterSpacing: ".14em" }}>SAULT STE. MARIE</span>}
    </span>
  );
}
