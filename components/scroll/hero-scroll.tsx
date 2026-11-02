"use client";

import type { ReactNode } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";

/** Hero copy lifts away, shrinks slightly and fades as you scroll into the page. */
export function HeroScroll({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -140]);
  const opacity = useTransform(scrollY, [0, 520], [1, reduced ? 1 : 0]);
  const scale = useTransform(scrollY, [0, 700], [1, reduced ? 1 : 0.94]);
  return (
    <m.div style={{ y, opacity, scale }} className={`origin-top-left ${className ?? ""}`}>
      {children}
    </m.div>
  );
}
