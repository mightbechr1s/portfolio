export const site = {
  title: "Chris",
  tagline: "Solutions Developer for Small Businesses",
  description:
    "I build websites, business systems, and automation tools that save time and grow revenue.",
  url: "https://mightbechr1s.github.io/portfolio",
  domain: "portfolio",
};

export const hero = {
  greeting: "Hello, I'm",
  name: "Chris",
  headline:
    "I build software that solves real business problems.",
  subtitle:
    "A developer creating websites, business systems, and automation tools for small businesses in the Philippines. From restaurant ordering systems to inventory trackers, I turn ideas into working software.",
  roles: ["Web Developer", "Business Systems", "IT Solutions"],
  cta: { label: "See My Work", href: "#projects" },
  secondaryCta: { label: "Let's Talk", href: "#contact" },
  proof: "3 shipped projects | Web + desktop builds | Open to freelance",
};

export const services = {
  badge: "Services",
  title: "Three ways I help a business move faster.",
  description: "Focused digital tools for businesses ready to replace slow, manual work with something dependable.",
  list: [
    {
      title: "Website Development",
      description:
        "Professional, mobile-responsive websites for small businesses. Online menus, booking pages, landing pages, and business information sites that attract customers.",
      target: "Restaurants, clinics, barbershops, retail stores, service providers",
      value: "A professional online presence that builds credibility and attracts customers. Replaces the 'we don't have a website' problem.",
      icon: "globe",
    },
    {
      title: "Business Systems",
      description:
        "Custom web applications for inventory management, order tracking, appointment scheduling, and daily operations. Designed for simplicity.",
      target: "Sari-sari stores, small offices, tutorial centers, vet clinics",
      value: "Reduces manual work, eliminates lost data, and gives owners visibility into their business. Saves hours of paperwork weekly.",
      icon: "layout",
    },
    {
      title: "Automation Solutions",
      description:
        "Chatbots, auto-reply systems, and workflow automation that handle repetitive tasks without human intervention.",
      target: "Any business with a Facebook page, restaurants, shops, clinics",
      value: "Captures leads 24/7, responds to customers instantly, and frees up the owner to focus on operations.",
      icon: "zap",
    },
  ],
};

export const about = {
  badge: "About",
  title: "Built around the problem, not the framework.",
  paragraphs: [
    "I build practical software that solves real problems for small businesses. While most developers focus on learning every new framework, I focus on one thing: building tools that people actually use.",
    "My work spans web applications, business systems, and automation solutions. I have shipped a production cooking app (Yield) with AI-powered recipe generation, deployed to web and mobile. I have built inventory systems, student collaboration tools, and business management applications.",
    "I am particularly interested in small business digital transformation, practical AI integration, automation that saves time and reduces errors, and mobile-first design for Philippine users.",
    "Every project I build starts with understanding the problem. The technology is just the tool. The outcome is what matters.",
  ],
  interests: [
    "Small business digital transformation",
    "Practical AI integration",
    "Automation that saves time",
    "Mobile-first Philippine design",
  ],
  avatar: "/avatar-placeholder.svg",
};

