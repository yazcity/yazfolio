/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
//import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation
import splashAnimation from "./assets/lottie/splashAnimation.json";
// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Ahammed Yaseen",
  title: "Hi all, I'm Yaseen",
  subTitle: emoji(
    "I’m a Full Stack .NET Developer 🚀 with over 10 years of experience in building powerful, scalable, and user-friendly web, desktop, and mobile applications. I specialize in ASP.NET MVC, .NET Core, Web API, Xamarin, React, and React Native, with strong expertise in MS SQL Server and Oracle databases."
  ),
  resumeLink:
    "https://docs.google.com/document/d/13EZrTa8ZKXCRNwIIELisPSBBW_0oj6PI/edit?usp=drive_link&ouid=108391050748747786709&rtpof=true&sd=true", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/yazcity",
  linkedin: "https://www.linkedin.com/in/ahammed-yaseen-968788111/",
  gmail: "yazcity@gmail.com",
  gitlab: "https://gitlab.com/yazcity",
  facebook: "https://www.facebook.com/yasin.vk",
  medium: "https://medium.com/@yazcity",
  stackoverflow: "https://stackoverflow.com/users/31650770",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "TECH EXPLORER & FEARLESS FULL-STACK DEVELOPER MASTERING EVERY STACK",
  skills: [
    emoji(
      "⚡ Develop highly interactive Front end / User Interfaces for your web and mobile applications"
    ),
    emoji("⚡ Design and develop robust, scalable back-end architectures using .NET Framework, .NET Core, and .NET 8, with secure and optimized RESTful APIs"),
    emoji(
      "⚡ Build and integrate enterprise-grade databases using MS SQL Server and Oracle, ensuring performance, reliability, and data integrity"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  // softwareSkills: [
  //   {
  //     skillName: "html-5",
  //     fontAwesomeClassname: "fab fa-html5"
  //   },
  //   {
  //     skillName: "css3",
  //     fontAwesomeClassname: "fab fa-css3-alt"
  //   },
  //   {
  //     skillName: "sass",
  //     fontAwesomeClassname: "fab fa-sass"
  //   },
  //   {
  //     skillName: "JavaScript",
  //     fontAwesomeClassname: "fab fa-js"
  //   },
  //   {
  //     skillName: "reactjs",
  //     fontAwesomeClassname: "fab fa-react"
  //   },
  //   {
  //     skillName: "nodejs",
  //     fontAwesomeClassname: "fab fa-node"
  //   },
  //   {
  //     skillName: "swift",
  //     fontAwesomeClassname: "fab fa-swift"
  //   },
  //   {
  //     skillName: "npm",
  //     fontAwesomeClassname: "fab fa-npm"
  //   },
  //   {
  //     skillName: "sql-database",
  //     fontAwesomeClassname: "fas fa-database"
  //   },
  //   {
  //     skillName: "aws",
  //     fontAwesomeClassname: "fab fa-aws"
  //   },
  //   {
  //     skillName: "firebase",
  //     fontAwesomeClassname: "fas fa-fire"
  //   },
  //   {
  //     skillName: "python",
  //     fontAwesomeClassname: "fab fa-python"
  //   },
  //   {
  //     skillName: "docker",
  //     fontAwesomeClassname: "fab fa-docker"
  //   }
  // ],
  // display: true 

  softwareSkills: [
  {
    skillName: ".NET",
    fontAwesomeClassname: "fas fa-code" // No official .NET icon
  },
  {
  skillName: "API",
  fontAwesomeClassname: "fas fa-plug"
  },
  {
    skillName: "HTML5",
    fontAwesomeClassname: "fab fa-html5"
  },
  {
    skillName: "CSS3",
    fontAwesomeClassname: "fab fa-css3-alt"
  },
  {
    skillName: "Bootstrap",
    fontAwesomeClassname: "fab fa-bootstrap"
  },
  {
    skillName: "Material UI",
    fontAwesomeClassname: "fas fa-layer-group" // Close alternative
  },
  {
    skillName: "Sass",
    fontAwesomeClassname: "fab fa-sass"
  },
  {
    skillName: "JavaScript",
    fontAwesomeClassname: "fab fa-js"
  },
  {
    skillName: "React",
    fontAwesomeClassname: "fab fa-react"
  },
  {
    skillName: "Node.js",
    fontAwesomeClassname: "fab fa-node-js"
  },
  {
  skillName: "Xamarin",
  fontAwesomeClassname: "fas fa-mobile-alt" 
  },
  {
    skillName: "React Native",
    fontAwesomeClassname: "fab fa-react"
  },
  {
    skillName: "Three.js",
    // Option 1: using placeholder icon
    fontAwesomeClassname: "fas fa-cube"
  },

  {
    skillName: "npm",
    fontAwesomeClassname: "fab fa-npm"
  },
  {
    skillName: "SQL Database",
    fontAwesomeClassname: "fas fa-database"
  },
  {
    skillName: "Oracle Database",
    fontAwesomeClassname: "fas fa-database"
  },
  {
    skillName: "AWS",
    fontAwesomeClassname: "fab fa-aws"
  },
  {
    skillName: "Azure",
    fontAwesomeClassname: "fas fa-cloud" // No official Azure icon in FA
  },
  {
    skillName: "Docker",
    fontAwesomeClassname: "fab fa-docker"
  }
],
display: true


};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Anna University",
      logo: require("./assets/images/anna.png"),
      subHeader: "Bachelor of Engineering in Computer Science",
      duration: "Jun 2018 - March 2012",
      // desc: "Participated in the research of XXX and published 3 papers.",
      descBullets: [
        "Gained a strong foundation in computer science concepts including algorithms, data structures, and software engineering principlesGained a strong foundation in computer science concepts including algorithms, data structures, and software engineering principles.",
        "Completed a mini project on an Automatic Crowd-Based Light and Fan Control System using the 8051 Microcontroller.",
        "Completed a major project on Cloud Computing Simulation and developed an E-Commerce Web Application using ASP.NET Web Forms and SQL Server."
      ]
    },
    {
      schoolName: "Government Higher Secondary School.",
      logo: require("./assets/images/KHSEB.webp"),
      subHeader: "Biology Science",
      duration: "June 2005 - March 2007",
      desc: "Completed Higher Secondary education in Biology Science with 80% marks. Developed strong analytical and problem-solving skills that later fueled my passion for technology and software development.",
      descBullets: ["Built a solid foundation in scientific reasoning and logical thinking",
        "Learned the importance of precision, observation, and analytical approach—skills I now apply in software development"
      ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
  {
    Stack: "Frontend / UI Development",
    progressPercentage: "70%"
  },
  {
    Stack: "Backend / API Development",
    progressPercentage: "90%"
  },
  {
    Stack: "Database & Server Management",
    progressPercentage: "85%"
  },
  {
    Stack: "Programming & Problem Solving",
    progressPercentage: "88%"
  }
],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  // experience: [
  //   {
  //     role: "Software Engineer",
  //     company: "City University Ajman",
  //     companylogo: require("./assets/images/facebookLogo.png"),
  //     date: "June 2020 – Present",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     descBullets: [
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  //     ]
  //   },
  //   {
  //     role: "Senior Application Web Developer",
  //     company: "Ali Mousa Holding",
  //     companylogo: require("./assets/images/quoraLogo.png"),
  //     date: "Sep 2019 – Sep 2020",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //   },
  //   {
  //     role: ".Net Developer",
  //     company: "Canada Hitech",
  //     companylogo: require("./assets/images/airbnbLogo.png"),
  //     date: "Jan 2018 – Jun 2019",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  //   }
  // ]
  experience: [
  {
    role: "Senior Software Engineer",
    company: "City University Ajman",
    companylogo: require("./assets/images/cuca.png"),
    date: "Sep 2020 – Present",
    desc: "Leading the design and development of enterprise-level web and mobile solutions using .NET 8 MVC, Web API, and Xamarin. Involved in the full software development lifecycle, from requirement gathering to deployment.",
    descBullets: [
      "Architected and developed university management modules including Lead Management, Task Management, Employee Appraisal, Tactical Operational Plan (TOPS), and Risk Register.",
      "Developed RESTful APIs and optimized SQL Server queries and stored procedures for high performance.",
      "Created responsive front-end interfaces using React and Bootstrap, and mobile apps using Xamarin.",
      "Implemented Windows Services for automated tasks and scheduled operations."
    ]
  },
  {
    role: "Senior Application Web Developer",
    company: "Ali Mousa Holding",
    companylogo: require("./assets/images/ali.png"),
    date: "Sep 2019 – Sep 2020",
    desc: "Designed and developed enterprise applications for multiple subsidiaries across UAE in real estate, construction, and manufacturing sectors. Provided technical support for over 400 corporate users.",
    descBullets: [
      "Built and maintained ASP.NET MVC and Web API applications for Attendance, BOQ Costing, Asset Management, HR, Payroll, and Finance modules.",
      "Managed Oracle and SQL Server databases and created reports using Oracle APEX and SSRS.",
      "Provided technical support and resolved issues via ManageEngine Service Desk.",
      "Led a team of developers and contributed to migrating legacy applications to .NET Core."
    ]
  },
  {
    role: ".NET Developer",
    company: "Canada Hitech",
    companylogo: require("./assets/images/canada.png"),
    date: "Jan 2018 – Jun 2019",
    desc: "Developed web-based and desktop applications using ASP.NET MVC, C#, and SQL Server. Focused on backend logic, database design, and system integration for government and enterprise clients.",
    descBullets: [
      "Designed and maintained SOAP and RESTful APIs for Advertising, Inspection, Customer Happiness, and Insurance applications.",
      "Created SQL Server stored procedures, views, and optimized database performance.",
      "Integrated third-party libraries and payment gateways for enhanced functionality.",
      "Collaborated with UI teams to deliver responsive and user-friendly interfaces."
    ]
  }
]

};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Ongoing Enterprise Projects",
  subtitle: "Enterprise-level projects developed for my current organization, focused on automation, efficiency, and scalability.",
  projects: [
    {
      image: require("./assets/images/cuums.png"),
      projectName: "University Management System",
      projectDesc: "A comprehensive University Management System designed to streamline campus operations with modules for task management, meeting minutes, HR appraisals, tactical and operational planning, internships, events, surveys, benchmarking, and crowd control — enabling smarter coordination, transparency, and efficiency across departments.",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://city-university.fortiddns.com:7414/UMS/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/cutipam.png"),
      projectName: "TIPAM",
      projectDesc: "An advanced Academic Management Platform (TIPAM) designed to automate and enhance university academic processes. It covers modules such as course syllabus management, moderation, exams, course delivery planning, CLO–PLO mapping, course and program revision, critical self-evaluation, research and development tracking, faculty CV management, grading, PDP, and CSR activities — providing a unified solution for academic quality assurance and continuous improvement.",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://city-university.fortiddns.com:7414/TIPAM/"
        }
      ]
    },
     {
      image: require("./assets/images/culms.png"),
      projectName: "LMS",
      projectDesc: "A smart Lead Management System built for universities to efficiently handle student inquiries and admissions. It enables lead entry, follow-ups, multi-user access for agents and team leads, categorized folders, detailed follow-up tracking, and automated notifications. Designed to improve communication, conversion tracking, and overall lead management efficiency through a structured and collaborative workflow.",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://city-university.fortiddns.com:7414/LMS/"
        }
      ]
    },
    
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

