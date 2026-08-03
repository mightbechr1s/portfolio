import { about } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="section-title font-bold text-[var(--color-ink)] lg:sticky lg:top-28" style={{ fontFamily: "var(--font-heading)" }}>
            {about.title}
          </h2>
        </div>

        <div className="lg:col-span-7">
          <p className="text-xl sm:text-2xl leading-relaxed text-[var(--color-ink)] mb-8 max-w-[65ch]">
            {about.paragraphs[0]}
          </p>
          <div className="space-y-5 max-w-[70ch]">
            {about.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph} className="text-base text-[var(--color-ink-light)] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-10 grid sm:grid-cols-2 border-t border-[var(--color-border-dark)]">
            {about.interests.map((interest) => (
              <li key={interest} className="py-4 sm:pr-6 border-b border-[var(--color-border)] text-sm font-medium text-[var(--color-ink)]">
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
