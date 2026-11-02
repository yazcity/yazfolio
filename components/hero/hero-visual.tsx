"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Three.js + R3F live in their own chunk and are never server-rendered.
const HeroScene = dynamic(() => import("./scene"), { ssr: false });

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

/** Decide on the client whether this device should get the live 3D scene. */
function canRun3D() {
  const nav = navigator as Nav;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) return false;
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  try {
    const c = document.createElement("canvas");
    if (!(c.getContext("webgl2") || c.getContext("webgl"))) return false;
  } catch {
    return false;
  }
  return true;
}

/**
 * Static, CSS-only constellation fallback is always rendered (instant, zero JS cost).
 * On capable devices the WebGL scene is loaded once the browser is idle — after the
 * page content has rendered — and fades in on top.
 */
export function HeroVisual() {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRun3D()) return;
    const start = () => setLoad(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1200);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!load) return;
    const id = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(id);
  }, [load]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <StaticFallback hidden={ready} />
      {load && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene />
        </div>
      )}
    </div>
  );
}

// Deterministic points (so server and client markup match), each linked to its two nearest neighbours.
const DOTS = Array.from({ length: 38 }, (_, i) => {
  const a = i * 2.39996;
  const r = 6 + Math.sqrt(i / 38) * 34;
  // Rounded so server and browser serialise identical attribute strings (no hydration mismatch).
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(50 + Math.cos(a) * r), y: round(50 + Math.sin(a) * r * 0.92), s: round(1.1 + (i % 4) * 0.5) };
});
const LINKS = (() => {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  DOTS.forEach((p, i) =>
    DOTS.map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ j }) => {
        const k = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(k)) {
          seen.add(k);
          out.push([i, j]);
        }
      }),
  );
  return out;
})();

function StaticFallback({ hidden }: { hidden: boolean }) {
  const dots = DOTS;
  return (
    <div className={`absolute inset-0 transition-opacity duration-1000 ${hidden ? "opacity-0" : "opacity-100"}`}>
      <div
        className="absolute left-1/2 top-1/2 size-[min(90vw,46rem)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle at 35% 40%, color-mix(in oklab, var(--accent) 35%, transparent), transparent 60%), radial-gradient(circle at 70% 65%, color-mix(in oklab, var(--accent-2) 30%, transparent), transparent 55%)",
          animation: "drift 14s ease-in-out infinite",
        }}
      />
      <svg viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 size-[min(92vw,40rem)] -translate-x-1/2 -translate-y-1/2 opacity-70">
        <g stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="0.15">
          {LINKS.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={dots[a].x} y1={dots[a].y} x2={dots[b].x} y2={dots[b].y} />
          ))}
        </g>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={Math.round(d.s * 45) / 100} fill={i % 7 === 0 ? "var(--accent-2)" : "var(--accent)"} />
        ))}
        <circle cx="50" cy="50" r="15" fill="none" stroke="var(--accent-2)" strokeOpacity="0.35" strokeWidth="0.2" strokeDasharray="1 1.4" />
      </svg>
    </div>
  );
}
