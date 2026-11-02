import type { Experience } from "./types";

// Newest first. Source: résumé (Ahammed_Yaseen_Resume.pdf).
export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "City University Ajman",
    logo: "/images/companies/city-university.png",
    location: "Ajman, UAE",
    start: "Sep 2020",
    end: "Present",
    summary:
      "Leading development of complex software solutions, including the University Management System (UMS), Lead Management, Task Management, Tactical Operational Plans and the university mobile app.",
    highlights: [
      "Architected robust solutions using .NET 8 and optimised SQL Server databases with high-efficiency stored procedures.",
      "Developed responsive web UIs and cross-platform mobile interfaces using .NET MAUI.",
      "Implemented JWT authentication, role-based access control and approval workflows across enterprise modules.",
      "Integrated government services, including MOE certificate attestation APIs.",
      "Mentored junior developers and maintained code quality through code reviews, performance tuning and security best practices.",
    ],
  },
  {
    role: "Senior Application Web Developer",
    company: "Ali Mousa Holding",
    logo: "/images/companies/ali-mousa.png",
    location: "Sharjah, UAE",
    start: "Sep 2019",
    end: "Sep 2020",
    summary:
      "Managed IT operations and enterprise applications for 12 subsidiaries and 400+ users across the UAE, in real estate, construction and manufacturing.",
    highlights: [
      "Designed and maintained ERP, HR and Payroll modules using Oracle APEX, ASP.NET MVC and SQL Server.",
      "Built and maintained applications for Attendance, BOQ Costing, Asset Management and Finance.",
      "Created reports with Oracle APEX and SSRS.",
      "Administered data centres and resolved high-level technical escalations via ManageEngine ServiceDesk.",
    ],
  },
  {
    role: ".NET Developer",
    company: "Canada Hitech",
    logo: "/images/companies/canada-hitech.webp",
    location: "Ajman, UAE",
    start: "Jan 2018",
    end: "Jun 2019",
    summary:
      "Developed specialised software for the Dubai Government, including Dubai Municipality's inspection and advertisement-permit systems, plus an e-commerce platform.",
    highlights: [
      "Built inspection workflow modules, reporting dashboards and regulatory compliance tracking with ASP.NET MVC and SQL Server.",
      "Developed an online advertisement-permit system with multi-level approval workflows for municipality officials.",
      "Integrated third-party applications and payment gateways using secure SOAP/RESTful APIs.",
      "Used ASP.NET Core MVC and TFS for clean, version-controlled code delivery.",
    ],
  },
  {
    role: ".NET Developer",
    company: "Woduru InfoTech",
    location: "Kerala, India",
    start: "Mar 2016",
    end: "Jun 2018",
    summary:
      "Responsible for full-cycle development — analysis, coding and debugging — of the CAMPUSKEY and PULSE projects.",
    highlights: [
      "Implemented a Database-First approach with ASP.NET MVC.",
      "Contributed to software marketing and risk analysis.",
    ],
  },
  {
    role: "Software Engineer",
    company: "AIN Technologies",
    location: "Kerala, India",
    start: "Aug 2013",
    end: "Sep 2015",
    summary: "Designed and tested ASP.NET web and Windows applications (ACOMS and SYSBIZZ).",
    highlights: ["Handled database design including tables, stored procedures and views using SQL Server 2008."],
  },
];
