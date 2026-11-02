import Image from "next/image";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Notes on .NET, React, SQL Server and building enterprise software — lessons from real projects by Ahammed Yaseen.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Blog", path: "/blog" }]}
        eyebrow="Writing"
        title="Notes from the stack."
        intro="I love building things, and I like writing down what I learn along the way — .NET, React, databases and the craft of shipping enterprise software."
      />
      <section aria-label="Posts" className="container-page py-8">
        {posts.length === 0 ? (
          <p className="text-muted">New posts are on the way.</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={(i % 2) * 0.06}>
                <article className="card group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-accent/50">
                  {post.cover && (
                    <div className="relative aspect-[1200/630] overflow-hidden border-b border-line">
                      <Image src={post.cover} alt={post.coverAlt ?? ""} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm text-muted">
                      <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
                      {post.draft && <span className="ml-2 rounded bg-accent-2 px-1.5 py-0.5 text-xs font-semibold text-bg">DRAFT</span>}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-muted">{post.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                      {post.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">#{t}</li>
                      ))}
                    </ul>
                  </div>
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.25rem] group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-accent" />
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
