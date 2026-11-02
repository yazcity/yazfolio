import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const priorities: Record<string, number> = { "/": 1, "/resume": 0.9, "/about": 0.9, "/projects": 0.8, "/contact": 0.7, "/blog": 0.6 };
  const pages = Object.entries(priorities).map(([path, priority]) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
  const projectPages = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  const posts = getAllPosts()
    .filter((p) => !p.draft)
    .map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));
  return [...pages, ...projectPages, ...posts];
}

export const dynamic = "force-static";
