export const site = {
  title: "Chris",
  name: "Christian Reynald Canto",
  tagline: "IT Student & Developer",
  description:
    "IT student building practical websites, business systems, and automation tools. Open to freelance work.",
  url: "https://mightbechr1s.github.io/portfolio",
  domain: "portfolio",
};

export const resume = {
  label: "Resume",
  href: "/portfolio/Chris_ATS_Resume.pdf",
  fileName: "Chris_ATS_Resume.pdf",
};

export const hero = {
  greeting: "Hi, I'm",
  name: "Chris.",
  role: "IT Student & Developer",
  headline: "Building practical websites, business systems, and useful digital tools.",
  subtitle:
    "I'm a 2nd-year Information Technology student. I learn by building real projects — web apps, business systems, and small automation tools — and I'm open to freelance work that solves a real problem.",
  roles: ["Web Development", "Business Systems", "Automation & AI"],
  cta: { label: "View My Projects", href: "#projects" },
  secondaryCta: { label: "Let's Work Together", href: "#contact" },
  proof: ["4 shipped projects", "Web + desktop builds", "Open to freelance"],
  status: "Available for freelance work",
};

export const about = {
  badge: "About",
  title: "I build useful software while I'm still learning.",
  paragraphs: [
    "I'm a 2nd-year Information Technology student at PHINMA–University of Pangasinan. I like building software that solves an actual problem rather than chasing whatever framework is trending.",
    "Most of what I know, I learned by building. Yield is a cooking app that turns ingredients into recipes. StockFlow tracks inventory and sales. Chronicle arranges a museum visit into a virtual exhibit. SkillSync is a desktop app for student project teams. Each one taught me something I couldn't get from documentation alone.",
    "I'm drawn to web development, practical business systems, and automation — the kind of work where a small tool removes real friction for a shop, a clinic, or a team.",
    "I'm still early in my career and I'm honest about that. What I can offer is steady effort, practical thinking, and software I test before handing over.",
  ],
  interests: [
    "Web development",
    "Practical business systems",
    "Automation that saves time",
    "AI features worth using",
  ],
};

export const terminal = {
  lines: [
    { prompt: "whoami", output: "Christian Reynald Canto — IT student, developer" },
    { prompt: "focus", output: "Web dev · Business systems · Automation & AI" },
    { prompt: "shipped", output: "Yield · StockFlow · Chronicle · SkillSync" },
    { prompt: "status", output: "Open to freelance work" },
  ],
};

export const services = {
  badge: "What I Build",
  title: "Three practical things I can build for you.",
  description:
    "Focused work for small businesses and teams who need something dependable, not enterprise-scale.",
  list: [
    {
      title: "Business Websites",
      description:
        "Landing pages, business websites, online menus, service pages, and contact forms — built mobile-first and fast.",
      target: "Restaurants, clinics, barbershops, retail, service providers",
      value: "A real online presence that customers can actually use on a phone.",
      icon: "globe",
    },
    {
      title: "Business Systems",
      description:
        "Simple inventory systems, dashboards, order management, and appointment tools built around how your business already works.",
      target: "Sari-sari stores, small offices, tutorial centers, vet clinics",
      value: "Less manual paperwork, fewer lost records, and a clearer picture of the business.",
      icon: "layout",
    },
    {
      title: "Automation & AI",
      description:
        "Small tools that take over repetitive work or add genuinely useful AI features where it earns its place.",
      target: "Businesses with repeat queries, manual data entry, or long response queues",
      value: "Fewer repetitive tasks, faster responses, and time back for the owner.",
      icon: "zap",
    },
  ],
};

