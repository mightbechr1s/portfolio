import { Globe, LayoutGrid, Zap } from "lucide-react";
import { services } from "@/data/portfolio";
import { Reveal } from "./Reveal";

const icons = {
  globe: Globe,
  layout: LayoutGrid,
  zap: Zap,
};

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section-pad border-y border-[var(--color-line)] bg-[var(--color-surface)] px-5 sm:px-6"
    >
      <div className="shell">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{services.badge}</p>
            <h2 className="section-title mt-4 font-bold">{services.title}</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[var(--color-ink-muted)] lg:col-span-4 lg:self-end">
            {services.description}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {services.list.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <Reveal as="li" key={service.title} delay={index * 100}>
                <article className="card card-hover service-card group flex h-full flex-col p-6">
                  <span className="card-icon flex size-11 items-center justify-center rounded-lg border border-[var(--color-line-strong)] bg-[var(--color-surface-2)] text-[var(--color-ink-muted)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>

                  {/* Accent rule that draws itself in on hover: scaleX from the
                      left edge only, so the reveal direction is unambiguous. */}
                  <span className="service-rule" aria-hidden="true" />

                  <h3 className="mt-5 text-lg font-bold">{service.title}</h3>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {service.description}
                  </p>

                  <p className="mt-5 border-t border-[var(--color-line)] pt-4 text-sm leading-relaxed text-[var(--color-ink)]">
                    {service.value}
                  </p>

                  <p className="mt-auto pt-4 font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--color-ink-faint)]">
                    {service.target}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