// const achievementSection = {
//   title: emoji("Achievements And Certifications 🏆 "),
//   subtitle:
//     "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

//   achievementsCards: [
//     {
//       title: "Microsoft Azure Fundamentals (AZ-900)",
//       subtitle:
//         "Validated foundational knowledge of Microsoft Azure cloud concepts, services, and best practices—aligning with modern enterprise cloud adoption and DevOps integration..",
//       image: require("./assets/images/Microsoft-Azure.jpg"),
//       imageAlt: "Microsoft Azure Fundamentals Logo",
//       footerLink: [
//         {
//           name: "Certification",
//           url: "https://drive.google.com/file/d/0B7kazrtMwm5dYkVvNjdNWjNybWJrbndFSHpNY2NFV1p4YmU0/view?usp=sharing"
//         },
//         {
//           name: "Award Letter",
//           url: "https://drive.google.com/file/d/0B7kazrtMwm5dekxBTW5hQkg2WXUyR3QzQmR0VERiLXlGRVdF/view?usp=sharing"
//         },
//         {
//           name: "Google Code-in Blog",
//           url: "https://opensource.googleblog.com/2019/01/google-code-in-2018-winners.html"
//         }
//       ]
//     },
//     {
//       title: "ASP.NET Core Identity & Authentication Management",
//       subtitle:
//         "Mastered secure user authentication, authorization, and role-based access control in ASP.NET Core, focusing on scalable and secure application development.",
//       image: require("./assets/images/AuthenticationManagement.jpg"),
//       imageAlt: "AuthenticationManagement Logo",
//       footerLink: [
//         {
//           name: "View Google Assistant Action",
//           url: "https://assistant.google.com/services/a/uid/000000100ee688ee?hl=en"
//         }
//       ]
//     },

