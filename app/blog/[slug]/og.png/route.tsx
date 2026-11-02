import { profile } from "@/content/profile";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { renderOg } from "@/lib/og";

// Per-post 1200×630 social preview, exported as /blog/<slug>/og.png.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOg({
    eyebrow: "Blog",
    title: post?.title ?? "Blog",
    subtitle: profile.name,
    footer: post ? formatDate(post.date) : undefined,
  });
}
