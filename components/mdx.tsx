import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";

function slugify(children: React.ReactNode) {
  return String(Array.isArray(children) ? children.join("") : children)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function heading(Tag: "h2" | "h3") {
  return function H({ children }: { children?: React.ReactNode }) {
    const id = slugify(children);
    return (
      <Tag id={id} className="group scroll-mt-24">
        <a href={`#${id}`} className="no-underline">
          {children}
          <span aria-hidden className="ml-2 text-accent opacity-0 transition group-hover:opacity-100">#</span>
        </a>
      </Tag>
    );
  };
}

/** Elements available inside .mdx posts. */
export const mdxComponents: MDXComponents = {
  h2: heading("h2"),
  h3: heading("h3"),
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
  img: ({ src, alt = "" }: ComponentProps<"img">) =>
    typeof src === "string" ? (
      <Image src={src} alt={alt} width={1200} height={675} sizes="(min-width: 768px) 720px, 100vw" className="rounded-xl border border-line" />
    ) : null,
  Callout: ({ children }: { children: React.ReactNode }) => (
    <aside className="not-prose my-8 rounded-2xl border border-accent/40 bg-surface p-5 text-fg">{children}</aside>
  ),
};