//     {
//       title: "Project Management",
//       subtitle: "Learned practical methodologies for initiating, planning, and executing projects efficiently with clear goals, milestones, and resource optimization.",
//       image: require("./assets/images/Project-Management.jpg"),
//       imageAlt: "Project Management Logo",
//       footerLink: [
//         {name: "Certification", url: ""},
//         {
//           name: "Final Project",
//           url: "https://pakistan-olx-1.firebaseapp.com/"
//         }
//       ]
//     },
//      {
//       title: "Problem Solving Tools and Techniques",
//       subtitle: "Enhanced analytical and critical thinking capabilities through proven tools and methods to identify root causes and drive data-informed decisions.",
//       image: require("./assets/images/Problem-Solving.jpg"),
//       imageAlt: "Problem Solving Tools and Techniques Logo",
//       footerLink: [
//         {name: "Certification", url: ""},
//         {
//           name: "Final Project",
//           url: "https://pakistan-olx-1.firebaseapp.com/"
//         }
//       ]
//     },
//     {
//       title: "Leadership: Theory and Practice",
//       subtitle: "Gained insights into leadership principles, team motivation, and strategic decision-making to manage cross-functional teams effectively.",
//       image: require("./assets/images/Leadership.jpg"),
//       imageAlt: "Leadership: Theory and Practice Logo",
//       footerLink: [
//         {name: "Certification", url: ""},
//         {
//           name: "Final Project",
//           url: "https://pakistan-olx-1.firebaseapp.com/"
//         }
//       ]
//     },
//     {
//       title: "Managing Online Meetings",
//       subtitle: "Developed skills to plan, facilitate, and lead engaging and result-driven virtual meetings in hybrid and remote work environments.",
//       image: require("./assets/images/Managing-Online.jpg"),
//       imageAlt: "Managing Online Meetings Logo",
//       footerLink: [
//         {name: "Certification", url: ""},
//         {
//           name: "Final Project",
//           url: "https://pakistan-olx-1.firebaseapp.com/"
//         }
//       ]
//     },
//      {
//       title: "Course Planning",
//       subtitle: "Applied structured approaches to design and manage course content and educational programs for effective learning outcomes.",
//       image: require("./assets/images/Course-planning.jpg"),
//       imageAlt: "MCourse Planning Logo",
//       footerLink: [
//         {name: "Certification", url: ""},
//         {
//           name: "Final Project",
//           url: "https://pakistan-olx-1.firebaseapp.com/"
//         }
//       ]
//     },
//     {
//       title: "Best Employee of the Month",
//       subtitle: "Recognized as the only recipient from the IT Department for exceptional technical excellence, innovation, and dedication to organizational success.",
//       image: require("./assets/images/appreciation-1.jpg"),
//       imageAlt: "Best Employee of the Month Logo",
//       footerLink: [
//         {name: "Certification", url: ""},
//         {
//           name: "Final Project",
//           url: "https://pakistan-olx-1.firebaseapp.com/"
//         }
//       ]
//     }
//   ],
//   display: true // Set false to hide this section, defaults to true
// };

