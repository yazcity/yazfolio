import type { Project } from "./types";

// Case studies. Stacks, modules and bullet points come from the résumé unless marked TODO.
// These are proprietary systems, so there are no public live/source links; each case
// study links to the GitHub profile instead. Add `liveUrl` only for links that are safe
// to make public.
const PROPRIETARY_CU = "Proprietary system built for City University Ajman — source code and live instance are internal.";
const PROPRIETARY_DM = "Built for Dubai Municipality while at Canada Hitech — source code and live instance are not public.";
const GITHUB = "https://github.com/yazcity";

export const projects: Project[] = [
  {
    slug: "university-management-system",
    title: "UMS",
    fullTitle: "University Management System",
    tagline: "One platform for planning, faculty operations, compliance and reporting.",
    description:
      "An enterprise academic management platform supporting institutional planning, faculty operations, compliance tracking and academic reporting across City University Ajman.",
    image: { src: "/images/projects/ums.webp", alt: "University Management System (UMS) logo", style: "logo" },
    featured: true,
    client: "City University Ajman",
    year: "2020 – Present",
    role: "Lead full-stack developer",
    tech: ["C#", "ASP.NET MVC", "ADO.NET", "SQL Server", "REST API", "jQuery & AJAX", "Bootstrap", "HTML5 / CSS3"],
    problem:
      "Academic departments needed one place to plan, run and evidence their work — appraisals, operational plans, course files, research and compliance — instead of scattered documents and manual approvals.",
    approach: [
      "Gathered functional requirements directly from academic departments and translated them into scalable software modules.",
      "Designed relational database schemas and optimised SQL queries for large academic datasets.",
      "Developed full-stack modules — UI components, business logic and data-access layers — with approval workflows for compliance and operational planning.",
      "Integrated government services, including MOE certificate attestation APIs, and built dashboards and reports for academic administrators.",
    ],
    modules: [
      "Employee Appraisal",
      "Tactical Operational Plan (TOPS)",
      "Benchmarking",
      "Study Plan Audit",
      "Advising Management",
      "Risk Register",
      "Event Management",
      "Course Files",
      "Course Rubrics",
      "Course Delivery Plans",
      "Program Revision Records",
      "Research Management",
      "Professional Development Tracking",
      "CSR Management",
    ],
    result:
      "A single enterprise platform used across academic departments and administration, with built-in approval workflows, government integrations and reporting.",
    githubUrl: GITHUB,
    sourceNote: PROPRIETARY_CU,
  },
  {
    slug: "lead-management-system",
    title: "LMS",
    fullTitle: "Lead Management System",
    tagline: "From first inquiry to enrolment, nothing slips.",
    description:
      "A platform for tracking prospective students and managing the admissions pipeline, with dashboards for leads, follow-ups and conversion metrics.",
    image: { src: "/images/projects/lms.webp", alt: "Lead Management System (LMS) logo", style: "logo" },
    featured: true,
    client: "City University Ajman",
    year: "2020 – Present",
    role: "Full-stack developer",
    tech: [".NET 8 Web API", "Entity Framework Core", "SQL Server", "React", "TypeScript", "Tailwind CSS", "JWT"],
    problem:
      "Admissions teams needed a structured way to capture student inquiries, follow up consistently and see which leads were converting.",
    approach: [
      "Designed and implemented RESTful APIs with .NET 8 and Entity Framework Core.",
      "Built a modern React + TypeScript front end.",
      "Implemented JWT authentication and role-based authorisation for agents and team leads.",
      "Designed optimised SQL Server structures for lead tracking and admissions processes.",
    ],
    modules: ["Lead entry & tracking", "Follow-ups", "Role-based access", "Admissions pipeline", "Conversion dashboards", "Notifications"],
    result:
      "A clear, trackable admissions pipeline with dashboards for leads, follow-ups and conversion metrics.",
    githubUrl: GITHUB,
    sourceNote: PROPRIETARY_CU,
  },
  {
    slug: "university-mobile-app",
    title: "Mobile App",
    fullTitle: "University Mobile Application",
    tagline: "Academic services in every student's pocket.",
    description:
      "A cross-platform mobile platform providing academic services for students and staff — course registration, academic records and notifications.",
    image: { src: "/images/projects/mobile-app-mockup.webp", alt: "Illustration of the student mobile app: a home screen with courses, records, schedule and alerts, and a notifications screen", style: "cover" },
    featured: true,
    client: "City University Ajman",
    year: "2020 – Present",
    role: "Full-stack & mobile developer",
    tech: [".NET MAUI", "MVVM", ".NET 8 Web API", "Entity Framework Core", "SQL Server", "JWT"],
    problem:
      "Students and staff needed secure, mobile access to everyday academic services without going through the web portal.",
    approach: [
      "Developed the back-end APIs that power the mobile services.",
      "Built cross-platform apps with .NET MAUI using the MVVM architecture.",
      "Implemented secure JWT authentication and API security mechanisms.",
    ],
    modules: ["Course registration", "Academic records", "Notifications", "Secure sign-in"],
    result: "One .NET MAUI codebase delivering academic services to students and staff on their phones.",
    githubUrl: GITHUB,
    sourceNote: PROPRIETARY_CU,
  },
  {
    slug: "advertisement-permit-system",
    title: "Ad Permits",
    fullTitle: "Advertisement Permit Management System",
    tagline: "Online permits for Dubai businesses, end to end.",
    description:
      "An online system for Dubai Municipality that lets businesses request advertisement permits, with multi-level approvals and secure payments.",
    image: { src: "/images/projects/advertisement-permits-mockup.webp", alt: "Illustration of the permit request screen with an apply, review, approve and pay workflow and an ad preview", style: "cover" },
    featured: true,
    client: "Dubai Municipality · Canada Hitech",
    year: "2018 – 2019",
    role: ".NET developer",
    tech: ["ASP.NET MVC", "C#", "SQL Server", "SOAP / REST APIs", "Payment gateway"],
    problem:
      "Businesses needed to apply for advertisement permits online, and municipality officials needed a controlled way to review and approve them.",
    approach: [
      "Developed the online permit-request system for businesses.",
      "Implemented multi-level approval workflows for municipality officials.",
      "Integrated secure payment-gateway services for permit processing.",
    ],
    modules: ["Permit applications", "Multi-level approvals", "Online payments", "Status tracking"],
    result: "A digital permit process for Dubai businesses, from application through approval and payment.",
    githubUrl: GITHUB,
    sourceNote: PROPRIETARY_DM,
  },
  {
    slug: "task-management-system",
    title: "TMS",
    fullTitle: "Task Management System",
    tagline: "Project tasks and workflows, visible to everyone who needs them.",
    description:
      "An internal workflow system used to manage project tasks and organisational workflows, with productivity dashboards and notifications.",
    image: { src: "/images/projects/task-management-badge.webp", alt: "Task Management System (TMS) project badge", style: "logo" },
    featured: false,
    client: "City University Ajman",
    year: "2020 – Present",
    role: "Full-stack developer",
    tech: [".NET 8 Web API", "Entity Framework Core", "SQL Server", "React", "TypeScript", "Tailwind CSS"],
    problem:
      "Managers needed to assign, track and report on project tasks across teams without relying on email and spreadsheets.",
    approach: [
      "Designed and developed task-tracking modules and workflow management features.",
      "Developed SQL stored procedures and reporting queries for project analytics.",
      "Implemented role-based access control for managers and employees.",
      "Integrated alerts and notifications for task updates.",
    ],
    modules: ["Task tracking", "Workflow management", "Productivity dashboards", "Role-based access", "Alerts & notifications"],
    result: "Dashboards that show team productivity and project progress at a glance.",
    githubUrl: GITHUB,
    sourceNote: PROPRIETARY_CU,
  },
  {
    slug: "inspection-system",
    title: "Inspections",
    fullTitle: "Inspection System",
    tagline: "Inspection workflows and compliance tracking for a city.",
    description:
      "Inspection workflow modules for Dubai Municipality, with reporting dashboards and regulatory compliance tracking.",
    image: { src: "/images/projects/inspection-system-mockup.webp", alt: "Illustration of a tablet inspection app with a checklist, photo evidence and compliance status", style: "cover" },
    featured: false,
    client: "Dubai Municipality · Canada Hitech",
    year: "2018 – 2019",
    role: ".NET developer",
    tech: ["ASP.NET MVC", "C#", "SQL Server", "RBAC"],
    problem:
      "Inspections needed a consistent digital workflow, with compliance tracked and reported centrally.",
    approach: [
      "Developed inspection workflow modules using ASP.NET MVC and SQL Server.",
      "Implemented reporting dashboards and regulatory compliance tracking.",
      "Developed secure authentication and role-based access control.",
    ],
    modules: ["Inspection workflows", "Compliance tracking", "Reporting dashboards", "Secure, role-based access"],
    result: "Digitised inspection workflows with central compliance reporting.",
    githubUrl: GITHUB,
    sourceNote: PROPRIETARY_DM,
  },
  {
    slug: "e-commerce-application",
    title: "E-Commerce",
    fullTitle: "E-Commerce Application",
    tagline: "Products, orders and payments on ASP.NET Core.",
    description: "An e-commerce platform with product management, order processing, payment-gateway integration and order tracking.",
    image: { src: "/images/projects/e-commerce-mockup.webp", alt: "Illustration of an online storefront with a product grid, shopping cart and order confirmation", style: "cover" },
    featured: false,
    client: "Canada Hitech",
    year: "2018 – 2019",
    role: ".NET developer",
    tech: ["ASP.NET Core Web API", "Entity Framework", "C#", "SQL Server", "Payment gateway"],
    problem: "The business needed to manage products and process orders and payments online.",
    approach: [
      "Developed back-end APIs with ASP.NET Core Web API and Entity Framework.",
      "Built a responsive UI for product management and order processing.",
      "Implemented payment-gateway integration and order tracking.",
    ],
    modules: ["Product management", "Order processing", "Payments", "Order tracking"],
    result: "An end-to-end online ordering flow, from catalogue to payment and tracking.",
    githubUrl: GITHUB,
    sourceNote: "Client project built at Canada Hitech — source code is not public.",
  },
  {
    slug: "tipam",
    title: "TIPAM",
    fullTitle: "TIPAM — Academic Management Platform",
    tagline: "Academic quality assurance, automated end to end.",
    description:
      "An advanced academic management platform that automates university academic processes — a unified solution for academic quality assurance, accreditation and continuous improvement.",
    image: { src: "/images/projects/tipam.webp", alt: "TIPAM academic management platform logo", style: "logo" },
    featured: true,
    client: "City University Ajman",
    year: "2020 – Present",
    role: "Lead full-stack developer",
    // TODO: confirm the stack (assumed to match UMS).
    tech: ["C#", "ASP.NET MVC", "ADO.NET", "SQL Server", "jQuery & AJAX", "Bootstrap"],
    problem:
      "Accreditation and quality-assurance work — syllabi, moderation, CLO–PLO mapping, self-evaluations, faculty CVs — required collecting large amounts of evidence by hand every cycle.",
    approach: [
      "Modelled the full academic quality cycle as connected modules, so data entered once flows into every report that needs it.",
      "Automated mapping between Course Learning Outcomes and Program Learning Outcomes.",
      "Centralised faculty records — CVs, research, professional development and CSR — for reuse across reviews.",
    ],
    modules: [
      "Course syllabus management",
      "Moderation",
      "Exams",
      "Course delivery planning",
      "CLO–PLO mapping",
      "Course & program revision",
      "Critical self-evaluation",
      "Research & development tracking",
      "Faculty CV management",
      "Grading",
      "PDP",
      "CSR activities",
    ],
    result:
      "A unified academic quality platform that supports continuous improvement and accreditation reporting.",
    githubUrl: GITHUB,
    sourceNote: PROPRIETARY_CU,
  },
  {
    slug: "sysbizz-erp",
    title: "SYSBIZZ",
    fullTitle: "SYSBIZZ ERP",
    tagline: "Day-to-day business operations in one ERP.",
    description:
      "An ERP application built at AIN Technologies, delivered as ASP.NET web and Windows applications on SQL Server.",
    image: { src: "/images/projects/sysbizz-mockup.webp", alt: "Illustration of a Windows ERP application with sales, purchase, inventory and accounts modules, a sales chart and transactions", style: "cover" },
    featured: false,
    client: "AIN Technologies",
    year: "2013 – 2015",
    role: "Software engineer",
    // TODO: confirm the stack and modules.
    tech: ["ASP.NET", "C#", "Windows Forms", "SQL Server 2008", "Stored procedures"],
    problem:
      "Businesses needed their core operations — records, transactions and reporting — managed in a single integrated system rather than separate tools.",
    approach: [
      "Designed and tested the ASP.NET web and Windows application modules.",
      "Handled the database design: tables, stored procedures and views in SQL Server 2008.",
    ],
    // TODO: replace with the real SYSBIZZ modules.
    modules: ["Masters & configuration", "Transactions", "Inventory", "Accounts", "Reports"],
    result: "An integrated ERP covering daily operations and reporting, on a well-structured SQL Server database.",
    githubUrl: GITHUB,
    sourceNote: "Commercial product built at AIN Technologies — source code is not public.",
  },
  {
    slug: "acoms",
    title: "ACOMS",
    fullTitle: "ACOMS — Automatic Company Management System",
    tagline: "Company administration, automated.",
    description:
      "An automatic company management system built at AIN Technologies, delivered as ASP.NET web and Windows applications on SQL Server.",
    image: { src: "/images/projects/acoms-mockup.webp", alt: "Illustration of a company management dashboard with an organisation chart and team members list", style: "cover" },
    featured: false,
    client: "AIN Technologies",
    year: "2013 – 2015",
    role: "Software engineer",
    // TODO: confirm the stack and modules.
    tech: ["ASP.NET", "C#", "Windows Forms", "SQL Server 2008", "Stored procedures"],
    problem:
      "Companies needed to manage their administration, staff and records consistently, with less manual paperwork.",
    approach: [
      "Designed and tested the ASP.NET web and Windows application modules.",
      "Handled the database design: tables, stored procedures and views in SQL Server 2008.",
    ],
    // TODO: replace with the real ACOMS modules.
    modules: ["Company profile & settings", "Employee records", "Administration workflows", "Reports"],
    result: "Automated company administration backed by a structured SQL Server database.",
    githubUrl: GITHUB,
    sourceNote: "Commercial product built at AIN Technologies — source code is not public.",
  },
  {
    slug: "hospital-patient-management",
    title: "HPMS",
    fullTitle: "Hospital Patient Management System",
    tagline: "Patients, appointments and records — organised.",
    description:
      "A hospital patient management system for handling patient registration, visits and records.",
    image: { src: "/images/projects/hospital-mockup.webp", alt: "Illustration of a hospital patient record with vitals, visit history and an appointments calendar", style: "cover" },
    featured: false,
    // TODO: confirm which company/client and the years.
    client: "Earlier project · India",
    year: "2013 – 2018",
    role: ".NET developer",
    // TODO: confirm the stack and modules.
    tech: ["ASP.NET", "C#", "SQL Server"],
    problem:
      "Hospital staff needed a reliable way to register patients and keep visits and records organised and accessible.",
    approach: [
      "Developed the patient-management modules on ASP.NET and SQL Server.",
      "Designed the database structures for patient records and visits.",
    ],
    // TODO: replace with the real modules.
    modules: ["Patient registration", "Appointments", "Visit records", "Billing", "Reports"],
    result: "Organised patient records and visits in a single system.",
    githubUrl: GITHUB,
    sourceNote: "Client project — source code is not public.",
  },
];

// Home-page order for featured projects; any other featured ones follow.
const FEATURED_ORDER = ["university-management-system", "tipam", "lead-management-system", "university-mobile-app", "advertisement-permit-system"];
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => (FEATURED_ORDER.indexOf(a.slug) + 1 || 99) - (FEATURED_ORDER.indexOf(b.slug) + 1 || 99));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
