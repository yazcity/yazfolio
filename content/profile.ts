import type { Profile } from "./types";

export const profile: Profile = {
  name: "Ahammed Yaseen",
  shortName: "Yaseen",
  role: "Senior Full Stack .NET Developer",
  valueStatement:
    "I build secure, scalable enterprise systems that quietly run whole organisations.",
  // Big statement on the home page that lights up word by word as you scroll.
  manifesto:
    "I turn complex business requirements into secure, scalable .NET platforms — from the database schema to the last pixel — and keep them running for the people who depend on them.",
  bio: [
    "I'm a Senior Full Stack .NET Developer with 12+ years of experience designing and delivering scalable enterprise applications across government, education and enterprise domains in the UAE and India.",
    "I specialise in .NET (6/8/10), ASP.NET Core, ASP.NET MVC, Web API and SQL Server, with Razor, React and Angular on the front end and .NET MAUI and Xamarin for mobile — plus RESTful APIs, authentication systems, CI/CD pipelines, containerised deployments and secure development aligned with OWASP.",
    "Today I lead development of enterprise platforms at City University Ajman — from gathering requirements with academic departments to architecture, delivery and mentoring junior developers.",
  ],
  location: "Ajman, UAE",
  email: "yaseenvk1990@gmail.com",
  phone: "+971 54 5198 340",
  avatar: {
    src: "/images/profile/yaseen.webp",
    alt: "Portrait of Ahammed Yaseen wearing a blue suit and checked tie",
  },
  // Your PDF lives at public/Ahammed-Yaseen-Resume.pdf — replace that file to update the download.
  resumePath: "/Ahammed-Yaseen-Resume.pdf",
  availability: "Open to senior .NET roles & freelance projects",
  yearsOfExperience: "12+",
  // UAE roles from 2018 onwards.
  uaeYears: "8+",
  achievements: [
    "Annual performance appraisal ratings above 97% for five consecutive years, with a highest score of 98.5%.",
    "Best Employee of the Month (March 2024) at City University Ajman for outstanding performance and ownership.",
    "Delivered multiple enterprise systems used across academic departments and administration.",
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yazcity/", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/yazcity", icon: "github" },
    { label: "GitLab", href: "https://gitlab.com/yazcity", icon: "gitlab" },
    { label: "Medium", href: "https://medium.com/@yazcity", icon: "medium" },
    { label: "Stack Overflow", href: "https://stackoverflow.com/users/31650770", icon: "stackoverflow" },
  ],
};
