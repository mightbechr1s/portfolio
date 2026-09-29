import { about, terminal } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section id="about" className="section-pad px-5 sm:px-6">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{about.badge}</p>
            <h2 className="section-title mt-4 max-w-xl font-bold">{about.title}</h2>
          </Reveal>

          <Reveal delay={80} className="mt-8 space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <p
                key={paragraph}
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-[var(--color-ink)] sm:text-xl"
                    : "text-base leading-relaxed text-[var(--color-ink-muted)]"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={140} className="mt-9">
            <ul className="grid gap-3 sm:grid-cols-2">
              {about.interests.map((interest) => (
                <li
                  key={interest}
                  className="flex items-start gap-2.5 text-sm text-[var(--color-ink-muted)]"
                >
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                  {interest}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-6">
          <div className="panel overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[var(--color-line-strong)]" />
                <span className="size-2.5 rounded-full bg-[var(--color-line-strong)]" />
                <span className="size-2.5 rounded-full bg-[var(--color-line-strong)]" />
              </span>
              <span className="ml-2 font-mono text-xs text-[var(--color-ink-faint)]">
                chris@dev
              </span>
            </div>
            <dl className="divide-y divide-[var(--color-line)] font-mono text-xs sm:text-[0.8125rem]">
              {terminal.lines.map((line) => (
                <div key={line.prompt} className="flex gap-2 px-4 py-3.5">
                  <dt className="shrink-0 text-[var(--color-accent)]">$</dt>
                  <dd className="flex min-w-0 flex-wrap gap-x-2">
                    <span className="text-[var(--color-ink)]">{line.prompt}</span>
                    <span className="text-[var(--color-ink-faint)]">
                      {line.output}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
