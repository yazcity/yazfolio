import Link from "next/link";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { ArrowUpRight } from "./icons";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold">{profile.name}</p>
          <p className="mt-2 max-w-sm text-muted">{profile.role}. {profile.valueStatement}</p>
          <a href={`mailto:${profile.email}`} className="mt-4 inline-block font-medium text-accent underline-offset-4 hover:underline">
            {profile.email}
          </a>
        </div>
        <div>
          <h2 className="eyebrow">Pages</h2>
          <ul className="mt-3 space-y-2">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-muted transition hover:text-fg">{n.label}</Link>
              </li>
            ))}
            <li>
              <a href={profile.resumePath} className="text-muted transition hover:text-fg" download>Résumé (PDF)</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow">Elsewhere</h2>
          <ul className="mt-3 space-y-2">
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-muted transition hover:text-fg">
                  {s.label}
                  <ArrowUpRight width={14} height={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-page flex flex-col justify-between gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with Next.js, Three.js &amp; care.</p>
      </div>
    </footer>
  );
}
