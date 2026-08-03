import { Globe, LayoutGrid, Zap } from "lucide-react";
import { services } from "@/data/portfolio";

const icons = {
  globe: Globe,
  layout: LayoutGrid,
  zap: Zap,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 px-5 sm:px-6 bg-[var(--color-paper-alt)] border-y border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 sm:mb-20">
          <h2 className="section-title lg:col-span-8 font-bold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-heading)" }}>
            {services.title}
          </h2>
          <p className="lg:col-span-4 lg:self-end text-base text-[var(--color-ink-light)] max-w-md leading-relaxed">
            {services.description}
          </p>
        </div>

        <div className="border-t border-[var(--color-border-dark)]">
          {services.list.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <article
                key={service.title}
                className="group grid md:grid-cols-12 gap-5 md:gap-8 py-8 border-b border-[var(--color-border)]"
              >
                <div className="md:col-span-1">
                  <span className="size-11 flex items-center justify-center bg-[var(--color-paper)] border border-[var(--color-border)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-paper)] transition-colors">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-heading)" }}>
                    {service.title}
                  </h3>
                </div>
                <p className="md:col-span-4 text-sm text-[var(--color-ink-light)] leading-relaxed">
                  {service.description}
                </p>
                <div className="md:col-span-4 text-sm leading-relaxed">
                  <p className="text-[var(--color-ink)] font-medium mb-2">What changes</p>
                  <p className="text-[var(--color-ink-light)]">{service.value}</p>
                  <p className="text-xs text-[var(--color-ink-lighter)] mt-4">For {service.target}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
