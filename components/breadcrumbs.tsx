import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";
import { JsonLd } from "./ui";

type Crumb = { name: string; path: string };

/** Visible breadcrumb trail + matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
        }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i < all.length - 1 ? (
                <>
                  <Link href={c.path} className="hover:text-fg">{c.name}</Link>
                  <span aria-hidden>/</span>
                </>
              ) : (
                <span aria-current="page" className="text-fg">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Standard top-of-page header for inner pages. */
export function PageHeader({ eyebrow, title, intro, crumbs }: { eyebrow: string; title: string; intro?: string; crumbs: Crumb[] }) {
  return (
    <header className="relative isolate overflow-hidden pb-12 pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div className="container-page">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
    </header>
  );
}
