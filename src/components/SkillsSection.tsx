import { skills } from "@/data/portfolio";
import { TechBadge } from "./TechBadge";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 sm:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title font-bold text-[var(--color-ink)] mb-14 sm:mb-20 max-w-4xl" style={{ fontFamily: "var(--font-heading)" }}>
          {skills.title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--color-border-dark)]">
          {skills.categories.map((cat) => (
            <div
              key={cat.name}
              className="py-6 sm:px-5 first:pl-0 border-b sm:border-r border-[var(--color-border)] last:border-r-0"
            >
              <h3 className="text-sm font-bold text-[var(--color-ink)] mb-5" style={{ fontFamily: "var(--font-heading)" }}>
                {cat.name}
              </h3>
              <div className="flex flex-col">
                {cat.items.map((skill) => (
                  <TechBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
