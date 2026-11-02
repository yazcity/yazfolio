import type { SkillGroup } from "./types";

// Grouped for readability. Source: résumé + your notes.
export const skillGroups: SkillGroup[] = [
  {
    title: "Back-end & APIs",
    description:
      "Secure, high-performance back ends and RESTful APIs on modern .NET — the core of everything I build.",
    skills: ["C#", ".NET 10 / 8 / 6", "ASP.NET Core", "ASP.NET MVC", "Web API", "Entity Framework Core", "ADO.NET", "LINQ", "Microservices"],
  },
  {
    title: "Front-end",
    description: "Responsive, interactive interfaces — server-rendered with Razor or as rich client apps.",
    skills: ["Razor", "React", "Angular", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Bootstrap", "jQuery & AJAX"],
  },
  {
    title: "Mobile & Desktop",
    description: "Cross-platform mobile apps and Windows desktop applications from one .NET skill set.",
    skills: [".NET MAUI", "Xamarin", "MVVM", "WPF (XAML)", "Windows Forms"],
  },
  {
    title: "Data & Reporting",
    description: "Database design and SQL performance optimisation, plus the reports and dashboards people rely on.",
    skills: ["SQL Server", "Oracle (SQL, PL/SQL)", "Oracle APEX", "MongoDB", "SQLite", "SSRS", "Power BI", "RDLC"],
  },
  {
    title: "Cloud & DevOps",
    description: "Shipping reliably — version control, CI/CD and containerised deployments on Azure.",
    skills: ["Azure", "Docker", "Git", "GitHub", "GitHub Actions (CI/CD)", "TFS"],
  },
  {
    title: "Security & Architecture",
    description: "Clean, maintainable architecture and secure-by-default applications.",
    skills: ["JWT", "OAuth 2.0", "RBAC", "OWASP Top 10", "Clean Architecture", "SOLID", "Repository & Unit of Work", "Dependency Injection"],
  },
];

export const tools = ["Visual Studio", "VS Code", "SQL Server Management Studio", "Postman", "Swagger", "Microsoft 365 & OneDrive"];

export const competencies = [
  "Enterprise Application Development",
  "Microservices Architecture",
  "RESTful API Development",
  "SQL Performance Optimization",
  "Secure Application Development",
  "System Architecture & Design",
  "Agile / SDLC Best Practices",
];
