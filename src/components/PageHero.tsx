import { SplitHeadline } from "./SplitHeadline";
import { Splash, Star, Token, Joystick, WingArt } from "./Art";

type Tone = "char" | "birch" | "spruce" | "arcade" | "plaid";

/** Interior page header. Tone maps to the design-system zone the page belongs to. */
export function PageHero({
  kicker, lines, intro, tone = "char", accentIndex = -1, children, art = "wings",
}: {
  kicker: string; lines: string[]; intro?: string; tone?: Tone; accentIndex?: number; children?: React.ReactNode;
  art?: "wings" | "arcade" | "party" | "none";
}) {
  const bg = { char: "bg-char text-birch", birch: "bg-birch text-char", spruce: "bg-scoreboard text-birch", arcade: "bg-scanlines text-birch", plaid: "bg-plaid text-white" }[tone];
  const kickerCls = { char: "text-sauce", birch: "text-maple-deep", spruce: "text-amber", arcade: "pixel text-aurora", plaid: "text-amber" }[tone];
  const accent = { char: "text-maple", birch: "text-maple", spruce: "text-amber", arcade: "glow-text", plaid: "text-amber" }[tone];
  const introCls = tone === "birch" ? "text-ember" : "text-bark";
  return (
    <section className={`relative overflow-hidden ${bg}`}>
      {/* Plaid is busy: a Char scrim keeps display type above 3:1 (Logo board rule: 60% Char on busy grounds). */}
      {tone === "plaid" && <div aria-hidden className="absolute inset-0 bg-char/60" />}
      <div className="wrap relative grid gap-8 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div className="relative z-10">
          <p className={`kicker ${kickerCls}`}>{kicker}</p>
          <SplitHeadline as="h1" lines={lines} onScroll={false} accentIndex={accentIndex} accentClass={tone === "arcade" ? "glow-text" : accent} className={`mt-3 ${tone === "arcade" ? "pixel text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none" : "display-xl"}`} />
          {intro && <p className={`body-l mt-6 max-w-2xl ${introCls}`}>{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {art !== "none" && (
          <div aria-hidden className="relative hidden h-64 lg:block">
            {art === "wings" && (<>
              <Splash className="absolute right-10 top-0 w-56 opacity-90" color={tone === "birch" ? "#F5821F" : "#D52B1E"} />
              <WingArt hue="sauce" className="animate-float absolute right-4 top-10 w-72 drop-shadow-[0_24px_24px_rgba(0,0,0,.5)]" style={{ ["--r" as string]: "-14deg" }} />
              <Star className="animate-float absolute left-10 top-4 w-8" style={{ animationDelay: "1s" }} />
            </>)}
            {art === "arcade" && (<>
              <Joystick className="animate-float absolute right-16 top-6 w-40" />
              <Token className="animate-float absolute left-12 top-20 w-20" style={{ animationDelay: ".8s", ["--r" as string]: "10deg" }} />
              <Token className="animate-float absolute right-0 bottom-0 w-14" style={{ animationDelay: "1.6s" }} />
            </>)}
            {art === "party" && (<>
              <Token className="animate-float absolute right-20 top-4 w-28" style={{ ["--r" as string]: "-8deg" }} />
              <Star className="animate-float absolute left-16 top-16 w-12" style={{ animationDelay: ".6s" }} />
              <Star className="animate-float absolute right-4 bottom-4 w-8" color="#F5EEE2" style={{ animationDelay: "1.4s" }} />
            </>)}
          </div>
        )}
      </div>
    </section>
  );
}