export const projects = {
  badge: "Projects",
  title: "Projects I built and shipped.",
  description:
    "The clearest proof of what I can do. Each one started as a problem, not an idea.",
  list: [
    {
      title: "Yield",
      tagline: "AI-Powered Cooking Application",
      context: "Personal full-stack project",
      status: "Live web demo",
      image: "/portfolio/projects/yield.webp",
      imageAlt: "Yield cooking application interface showing the recipe flow",
      problem:
        "Home cooks waste food because they don't know what they can make from the ingredients they already have. Existing recipe apps demand an exact ingredient list and often don't work offline.",
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
        "Deployed to web and packaged for mobile with Capacitor. Reached 500+ registered users and 1.7K+ recipe views.",
      links: {
        live: "https://frontend-eta-nine-70.vercel.app",
        github: "https://github.com/mightbechr1s/yield",
      },
    },
    {
      title: "StockFlow",
      tagline: "Inventory & Sales Management",
      context: "Academic team project",
      status: "Live browser demo",
      image: "/portfolio/projects/stockflow.webp",
      imageAlt: "StockFlow inventory management interface showing products and sales",
      problem:
        "Small businesses track stock on paper or from memory. They can't calculate profit, don't know what's running low, and have no sales history to plan with.",
      solution:
        "A browser-based inventory system with daily sales tracking, transaction history, and CSV export for reporting.",
      features: [
        "Product catalog with stock tracking",
        "Daily sales recording",
        "Low-stock alerts",
        "CSV export and reports",
      ],
      tags: ["JavaScript", "HTML", "CSS"],
      result:
        "Deployed and publicly accessible. Full CRUD operations, sales reports, and CSV data export.",
      links: {
        live: "https://mightbechr1s.github.io/STOCKFLOW/",
        github: "https://github.com/mightbechr1s/STOCKFLOW",
      },
    },
    {
      title: "Chronicle",
      tagline: "Virtual Museum Exhibit",
      context: "Web exhibit project",
      status: "Live web demo",
      image: "/portfolio/projects/chronicle.webp",
      imageAlt:
        "Museum of Moments virtual exhibit homepage with gallery rooms and curated works",
      problem:
        "A single museum visit produces hundreds of photos and a dozen moments worth remembering, but a camera roll gives them no order. Scrolling back through it later loses the sequence, the rooms, and the stories behind the shots.",
      solution:
        "A virtual exhibit that arranges one museum day into seven chapters — natural history, pre-colonial heritage, literary portraits, and a blue immersive installation — with chapter filters, a full photo grid, and interpretive notes for each curated work.",
      features: [
        "Seven-chapter curatorial structure",
        "Chapter filters and full photo grid",
        "Interpretive notes on curated works",
        "Light and texture treatment per room",
        "Dedicated full-catalogue gallery page",
      ],
      tags: ["JavaScript", "HTML", "CSS"],
      result:
        "Published as Museum of Moments on GitHub Pages, with a browsable gallery of all seven chapters from one shared museum day.",
      links: {
        live: "https://mightbechr1s.github.io/Chronicle/",
        github: "https://github.com/mightbechr1s/Chronicle",
      },
    },
    {
      title: "SkillSync",
      tagline: "Student Collaboration Platform",
      context: "Academic project",
      status: "Source available",
      image: null,
      imageAlt: null,
      problem:
        "Student teams coordinate across scattered tools. There's no single place for chat, tasks, and progress, and forming teams by complementary skill is manual guesswork.",
      solution:
        "A desktop application bringing chat, task management, and skill-based team matching into one interface.",
      features: [
        "Team chat and messaging",
        "Task board with status tracking",
        "Skill-based team matching",
        "Project invitation system",
      ],
      tags: ["Java", "JavaFX", "Maven", "SQLite"],
      result:
        "Working desktop app demonstrating OOP design patterns (Observer, Factory, MVC) with a SQLite persistence layer.",
      links: {
        live: "#",
        github: "https://github.com/mightbechr1s/SKILLSYNC",
      },
    },
  ],
};

export const tech = {
  badge: "Technologies",
  title: "What I actually work with.",
  description:
    "Split by what I've shipped with versus what I'm still learning — so you know exactly where I stand.",
  groups: [
    {
      name: "Currently Working With",
      note: "Used in shipped projects",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript",
        "HTML/CSS",
        "Python",
        "Node.js",
        "REST APIs",
        "Supabase",
        "Git",
        "GitHub",
        "Vercel",
      ],
    },
    {
      name: "Exploring",
      note: "Learning and building with",
      items: ["Laravel", "Java", "JavaFX", "MongoDB", "Capacitor", "Figma"],
    },
  ],
};

export const process = {
  badge: "Process",
  title: "A simple, transparent way of working.",
  description: "Four steps. No surprises in the middle.",
  steps: [
    {
      number: "01",
      title: "Understand",
      description:
        "We talk through the actual problem, who it affects, and what a good outcome looks like. No code until that's clear.",
    },
    {
      number: "02",
      title: "Plan",
      description:
        "I map out the structure, the feature list, and the technology choices so you know what you're getting before I build it.",
    },
    {
      number: "03",
      title: "Build",
      description:
        "I develop and test in short cycles so you can see progress early and give feedback while changes are still cheap.",
    },
    {
      number: "04",
      title: "Improve",
      description:
        "I refine based on real testing and your feedback, then hand over something documented and ready to use.",
    },
  ],
};

export const education = {
  badge: "Education",
  title: "Where I'm studying.",
  items: [
    {
      title: "Bachelor of Science in Information Technology",
      school: "PHINMA–University of Pangasinan",
      period: "2025 – Present",
      detail: "Currently 2nd year. Expected graduation 2029.",
    },
  ],
  certifications: [
    { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", year: "2025" },
    { name: "JavaScript Essentials 1", issuer: "Cisco Networking Academy", year: "2025" },
  ],
};

export const contact = {
  badge: "Contact",
  eyebrow: "Have an idea?",
  title: "Let's build something useful.",
  description:
    "Tell me what you're trying to build and I'll see how I can help.",
  cta: "Let's Talk",
  email: "chrismakesweb@gmail.com",
  responseTime: "Email is the fastest way to reach me",
  social: [
    { name: "GitHub", url: "https://github.com/mightbechr1s", icon: "github" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/cw-webster-ba7266425",
      icon: "linkedin",
    },
    { name: "Email", url: "mailto:chrismakesweb@gmail.com", icon: "email" },
  ],
};

export const footer = {
  text: `© ${new Date().getFullYear()} Chris. Built with Next.js & Tailwind CSS.`,
  cta: "Open to freelance work.",
};
