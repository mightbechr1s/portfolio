import { process } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="section-pad border-y border-[var(--color-line)] bg-[var(--color-surface)] px-5 sm:px-6"
    >
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{process.badge}</p>
          <h2 className="section-title mt-4 font-bold">{process.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-muted)]">
            {process.description}
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {process.steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 100}>
              <div className="card card-hover flex h-full flex-col p-6">
                <span className="font-mono text-sm text-[var(--color-accent)]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