const achievementSection = {
  title: emoji("Achievements & Certifications 🏆"),
  subtitle:
    "Recognitions, certifications, and milestones that reflect my professional growth and commitment to excellence.",

  achievementsCards: [
    {
      title: "Microsoft Azure Fundamentals (AZ-900)",
      subtitle:
        "Certified in core Azure cloud concepts, services, and DevOps fundamentals, aligning with modern enterprise solutions.",
      image: require("./assets/images/Microsoft-Azure.jpg"),
      imageAlt: "Microsoft Azure Fundamentals Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/0B7kazrtMwm5dYkVvNjdNWjNybWJrbndFSHpNY2NFV1p4YmU0/view?usp=sharing"
        }
      ]
    },
    {
      title: "ASP.NET Core Identity & Authentication",
      subtitle:
        "Mastered secure authentication, authorization, and role-based access using ASP.NET Core for scalable web apps.",
      image: require("./assets/images/AuthenticationManagement.jpg"),
      imageAlt: "ASP.NET Core Identity Logo",
      footerLink: [
        { name: "Certification", url: "" }
      ]
    },
    {
      title: "Project Management",
      subtitle:
        "Learned effective planning, execution, and delivery techniques for achieving project goals on time.",
      image: require("./assets/images/Project-Management.jpg"),
      imageAlt: "Project Management Logo",
      footerLink: [
        { name: "Certification", url: "" }
      ]
    },
    {
      title: "Problem Solving Tools & Techniques",
      subtitle:
        "Developed analytical thinking to identify root causes and craft efficient, data-driven solutions.",
      image: require("./assets/images/Problem-Solving.jpg"),
      imageAlt: "Problem Solving Tools and Techniques Logo",
      footerLink: [
        { name: "Certification", url: "" }
      ]
    },
    {
      title: "Leadership: Theory & Practice",
      subtitle:
        "Explored leadership principles to guide, motivate, and manage high-performing cross-functional teams.",
      image: require("./assets/images/Leadership.jpg"),
      imageAlt: "Leadership Logo",
      footerLink: [
        { name: "Certification", url: "" }
      ]
    },
    {
      title: "Managing Online Meetings",
      subtitle:
        "Learned to plan and conduct engaging virtual meetings for hybrid and remote work environments.",
      image: require("./assets/images/Managing-Online.jpg"),
      imageAlt: "Managing Online Meetings Logo",
      footerLink: [
        { name: "Certification", url: "" }
      ]
    },
    {
      title: "Course Planning",
      subtitle:
        "Gained expertise in designing structured learning programs with clear objectives and measurable outcomes.",
      image: require("./assets/images/Course-planning.jpg"),
      imageAlt: "Course Planning Logo",
      footerLink: [
        { name: "Certification", url: "" }
      ]
    },
    {
      title: "Best Employee of the Month",
      subtitle:
        "Awarded for outstanding performance, innovation, and dedication in IT operations and project success.",
      image: require("./assets/images/appreciation-1.jpg"),
      imageAlt: "Best Employee of the Month Logo",
      footerLink: [
        { name: "Certificate", url: "" }
      ]
    }
  ],
  display: true
};


// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "#",
      title: ".NET: Built for Security and Performance",
      description:
        ".NET ensures robust security and high performance, making it ideal for critical applications like banking, e-commerce, and enterprise systems, protecting data while delivering fast, reliable user experiences."
    },
    {
      url: "#",
      title: "Why React Leads in Front-End Development?",
      description:
        "React Leads in Front-End Development by enabling fast, scalable, and interactive user interfaces, supported by a vast ecosystem and reusable components."
    },
     {
      url: "#",
      title: "Why .NET Core and React Are the Perfect Full-Stack Combo",
      description:
        ".NET Core ensures secure, high-performance backends, while React delivers dynamic, interactive frontends, together enabling robust, scalable full-stack applications."
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "#",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: true // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Get in Touch ☎️"),
  subtitle:
    "I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  number: "+971 545198340",
  email_address: "yaseenvk1990@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