export const projects = {
  badge: "Projects",
  title: "Work that made it past the prototype.",
  description: "Deployed products with real constraints, working features, and a clear reason to exist.",
  list: [
    {
      title: "Yield",
      tagline: "AI-Powered Cooking Application",
      context: "Personal full-stack project",
      status: "Live web demo",
      problem:
        "Home cooks waste food because they don't know what recipes they can make with available ingredients. Existing recipe apps require specific ingredients and don't work offline.",
      solution:
        "A cooking app that turns ingredients entered by text, voice, or camera into step-by-step recipes, with pantry tools and a backend-free demo for trying the core flow.",
      features: [
        "Ingredient entry by text, voice, or camera",
        "Recipe steps with timers and food-safety guidance",
        "Smart substitutions and pantry tracking",
        "Backend-free demo generation",
        "Local recipe and pantry cache",
      ],
      tags: ["Next.js", "TypeScript", "Tailwind", "Python", "Capacitor"],
      result:
        "Working full-stack app with a Next.js frontend, FastAPI service, Supabase-backed data, and a public browser demo.",
      links: {
        live: "https://frontend-eta-nine-70.vercel.app",
        github: "https://github.com/mightbechr1s/yield",
      },
    },
    {
      title: "SkillSync",
      tagline: "Student Collaboration Platform",
      context: "Academic project",
      status: "Source available",
      problem:
        "Student teams struggle with project coordination. Communication happens across scattered tools. There is no single place to manage tasks, chat, and track progress.",
      solution:
        "A desktop application that brings chat, task management, and team matching into one interface. Students form teams based on complementary skills.",
      features: [
        "Team chat and messaging",
        "Task board with status tracking",
        "Skill-based team matching",
        "Project invitation system",
      ],
      tags: ["Java", "JavaFX", "Maven", "SQLite"],
      result:
        "Working desktop app demonstrating OOP design patterns (Observer, Factory, MVC). SQLite persistence layer.",
      links: {
        live: "#",
        github: "https://github.com/mightbechr1s/SKILLSYNC",
      },
    },
    {
      title: "StockFlow",
      tagline: "Inventory & Sales Management",
      context: "Academic team project",
      status: "Live browser demo",
      problem:
        "Small businesses track inventory mentally or on paper. They cannot calculate profit, don't know what's running low, and have no sales data to make decisions.",
      solution:
        "A web-based inventory system with daily sales tracking, transaction history, and CSV export for business insights.",
      features: [
        "Product catalog with stock tracking",
        "Daily sales recording",
        "Low-stock alerts",
        "CSV export and reports",
      ],
      tags: ["JavaScript", "HTML", "CSS"],
      result:
        "Working browser-based inventory demo with CRUD operations, sales reports, and CSV data export.",
      links: {
        live: "https://mightbechr1s.github.io/STOCKFLOW/",
        github: "https://github.com/mightbechr1s/STOCKFLOW",
      },
    },
  ],
};

export const process = {
  badge: "Process",
  title: "From first conversation to working software.",
  description: "A simple, transparent process from idea to launch.",
  steps: [
    {
      number: "01",
      title: "Discovery",
      description:
        "I start by understanding your business, your customers, and the problem you need solved. No code until we agree on what matters.",
    },
    {
      number: "02",
      title: "Design",
      description:
        "I plan the solution — wireframes, feature list, and technology choices. You see exactly what you'll get before development begins.",
    },
    {
      number: "03",
      title: "Build",
      description:
        "I develop the solution in short cycles. You see progress every week. Feedback is built into the process, not saved for the end.",
    },
    {
      number: "04",
      title: "Launch",
      description:
        "I deploy to production, set up hosting, and make sure everything works. You get a working product and documentation for handoff.",
    },
  ],
};

export const skills = {
  badge: "Skills",
  title: "Tools chosen for the job, not the trend.",
  categories: [
    {
      name: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    },
    {
      name: "Backend",
      items: ["PHP", "Laravel", "Python", "Node.js", "REST APIs"],
    },
    {
      name: "Database",
      items: ["MySQL", "PostgreSQL", "SQLite", "Supabase"],
    },
    {
      name: "Tools",
      items: ["Git", "GitHub", "Vercel", "Figma", "VS Code"],
    },
  ],
};

export const contact = {
  badge: "Contact",
  title: "Bring me the bottleneck.",
  description:
    "Have a project in mind? Share the problem, scope, and timeline, then continue in your email app.",
  email: "chrismakesweb@gmail.com",
  responseTime: "Email is the fastest way to reach me",
  social: [
    {
      name: "GitHub",
      url: "https://github.com/mightbechr1s",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/cw-webster-ba7266425",
      icon: "linkedin",
    },
    {
      name: "Email",
      url: "mailto:chrismakesweb@gmail.com",
      icon: "email",
    },
  ],
};

export const footer = {
  text: `© ${new Date().getFullYear()} Chris. Built with Next.js & Tailwind CSS.`,
  cta: "Have a project in mind? I'm available for freelance work.",
};
