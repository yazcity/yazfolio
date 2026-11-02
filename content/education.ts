import type { Certification, Education } from "./types";

export const education: Education[] = [
  {
    school: "Anna University",
    degree: "B.E. in Computer Science and Engineering",
    logo: "/images/education/anna-university.png",
    period: "Jun 2008 – Mar 2012",
    location: "Tamil Nadu, India",
    highlights: [
      "Gained a strong foundation in computer science concepts including algorithms, data structures, and software engineering principles.",
      "Completed a mini project on an Automatic Crowd-Based Light and Fan Control System using the 8051 Microcontroller.",
      "Completed a major project on Cloud Computing Simulation and developed an E-Commerce Web Application using ASP.NET Web Forms and SQL Server.",
    ],
  },
  {
    school: "Government Higher Secondary School",
    degree: "Higher Secondary — Biology Science",
    logo: "/images/education/khseb.webp",
    period: "Jun 2005 – Mar 2007",
    location: "Kerala, India",
    summary: "Completed Higher Secondary education in Biology Science with 80% marks.",
    highlights: [
      "Built a solid foundation in scientific reasoning and logical thinking.",
      "Learned the importance of precision, observation, and an analytical approach — skills I now apply in software development.",
    ],
  },
];

// Add a public `url` for any certificate you can link to.
export const certifications: Certification[] = [
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    description: "Core Azure cloud concepts, services, security and DevOps fundamentals for modern enterprise solutions.",
    image: "/images/certifications/azure-az900.webp",
    issuer: "Microsoft · LinkedIn Learning",
    url: "https://drive.google.com/file/d/0B7kazrtMwm5dYkVvNjdNWjNybWJrbndFSHpNY2NFV1p4YmU0/view?usp=sharing",
  },
  {
    title: "ASP.NET Core Identity & Authentication",
    description: "Secure authentication, authorisation and role-based access using ASP.NET Core Identity.",
    image: "/images/certifications/aspnet-identity.webp",
    issuer: "Specialist certification",
  },
  {
    title: "Leadership: Theory & Practice",
    description: "Leadership principles to guide, motivate and manage high-performing cross-functional teams.",
    image: "/images/certifications/leadership.webp",
    issuer: "QASPIR Professional Development",
  },
  {
    title: "Project Management: Effective Planning & Execution",
    description: "Planning, execution and delivery techniques for achieving project goals on time.",
    image: "/images/certifications/project-management.webp",
    issuer: "QASPIR",
  },
  {
    title: "Oracle Database 11g",
    description: "Oracle database fundamentals — SQL, PL/SQL and administration.",
    issuer: "Oracle",
  },
  {
    title: "CCNA (Routing & Switching)",
    description: "Networking fundamentals: routing, switching and network infrastructure.",
    issuer: "Cisco",
  },
  {
    title: "Problem Solving Tools & Techniques",
    description: "Analytical thinking to identify root causes and craft efficient, data-driven solutions.",
    image: "/images/certifications/problem-solving.webp",
  },
  {
    title: "Best Employee of the Month",
    description: "Awarded in March 2024 for outstanding performance and ownership.",
    image: "/images/certifications/best-employee.webp",
    issuer: "City University Ajman",
    date: "March 2024",
  },
];
