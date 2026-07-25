import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiCss,
  SiReact, SiJavascript, SiFramer, SiFigma, SiGit,
  SiIntellijidea, SiSqlite, SiApachemaven, SiOpenjdk,
  SiPython, SiCapacitor,
} from "@icons-pack/react-simple-icons";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; color?: string }>> = {
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Tailwind": SiTailwindcss,
  "HTML/CSS": SiHtml5,
  "HTML": SiHtml5,
  "CSS": SiCss,
  "React": SiReact,
  "JavaScript": SiJavascript,
  "Motion": SiFramer,
  "Figma": SiFigma,
  "Git": SiGit,
  "IntelliJ": SiIntellijidea,
  "IntelliJ IDEA": SiIntellijidea,
  "SQLite": SiSqlite,
  "Maven": SiApachemaven,
  "Java": SiOpenjdk,
  "Python": SiPython,
  "Capacitor": SiCapacitor,
};

export function TechBadge({ name }: { name: string }) {
  const Icon = iconMap[name];
  if (!Icon) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[var(--color-paper-alt)] text-[var(--color-ink-light)] rounded-md">
        {name}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[var(--color-paper-alt)] text-[var(--color-ink-light)] rounded-md">
      <Icon size={14} />
      {name}
    </span>
  );
}
