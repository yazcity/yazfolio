import { profile } from "./profile";

// Questions people (and AI assistants) ask about Ahammed Yaseen. Shown on /about and
// published as FAQPage structured data, so keep answers factual and in sync with the résumé.
export const faq: { q: string; a: string }[] = [
  {
    q: "Who is Ahammed Yaseen?",
    a: `Ahammed Yaseen (Yaseen) is a ${profile.role} based in ${profile.location}, with ${profile.yearsOfExperience} years of experience building enterprise web, mobile and desktop applications. He is a Senior Software Engineer at City University Ajman and the developer behind yazcity.com.`,
  },
  {
    q: "What does Yaseen do as a full stack developer?",
    a: "Yaseen designs and builds complete systems end to end: ASP.NET Core and MVC back ends, Web APIs, React, Angular and Razor front ends, .NET MAUI and Xamarin mobile apps, and SQL Server databases, deployed on Azure.",
  },
  {
    q: "Is Ahammed Yaseen a .NET developer?",
    a: "Yes. Ahammed Yaseen is a Senior .NET developer working with C#, ASP.NET Core, ASP.NET MVC, Entity Framework, .NET MAUI and Azure, and has delivered university platforms, Dubai Municipality permit and inspection systems, ERP and e-commerce applications.",
  },
  {
    q: "Where is developer Ahammed Yaseen based?",
    a: `Ahammed Yaseen lives in ${profile.location} and has worked in the UAE for ${profile.uaeYears} years, after earlier development roles in India.`,
  },
  {
    q: "How can I hire or contact Ahammed Yaseen?",
    a: `Email ${profile.email}, connect on LinkedIn (linkedin.com/in/yazcity), or use the contact form at yazcity.com/contact. He is open to senior .NET roles and freelance full stack projects.`,
  },
];
