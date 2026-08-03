import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/portfolio";

const projectMedia: Record<string, { src: string; alt: string }> = {
  Yield: { src: "/portfolio/yield-preview.png", alt: "Yield cooking application landing page and mobile recipe screens" },
  StockFlow: { src: "/portfolio/stockflow-preview.png", alt: "StockFlow inventory management landing page and dashboard preview" },
};

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-16 sm:mb-24">
          <h2 className="section-title lg:col-span-8 font-bold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-heading)" }}>
            {projects.title}
          </h2>
          <p className="lg:col-span-4 lg:self-end text-base text-[var(--color-ink-light)] max-w-md leading-relaxed">
            {projects.description}
          </p>
        </div>

        <div className="space-y-24 sm:space-y-32">
          {projects.list.map((project) => {
            const media = projectMedia[project.title];
            return (
            <article
              key={project.title}
              className="border-t border-[var(--color-border-dark)] pt-7"
            >
              <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-7">
                <div>
                  <h3 className="text-3xl sm:text-5xl font-bold text-[var(--color-ink)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-[var(--color-ink-light)]">{project.tagline}</p>
                  <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--color-ink-lighter)]">
                    <span>{project.context}</span>
                    <span aria-hidden="true">/</span>
                    <span>{project.status}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.links.live !== "#" && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 px-4 py-2 bg-[var(--color-ink)] text-[var(--color-paper)] text-sm font-semibold hover:bg-[var(--color-ink-light)] transition-colors">
                      View live <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 px-4 py-2 border border-[var(--color-border-dark)] text-[var(--color-ink)] text-sm font-semibold hover:bg-[var(--color-paper-alt)] transition-colors">
                    Source <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </header>

              <div className="project-media relative aspect-[16/9] border border-[var(--color-border)] mb-10 sm:mb-12">
                {media ? (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1152px"
                    className={`object-cover ${project.title === "StockFlow" ? "scale-[1.65] object-[78%_42%]" : "object-top"}`}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-10 text-white">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">Desktop application</p>
                    <div>
                      <p className="text-4xl sm:text-7xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>SkillSync</p>
                      <p className="mt-3 text-sm sm:text-base text-white/65">Team matching / Tasks / Real-time chat</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-ink)] mb-3">The problem</h4>
                    <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-ink)] mb-3">The solution</h4>
                    <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <aside className="lg:col-span-5">
                  <div className="bg-[var(--color-signal-muted)] p-6 sm:p-7 mb-7">
                    <h4 className="text-sm font-bold text-[var(--color-ink)] mb-3">What shipped</h4>
                    <p className="text-base text-[var(--color-ink)] leading-relaxed">{project.result}</p>
                  </div>
                  <ul className="space-y-3">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm text-[var(--color-ink-light)] leading-relaxed">
                        <Check className="size-4 mt-0.5 shrink-0 text-[var(--color-ink)]" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>

              <p className="mt-10 pt-5 border-t border-[var(--color-border)] text-xs text-[var(--color-ink-lighter)]">
                {project.tags.join("  /  ")}
              </p>
            </article>
          )})}
        </div>
      </div>
    </section>
  );
}
