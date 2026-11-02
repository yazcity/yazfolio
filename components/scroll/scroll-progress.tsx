"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

/** Thin gradient bar along the top edge showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden
      style={{ scaleX, background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left motion-reduce:hidden"
    />
  );
}
