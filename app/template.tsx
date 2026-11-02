"use client";

import { useState } from "react";
import * as m from "motion/react-m";

// True once the first page has been shown in the browser. Server renders and the very
// first client render skip the entrance, so server HTML is visible immediately (good LCP).
let hasNavigated = false;

/** Page transition: routes fade and settle in on client-side navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === "undefined") return false;
    const should = hasNavigated;
    hasNavigated = true;
    return should;
  });

  return (
    <m.div
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </m.div>
  );
}
