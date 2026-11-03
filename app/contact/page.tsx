import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { ArrowUpRight, Download, Mail, MapPin, Phone } from "@/components/icons";

export const metadata = pageMetadata({
  title: "Contact – Hire a Senior .NET Developer in UAE",
  description: `Get in touch with ${profile.name}, ${profile.role} in the UAE — for senior .NET roles, freelance projects or consulting.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow={profile.availability}
        title="Let's build something that lasts."
        intro="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
      />
      <div className="container-page grid gap-10 py-8 lg:grid-cols-[1fr_22rem]">
        <ContactForm />
        <aside aria-label="Other ways to reach me" className="space-y-4">
          <a href={`mailto:${profile.email}`} className="card group flex items-center gap-4 p-5 transition hover:border-accent">
            <Mail className="text-accent" />
            <span><span className="block text-sm text-muted">Email</span>{profile.email}</span>
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="card group flex items-center gap-4 p-5 transition hover:border-accent">
            <Phone className="text-accent" />
            <span><span className="block text-sm text-muted">Phone</span>{profile.phone}</span>
          </a>
          <div className="card flex items-center gap-4 p-5">
            <MapPin className="text-accent" />
            <span><span className="block text-sm text-muted">Based in</span>{profile.location}</span>
          </div>
          <a href={profile.resumePath} download className="card flex items-center gap-4 p-5 transition hover:border-accent">
            <Download className="text-accent" />
            <span><span className="block text-sm text-muted">Résumé</span>Download PDF</span>
          </a>
          <ul className="flex flex-wrap gap-2 pt-2">
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="me noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-sm transition hover:border-accent hover:text-accent">
                  {s.label} <ArrowUpRight width={14} height={14} /><span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
