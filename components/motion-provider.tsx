"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ReactLenis } from "lenis/react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * Motion (lazy-loaded feature bundle, honours reduced-motion) + Lenis smooth scrolling.
 * Lenis is skipped entirely when the user prefers reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  const content = (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );

  if (reduced) return content;
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      {content}
    </ReactLenis>
  );
}
