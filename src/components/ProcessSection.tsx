import { process } from "@/data/portfolio";

export function ProcessSection() {
  return (
    <section id="process" className="py-24 sm:py-32 px-5 sm:px-6 bg-[var(--color-paper-alt)] border-y border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 sm:mb-20">
          <h2 className="section-title lg:col-span-8 font-bold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-heading)" }}>
            {process.title}
          </h2>
          <p className="lg:col-span-4 lg:self-end text-base text-[var(--color-ink-light)] leading-relaxed">{process.description}</p>
        </div>

        <ol className="border-t border-[var(--color-border-dark)]">
          {process.steps.map((step) => (
            <li
              key={step.number}
              className="grid sm:grid-cols-12 gap-3 sm:gap-8 py-7 border-b border-[var(--color-border)]"
            >
              <span className="sm:col-span-1 text-sm font-mono text-[var(--color-ink-lighter)]">{step.number}</span>
              <h3 className="sm:col-span-3 text-base font-bold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-heading)" }}>
                {step.title}
              </h3>
              <p className="sm:col-span-8 text-sm text-[var(--color-ink-light)] leading-relaxed max-w-[65ch]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
