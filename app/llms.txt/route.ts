import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { projects } from "@/content/projects";
import { certifications, education } from "@/content/education";
import { faq } from "@/content/faq";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, pagePath } from "@/lib/seo";

// /llms.txt — a plain-text profile summary for AI assistants (Claude, ChatGPT, etc.),
// built from the same content files as the site so it never goes stale.
export const dynamic = "force-static";

export function GET() {
  const link = (title: string, path: string, note?: string) => `- [${title}](${absoluteUrl(pagePath(path))})${note ? `: ${note}` : ""}`;
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${site.description}`,
    "",
    `${profile.name} (also known as ${site.alternateNames.join(", ")}) is a ${profile.role} based in ${profile.location}. ${profile.availability}.`,
    "",
    ...profile.bio.flatMap((p) => [p, ""]),
    "## Contact",
    "",
    `- Website: ${site.url}`,
    `- Email: ${profile.email}`,
    `- Location: ${profile.location}`,
    ...profile.socials.map((s) => `- ${s.label}: ${s.href}`),
    `- Resume (PDF): ${absoluteUrl(profile.resumePath)}`,
    "",
    "## Experience",
    "",
    ...experience.map((e) => `- ${e.role}, ${e.company} (${e.location}), ${e.start} – ${e.end}: ${e.summary}`),
    "",
    "## Skills",
    "",
    ...skillGroups.map((g) => `- ${g.title}: ${g.skills.join(", ")}`),
    "",
    "## Key achievements",
    "",
    ...profile.achievements.map((a) => `- ${a}`),
    "",
    "## Education & certifications",
    "",
    ...education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`),
    ...certifications.map((c) => `- ${c.title}${c.issuer ? ` (${c.issuer})` : ""}`),
    "",
    "## Frequently asked",
    "",
    ...faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Pages",
    "",
    link("About", "/about", `Who ${profile.name} is`),
    link("Resume / CV", "/resume", "Full résumé as a web page"),
    link("Projects", "/projects", "Case studies of enterprise systems"),
    link("Contact", "/contact"),
    "",
    "## Projects",
    "",
    ...projects.map((p) => link(p.fullTitle, `/projects/${p.slug}`, `${p.client}, ${p.year}`)),
    "",
    "## Blog",
    "",
    ...getAllPosts().map((p) => link(p.title, `/blog/${p.slug}`)),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
