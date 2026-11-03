// Site-wide settings used for SEO, metadata, sitemap and navigation.

export const site = {
  url: "https://yazcity.com",
  name: "Ahammed Yaseen",
  // Other names people may search for (used in structured data).
  alternateNames: ["Ahammed Yaseen Vadakkayil", "Yaseen Ahammed", "Yaseen"],
  // ~60 characters: name first, then what people search for.
  title: "Ahammed Yaseen – Senior .NET Developer | Portfolio & Resume",
  // ~155 characters.
  description:
    "Portfolio, resume & CV of Ahammed Yaseen — Senior Full Stack .NET Developer in Ajman, UAE with 12+ years in ASP.NET Core, React, Angular, .NET MAUI & SQL Server.",
  keywords: [
    "Ahammed Yaseen",
    "Ahammed Yaseen portfolio",
    "Ahammed Yaseen resume",
    "Ahammed Yaseen CV",
    "Ahammed Yaseen Vadakkayil",
    "yazcity",
    "Senior .NET Developer",
    "Senior .NET Developer UAE",
    "Full Stack .NET Developer Ajman",
    "ASP.NET Core developer",
    ".NET MAUI developer",
  ],
  locale: "en_US",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Résumé" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
