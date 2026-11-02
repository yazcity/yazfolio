import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { mdxComponents } from "@/components/mdx";
import { JsonLd } from "@/components/ui";
import { ArrowLeft } from "@/components/icons";
import { ContactCta } from "@/components/sections/contact-cta";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      image: `/blog/${post.slug}/og.png`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    }),
    keywords: post.keywords ?? post.tags,
    ...(post.draft ? { robots: { index: false } } : {}),
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    keywords: (post.keywords ?? post.tags).join(", "),
    mainEntityOfPage: url,
    url,
    image: new URL(`/blog/${post.slug}/og.png`, site.url).toString(),
    author: { "@type": "Person", name: profile.name, url: site.url },
    publisher: { "@type": "Person", name: profile.name, url: site.url },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="pt-28">
        <header className="container-page max-w-3xl">
          <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
          <p className="mt-8 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-xl text-muted">{post.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">#{t}</li>
            ))}
          </ul>
        </header>

        {post.cover && (
          <div className="container-page mt-10 max-w-4xl">
            <div className="relative aspect-[1200/630] overflow-hidden rounded-[1.5rem] border border-line">
              <Image src={post.cover} alt={post.coverAlt ?? ""} fill priority sizes="(min-width: 896px) 864px, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        <div className="container-page mt-12 max-w-3xl">
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:font-semibold prose-a:text-accent prose-a:underline-offset-4 prose-code:rounded prose-code:bg-surface-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-line prose-pre:bg-[#0d1321] prose-strong:text-fg [--tw-prose-body:var(--text)] [--tw-prose-invert-body:var(--text)]">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <footer className="mt-16 flex items-center gap-4 border-t border-line pt-8">
            <Image src={profile.avatar.src} alt="" width={56} height={56} className="size-14 rounded-full object-cover object-top" />
            <div>
              <p className="font-semibold">Written by {profile.name}</p>
              <p className="text-sm text-muted">{profile.role} · {profile.location}</p>
            </div>
          </footer>
          <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-muted hover:text-fg">
            <ArrowLeft /> All posts
          </Link>
        </div>
      </article>
      <ContactCta />
    </>
  );
}
