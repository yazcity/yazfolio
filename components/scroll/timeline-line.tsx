"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

/** Vertical timeline rail that draws itself as the reader scrolls through the list. */
export function TimelineLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
  return (
    <div ref={ref} aria-hidden className={`absolute inset-y-2 w-px bg-line ${className ?? ""}`}>
      <m.div
        style={{ scaleY: reduced ? 1 : scaleY }}
        className="absolute inset-0 origin-top bg-linear-to-b from-accent via-accent-2 to-accent shadow-[0_0_12px_rgb(var(--glow)/0.8)]"
      />
    </div>
  );
}
