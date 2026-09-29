import { Award, GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function EducationSection() {
  return (
    <section id="education" className="section-pad px-5 sm:px-6">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">{education.badge}</p>
          <h2 className="section-title mt-4 font-bold">{education.title}</h2>
        </Reveal>

        <div className="lg:col-span-7">
          <ul className="space-y-4" role="list">
            {education.items.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 80}>
                <div className="card card-hover flex gap-4 p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[var(--color-line-strong)] bg-[var(--color-surface-2)] text-[var(--color-accent)]">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-bold">{item.title}</h3>
                      <p className="font-mono text-xs text-[var(--color-ink-faint)]">
                        {item.period}
                      </p>
                    </div>
                    <p className="mt-1.5 text-sm text-[var(--color-ink-muted)]">{item.school}</p>
                    <p className="mt-2 text-sm text-[var(--color-ink-faint)]">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-8">
            <h3 className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-ink-faint)]">
              <Award className="size-4 text-[var(--color-accent)]" aria-hidden="true" />
              Certifications
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2" role="list">
              {education.certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4"
                >
                  <p className="text-sm font-semibold">{cert.name}</p>
                  <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
                    {cert.issuer} &middot; {cert.year}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
