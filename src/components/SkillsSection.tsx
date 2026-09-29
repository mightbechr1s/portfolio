import { tech } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function SkillsSection() {
  return (
    <section
      id="tech"
      className="section-pad border-b border-[var(--color-line)] px-5 sm:px-6"
    >
      <div className="shell">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{tech.badge}</p>
            <h2 className="section-title mt-4 font-bold">{tech.title}</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[var(--color-ink-muted)] lg:col-span-4 lg:self-end">
            {tech.description}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-12">
          {tech.groups.map((group, index) => (
            <Reveal key={group.name} delay={index * 120}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--color-line)] pb-4">
                <h3 className="text-sm font-bold">{group.name}</h3>
                <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--color-ink-faint)]">
                  {group.note}
                </p>
              </div>
              {/* Each chip is staggered by index so the group brightens in
                  sequence rather than all at once (§22). */}
              <ul className="mt-5 flex flex-wrap gap-2" role="list">
                {group.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="chip"
                    style={{ transitionDelay: `${itemIndex * 24}ms` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
