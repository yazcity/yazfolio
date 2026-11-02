import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { certifications, education } from "@/content/education";
import { absoluteUrl } from "./seo";

export const PERSON_ID = absoluteUrl("/#person");

/** schema.org Person — helps Google connect "Ahammed Yaseen" searches to this site and your profiles. */
export function personSchema() {
  const current = experience[0];
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    alternateName: [...site.alternateNames],
    givenName: "Ahammed",
    familyName: "Yaseen",
    jobTitle: profile.role,
    description: site.description,
    url: site.url,
    image: absoluteUrl(profile.avatar.src),
    email: `mailto:${profile.email}`,
    telephone: profile.phone.replace(/\s/g, ""),
    address: { "@type": "PostalAddress", addressLocality: "Sharjah", addressCountry: "AE" },
    worksFor: { "@type": "Organization", name: current.company },
    hasOccupation: {
      "@type": "Occupation",
      name: profile.role,
      occupationLocation: { "@type": "Country", name: "United Arab Emirates" },
      skills: skillGroups.flatMap((g) => g.skills).join(", "),
    },
    alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.title,
      ...(c.issuer ? { recognizedBy: { "@type": "Organization", name: c.issuer } } : {}),
    })),
    knowsAbout: skillGroups.flatMap((g) => g.skills),
    sameAs: profile.socials.map((s) => s.href),
  };
}

/** ProfilePage wrapper (Google's recommended markup for personal profile pages). */
export function profilePageSchema(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name,
    dateModified: new Date().toISOString(),
    mainEntity: personSchema(),
  };
}
