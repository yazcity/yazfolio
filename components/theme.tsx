"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "./icons";

const STORAGE_KEY = "theme";

/**
 * Inline, render-blocking script that sets the theme class before first paint,
 * so there is no flash of the wrong theme. Defaults to the OS preference.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

/** Current theme as a reactive value (also used by the 3D scene). */
export function useIsDark() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => true,
  );
}

export function ThemeToggle() {
  const isDark = useIsDark();

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable — theme still switches for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-10 place-items-center rounded-full border border-line text-fg transition hover:border-accent hover:text-accent"
    >
      <span className="sr-only">Toggle theme</span>
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </button>
  );
}
