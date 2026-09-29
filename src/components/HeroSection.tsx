import { ArrowDown, ArrowUpRight } from "lucide-react";
import { hero, resume } from "@/data/portfolio";
import { HeroCursorGlow } from "./HeroCursorGlow";
import { HoloScene } from "./HoloScene";
import { Magnetic } from "./Magnetic";

/**
 * Static particle field. Positions and durations are fixed here rather than
 * randomised at runtime so there is no hydration mismatch and no layout shift.
 * Half are hidden below 768px in CSS, so mobile still renders 14.
 */
const PARTICLES = [
  { left: "12%", top: "72%", dur: 22, delay: 0 },
  { left: "22%", top: "88%", dur: 26, delay: 4 },
  { left: "34%", top: "64%", dur: 20, delay: 8 },
  { left: "47%", top: "82%", dur: 28, delay: 2 },
  { left: "58%", top: "70%", dur: 24, delay: 11 },
  { left: "69%", top: "90%", dur: 21, delay: 6 },
  { left: "78%", top: "62%", dur: 27, delay: 14 },
  { left: "88%", top: "80%", dur: 23, delay: 9 },
  { left: "16%", top: "52%", dur: 25, delay: 17 },
  { left: "72%", top: "46%", dur: 29, delay: 12 },
  { left: "6%", top: "64%", dur: 24, delay: 3 },
  { left: "18%", top: "46%", dur: 27, delay: 15 },
  { left: "26%", top: "78%", dur: 21, delay: 7 },
  { left: "30%", top: "58%", dur: 29, delay: 12 },
  { left: "38%", top: "70%", dur: 23, delay: 18 },
  { left: "42%", top: "50%", dur: 26, delay: 5 },
  { left: "50%", top: "86%", dur: 20, delay: 10 },
  { left: "54%", top: "62%", dur: 28, delay: 1 },
  { left: "62%", top: "76%", dur: 22, delay: 16 },
  { left: "66%", top: "54%", dur: 25, delay: 9 },
  { left: "74%", top: "68%", dur: 27, delay: 13 },
  { left: "80%", top: "88%", dur: 21, delay: 4 },
  { left: "84%", top: "50%", dur: 24, delay: 17 },
  { left: "92%", top: "72%", dur: 29, delay: 6 },
  { left: "96%", top: "60%", dur: 23, delay: 11 },
  { left: "10%", top: "88%", dur: 26, delay: 8 },
  { left: "56%", top: "40%", dur: 20, delay: 19 },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-28 sm:px-6"
    >
      <div className="hero-bg" aria-hidden="true">
        {/* 3D scene. Lazy chunk, z-0, pointer-events:none, and the existing CSS
            atmosphere sits on top of it as the guaranteed fallback (§3, §42). */}
        <HoloScene />
        {/* Pointer parallax wrapper: the aurora and blobs shift as one unit so
            they never tear apart from each other. */}
        <div className="hero-atmos">
          <div className="hero-aurora" />
          <div className="hero-glow hero-glow-a" />
          <div className="hero-glow hero-glow-b" />
          <div className="hero-glow hero-glow-c" />
        </div>
        <div className="hero-grid" />
        <div className="hero-scan" />
        <div className="hero-core-glow" />
        {PARTICLES.map((p) => (
          <span
            key={`${p.left}-${p.top}`}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
        <HeroCursorGlow />
        <div className="hero-noise" />
      </div>

      <div className="shell relative z-10">
        <div className="max-w-3xl">
          <p
            className="hero-enter hero-enter-from font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-ink-faint)]"
            style={{ animationDelay: "60ms" }}
          >
            {hero.greeting}
          </p>

          <h1
            className="hero-enter hero-enter-from display mt-4 font-bold"
            style={{ animationDelay: "140ms" }}
          >
            I&rsquo;m {hero.name}
          </h1>

          <p
            className="hero-enter hero-enter-from mt-5 text-lg font-semibold text-[var(--color-accent)] sm:text-xl"
            style={{ animationDelay: "220ms" }}
          >
            {hero.role}
          </p>

          <p
            className="hero-enter hero-enter-from mt-6 max-w-xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            {hero.headline}
          </p>

          <p
            className="hero-enter hero-enter-from mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-ink-faint)] sm:text-base"
            style={{ animationDelay: "380ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="hero-enter hero-enter-from mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "460ms" }}
          >
            <Magnetic strength={5}>
              <a href={hero.cta.href} className="btn btn-primary">
                {hero.cta.label}
                <ArrowDown className="btn-arrow size-4" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic strength={4}>
              <a href={hero.secondaryCta.href} className="btn btn-ghost">
                {hero.secondaryCta.label}
                <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
              </a>
            </Magnetic>
          </div>

          <div
            className="hero-enter hero-enter-from mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-[var(--color-ink-faint)]"
            style={{ animationDelay: "540ms" }}
          >
            {hero.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>

          <div
            className="hero-enter hero-enter-from mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-[var(--color-ink-faint)]"
            style={{ animationDelay: "600ms" }}
          >
            {hero.proof.map((item) => (
              <span key={item} className="inline-flex items-center gap-4">
                <span className="size-1 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                {item}
              </span>
            ))}
            <a
              href={resume.href}
              className="link-arrow-host inline-flex min-h-11 items-center gap-1 text-[var(--color-ink-muted)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
            >
              {resume.label}
              <ArrowUpRight className="link-arrow size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-accent)]"
        aria-label="Continue to About"
      >
        <ArrowDown className="size-4 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
