import { ArrowDown, ArrowUpRight } from "lucide-react";
import { hero } from "@/data/portfolio";

export function HeroSection() {
  const proof = hero.proof.split(" | ");

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-5 sm:px-6 pt-24 pb-24 border-b border-[var(--color-border)] overflow-hidden">
      <span className="hero-ambient hero-ambient-one" aria-hidden="true" />
      <span className="hero-ambient hero-ambient-two" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <p className="hero-reveal text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-ink-lighter)] mb-5">
          {hero.greeting}
        </p>

        <h1 className="hero-reveal hero-reveal-2 text-[clamp(4.25rem,12vw,6rem)] leading-[0.9] font-bold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-heading)" }}>
          {hero.name}
        </h1>

        <h2 className="hero-reveal hero-reveal-3 mt-7 text-xl sm:text-2xl font-semibold leading-tight text-[var(--color-ink)]" style={{ fontFamily: "var(--font-heading)" }}>
          {hero.headline}
        </h2>

        <p className="hero-reveal hero-reveal-3 mt-5 mx-auto max-w-2xl text-sm sm:text-base text-[var(--color-ink-light)] leading-relaxed">
          {hero.subtitle}
        </p>

        <p className="hero-reveal hero-reveal-4 mt-5 text-xs sm:text-sm text-[var(--color-ink-lighter)]">
          {hero.roles.join("  /  ")}
        </p>

        <div className="hero-reveal hero-reveal-4 mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={hero.cta.href}
            className="inline-flex min-h-11 items-center gap-2 px-5 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] text-sm font-semibold hover:opacity-75 active:scale-[0.98] transition-[opacity,transform]"
          >
            {hero.cta.label}
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex min-h-11 items-center gap-2 px-5 py-3 border border-[var(--color-border-dark)] text-[var(--color-ink)] text-sm font-semibold hover:bg-[var(--color-paper-alt)] active:scale-[0.98] transition-[background-color,transform]"
          >
            {hero.secondaryCta.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="hero-reveal hero-reveal-5 mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-[var(--color-ink-lighter)]">
          {proof.map((item, index) => (
            <span key={item} className="inline-flex items-center gap-3">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item}
            </span>
          ))}
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 p-3 text-[var(--color-ink-lighter)] hover:text-[var(--color-ink)] transition-colors" aria-label="Continue to About">
        <ArrowDown className="hero-scroll-cue size-4" aria-hidden="true" />
      </a>
    </section>
  );
}
