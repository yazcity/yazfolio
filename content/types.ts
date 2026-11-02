// Shared types for everything in /content. Edit the data files, not this one.

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "gitlab" | "linkedin" | "medium" | "stackoverflow" | "facebook" | "mail";
};

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  valueStatement: string;
  manifesto: string;
  bio: string[];
  location: string;
  email: string;
  phone: string;
  avatar: { src: string; alt: string };
  resumePath: string;
  availability: string;
  yearsOfExperience: string;
  uaeYears: string;
  achievements: string[];
  socials: SocialLink[];
};

export type Experience = {
  role: string;
  company: string;
  /** Optional — a monogram is shown when there's no logo. */
  logo?: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
};

export type Project = {
  slug: string;
  title: string;
  fullTitle: string;
  tagline: string;
  description: string;
  /** "logo" images are centred on a light panel; "cover" images fill the frame. */
  image: { src: string; alt: string; style: "logo" | "cover" };
  featured: boolean;
  /** Where the work was done — shown on cards. */
  client: string;
  year: string;
  role: string;
  tech: string[];
  problem: string;
  approach: string[];
  modules: string[];
  result: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Shown when the source can't be public (e.g. proprietary client work). */
  sourceNote?: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export type Education = {
  school: string;
  degree: string;
  logo: string;
  period: string;
  location?: string;
  summary?: string;
  highlights: string[];
};

export type Certification = {
  title: string;
  description: string;
  /** Optional — a branded placeholder is shown when there's no image. */
  image?: string;
  issuer?: string;
  date?: string;
  url?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
};
