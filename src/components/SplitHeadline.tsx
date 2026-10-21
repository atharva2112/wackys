"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Staggered letter reveal for display lines. Each line is a string; `accent` lines get the Game On glow.
 * Screen readers get the plain text once via aria-label.
 */
export function SplitHeadline({
  lines, as: Tag = "h2", className = "", accentIndex = -1, accentClass = "glow-text", delay = 0, onScroll = true, id,
}: {
  lines: string[]; id?: string; as?: "h1" | "h2" | "p"; className?: string; accentIndex?: number; accentClass?: string; delay?: number; onScroll?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = el.querySelectorAll<HTMLElement>("[data-ch]");
    const ctx = gsap.context(() => {
      gsap.fromTo(chars,
        { yPercent: 110, rotate: () => gsap.utils.random(-14, 14), opacity: 0 },
        {
          yPercent: 0, rotate: 0, opacity: 1, duration: 0.8, ease: "back.out(2)", stagger: 0.025, delay,
          scrollTrigger: onScroll ? { trigger: el, start: "top 85%", once: true } : undefined,
        });
    }, el);
    return () => ctx.revert();
  }, [delay, onScroll]);

  return (
    <Tag ref={ref} id={id} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className={`block overflow-hidden pb-[0.06em] ${li === accentIndex ? accentClass : ""}`}>
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {[...word].map((ch, ci) => <span key={ci} data-ch className="inline-block will-change-transform">{ch}</span>)}
              {wi < line.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
