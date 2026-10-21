"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const KEY = "wackys.booted";

/**
 * A ~0.9 s arcade boot screen on the first page view of a session. It never blocks:
 * the page renders underneath, any click/key dismisses it, and reduced-motion skips it.
 */
export function PressStart() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = true;
    try { seen = sessionStorage.getItem(KEY) === "1"; sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 950);
    const dismiss = () => setShow(false);
    window.addEventListener("pointerdown", dismiss, { once: true });
    window.addEventListener("keydown", dismiss, { once: true });
    return () => { clearTimeout(t); window.removeEventListener("pointerdown", dismiss); window.removeEventListener("keydown", dismiss); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-scanlines"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(50% 0 50% 0)", opacity: 0.6 }}
          transition={{ duration: 0.35, ease: [0.7, 0, 0.84, 0] }}
        >
          <motion.p
            className="pixel text-[clamp(1.75rem,6vw,3.5rem)] font-bold glow-text"
            initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            PRESS START
          </motion.p>
          <div className="h-3 w-56 overflow-hidden rounded-[2px] border-2 border-aurora">
            <motion.div className="h-full bg-aurora" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.75, ease: "linear" }} />
          </div>
          <p className="pixel text-[13px] text-amber">PLAYER 1 · READY</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
