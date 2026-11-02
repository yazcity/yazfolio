import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

// Deterministic "constellation" dots, echoing the 3D hero.
const dots = Array.from({ length: 26 }, (_, i) => {
  const a = i * 2.39996;
  const r = 120 + ((i * 37) % 11) * 12;
  return { x: 930 + Math.cos(a) * r, y: 315 + Math.sin(a) * r * 0.9, s: 6 + (i % 4) * 3, hub: i % 6 === 0 };
});

/** Branded 1200×630 social card. `title` defaults to your name. */
export function renderOg({ eyebrow, title, subtitle, footer }: { eyebrow?: string; title?: string; subtitle?: string; footer?: string } = {}) {
  const heading = title ?? profile.name;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "radial-gradient(circle at 80% 45%, #123a3a 0%, #0a0e17 55%)",
          color: "#e9edf5",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            style={{ position: "absolute", left: d.x, top: d.y, width: d.s, height: d.s, borderRadius: 999, background: d.hub ? "#c4b5fd" : "#5eead4", opacity: 0.85 }}
          />
        ))}
        <div style={{ position: "absolute", left: 820, top: 205, width: 220, height: 220, borderRadius: 999, border: "2px dashed rgba(196,181,253,0.5)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: 780 }}>
          <div style={{ display: "flex", fontSize: 24, color: "#5eead4", letterSpacing: 4, textTransform: "uppercase" }}>
            {eyebrow ?? new URL(site.url).hostname}
          </div>
          <div style={{ display: "flex", fontSize: heading.length > 40 ? 56 : 72, fontWeight: 800, lineHeight: 1.08, marginTop: 24, letterSpacing: -2 }}>
            {heading}
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 600, marginTop: 18, color: "#5eead4" }}>
            {subtitle ?? profile.role}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a1abbf", marginTop: 28, lineHeight: 1.35 }}>
            {footer ?? profile.valueStatement}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
