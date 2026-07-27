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
  proof: "Built Yield (500+ users) | 3 Deployed Projects | Open to Freelance",
};

export const services = {
  badge: "Services",
  title: "What I Build",
  description: "Practical digital solutions for businesses that need to grow.",
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
  title: "Who I Am",
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
  title: "Selected Work",
  description: "Real projects that solve real problems.",
  list: [
    {
      title: "Yield",
      tagline: "AI-Powered Cooking Application",
      problem:
        "Home cooks waste food because they don't know what recipes they can make with available ingredients. Existing recipe apps require specific ingredients and don't work offline.",
      solution:
        "A cooking app that scans your fridge via camera, identifies ingredients using AI image analysis, and generates recipes from what you already have. Works offline on mobile.",
      features: [
        "Client-side food detection via Canvas API (no ML API needed)",
        "200+ food alias database with fuzzy matching",
        "Voice input for hands-free cooking",
        "Barcode scanning for pantry tracking",
        "3-recipe free trial with progressive upgrade",
      ],
      tags: ["Next.js", "TypeScript", "Tailwind", "Python", "Capacitor"],
      result:
        "Production-grade app deployed to web and mobile. 500+ lines of production code. Cross-platform with offline support.",
      links: {
        live: "https://frontend-eta-nine-70.vercel.app",
        github: "https://github.com/mightbechr1s/yield",
      },
    },
    {
      title: "SkillSync",
      tagline: "Student Collaboration Platform",
      problem:
        "Student teams struggle with project coordination. Communication happens across scattered tools. There is no single place to manage tasks, chat, and track progress.",
      solution:
        "A desktop application that brings chat, task management, and team matching into one interface. Students form teams based on complementary skills.",
      features: [
        "Real-time chat and messaging",
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
        "Working inventory system with sales reports and data export. Demonstrates full CRUD operations.",
      links: {
        live: "https://mightbechr1s.github.io/STOCKFLOW/",
        github: "https://github.com/mightbechr1s/STOCKFLOW",
      },
    },
  ],
};

export const process = {
  badge: "Process",
  title: "How I Work",
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
  title: "Tech Stack",
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
  title: "Let's Build Something",
  description:
    "Have a project in mind? Tell me about it and I'll get back to you within 24 hours.",
  email: "chrismakesweb@gmail.com",
  responseTime: "I usually reply within 24 hours",
  social: [
    {
      name: "GitHub",
      url: "https://github.com/mightbechr1s",
      icon: "github",
    },
    {
      name: "Email",
      url: "mailto:your4tune02@gmail.com",
      icon: "email",
    },
  ],
};

export const footer = {
  text: `© ${new Date().getFullYear()} Chris. Built with Next.js & Tailwind CSS.`,
  cta: "Have a project in mind? I'm available for freelance work.",
};
