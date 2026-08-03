import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiCss,
  SiReact, SiJavascript, SiFramer, SiFigma, SiGit,
  SiIntellijidea, SiSqlite, SiApachemaven, SiOpenjdk,
  SiPython, SiCapacitor, SiPhp, SiLaravel, SiNodedotjs,
  SiOpenapiinitiative, SiMysql, SiPostgresql, SiSupabase,
  SiGithub, SiVercel,
} from "@icons-pack/react-simple-icons";
import { Code2 } from "lucide-react";

type TechIcon = React.ComponentType<{
  size?: number;
  className?: string;
  color?: string;
  "aria-hidden"?: boolean;
}>;

const iconMap: Record<string, TechIcon> = {
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
  "PHP": SiPhp,
  "Laravel": SiLaravel,
  "Node.js": SiNodedotjs,
  "REST APIs": SiOpenapiinitiative,
  "MySQL": SiMysql,
  "PostgreSQL": SiPostgresql,
  "Supabase": SiSupabase,
  "GitHub": SiGithub,
  "Vercel": SiVercel,
  "VS Code": Code2,
};

export function TechBadge({ name }: { name: string }) {
  const Icon = iconMap[name];
  if (!Icon) {
    return (
      <span className="inline-flex items-center gap-2 py-2 text-sm text-[var(--color-ink-light)] border-b border-[var(--color-border)] last:border-0">
        {name}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 py-2 text-sm text-[var(--color-ink-light)] border-b border-[var(--color-border)] last:border-0">
      <Icon size={14} className="shrink-0" aria-hidden={true} />
      {name}
    </span>
  );
}
