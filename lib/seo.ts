import type { Metadata } from "next";
import { site } from "@/content/site";

/** Page paths end with "/" (GitHub Pages serves folder/index.html); file paths keep their extension. */
export const pagePath = (path = "/") => (path === "/" || /\.[a-z0-9]+$/i.test(path) || path.endsWith("/") ? path : `${path}/`);

export const absoluteUrl = (path = "/") => new URL(pagePath(path), site.url).toString();

export const DEFAULT_OG_IMAGE = "/og.png";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  tags?: string[];
};

/** Unique title, description, canonical, Open Graph and Twitter tags for a page. */
export function pageMetadata({ title, description, path, image = DEFAULT_OG_IMAGE, type = "website", publishedTime, tags }: PageMeta): Metadata {
  const url = pagePath(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: site.name,
      locale: site.locale,
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags ? { tags } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
