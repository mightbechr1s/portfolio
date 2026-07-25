export const site = {
  title: "Chris",
  tagline: "2nd Year IT Student & Developer",
  description:
    "Building web and desktop applications that solve real problems.",
  url: "https://mightbechr1s.github.io/portfolio",
  domain: "portfolio",
};

export const hero = {
  greeting: "Hi, I'm",
  name: "Chris",
  subtitle: "2nd year IT student building practical apps across web and desktop.",
  roles: ["IT Student", "Web Developer", "Java Developer"],
  cta: { label: "See My Work", href: "#projects" },
  secondaryCta: { label: "Get In Touch", href: "#contact" },
};

export const about = {
  badge: "About",
  title: "Who I Am",
  paragraphs: [
    "I'm Chris, a 2nd year IT student who likes building things that actually work. I've shipped web apps with Next.js and desktop tools with JavaFX — always focused on clean code and making things easy to use.",
    "I'm also one of the developers of Yield — a cooking app that turns ingredients into recipes with AI, barcode scanning, and offline access. From mobile APKs to web dashboards, I enjoy turning ideas into working software that people actually use.",
  ],
  avatar: "/avatar-placeholder.svg",
};

export const skills = {
  badge: "Skills",
  title: "Tech Stack",
  categories: [
    {
      name: "Web",
      items: [
        { name: "Next.js", level: 75 },
        { name: "TypeScript", level: 70 },
        { name: "Tailwind CSS", level: 80 },
        { name: "HTML/CSS", level: 85 },
        { name: "React", level: 70 },
      ],
    },
    {
      name: "Desktop",
      items: [
        { name: "Java", level: 80 },
        { name: "JavaFX", level: 75 },
        { name: "Maven", level: 70 },
        { name: "SQLite", level: 65 },
      ],
    },
    {
      name: "Tools",
      items: [
        { name: "Git", level: 70 },
        { name: "VS Code", level: 85 },
        { name: "IntelliJ", level: 80 },
        { name: "Figma", level: 55 },
      ],
    },
  ],
};

export const projects = {
  badge: "Projects",
  title: "Selected Work",
  description: "Things I've built during my studies and personal time.",
  list: [
    {
      title: "Yield",
      description:
        "AI-powered cooking app that scans barcodes, generates recipes from your pantry, and works offline on mobile. Built with Next.js, Capacitor, and a Python backend.",
      tags: ["Next.js", "TypeScript", "Tailwind", "React", "Python"],
      image: "/project-placeholder.svg",
      links: { live: "https://frontend-eta-nine-70.vercel.app", github: "https://github.com/mightbechr1s/yield" },
    },
    {
      title: "SkillSync",
      description:
        "JavaFX desktop app for student project collaboration. Real-time chat, task boards, invitations, and skill-based team matching.",
      tags: ["Java", "JavaFX", "Maven", "SQLite"],
      image: "/project-placeholder.svg",
      links: { live: "#", github: "https://github.com/mightbechr1s/SKILLSYNC" },
    },
    {
      title: "StockFlow",
      description:
        "Inventory and sales management with daily reporting, transaction tracking, and CSV export for business insights.",
      tags: ["JavaScript", "HTML", "CSS"],
      image: "/project-placeholder.svg",
      links: { live: "#", github: "https://github.com/mightbechr1s/STOCKFLOW" },
    },
  ],
};

export const experience = {
  badge: "Experience",
  title: "My Journey",
  jobs: [
    {
      role: "2nd Year IT Student",
      company: "University",
      period: "2025 — Present",
      description:
        "Studying Information Technology with a focus on software development. Building projects across web and desktop platforms.",
      tags: ["Java", "Web Dev", "Databases", "OOP"],
    },
    {
      role: "Yield",
      company: "Team Project",
      period: "2026",
      description:
        "Co-developed a full-stack cooking app with AI recipe generation, barcode scanning, offline support, and a cross-platform mobile APK via Capacitor.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Python", "Capacitor"],
    },
    {
      role: "SkillSync",
      company: "Academic Project",
      period: "2026",
      description:
        "Developed a JavaFX desktop app for project collaboration with chat, task management, and SQLite persistence.",
      tags: ["Java", "JavaFX", "SQLite", "OOP"],
    },
  ],
};

export const contact = {
  badge: "Contact",
  title: "Let's Connect",
  description: "Have a project idea or just want to say hi? Reach out.",
  email: "your4tune02@gmail.com",
  social: [
    { name: "GitHub", url: "https://github.com/mightbechr1s", icon: "github" },
    { name: "Email", url: "mailto:your4tune02@gmail.com", icon: "email" },
  ],
};

export const footer = {
  text: `© ${new Date().getFullYear()} Chris. Built with Next.js & Tailwind CSS.`,
};
