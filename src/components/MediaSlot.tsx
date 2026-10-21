import Image from "next/image";

/**
 * Art-directed media frame. Shows the supplied Wacky's photo when one is configured
 * in the CMS; otherwise renders the design-system placeholder naming the expected
 * file, so nobody mistakes stand-in art for real restaurant photography.
 */
export function MediaSlot({
  src, alt, expected, className = "", tone = "dark", children, sizes = "(min-width: 1024px) 50vw, 100vw", priority = false,
}: {
  src: string | null | undefined; alt: string; expected: string; className?: string; tone?: "dark" | "arcade" | "spruce" | "cedar";
  children?: React.ReactNode; sizes?: string; priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        {children}
      </div>
    );
  }
  const bg = {
    dark: "bg-smoke [background-image:repeating-linear-gradient(135deg,rgba(245,238,226,.05)_0px,rgba(245,238,226,.05)_10px,transparent_10px,transparent_20px)]",
    arcade: "bg-scanlines",
    spruce: "bg-scoreboard",
    cedar: "bg-cedar",
  }[tone];
  return (
    <div className={`relative overflow-hidden ${bg} ${className}`} role="img" aria-label={`${alt} (photo coming soon)`}>
      {children}
      <span className="absolute bottom-3 left-3 rounded-[4px] bg-char/85 px-2 py-1 font-label text-[12px] font-bold tracking-[.14em] text-lichen uppercase">
        Photo slot · {expected}
      </span>
    </div>
  );
}
