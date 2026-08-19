import { ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/portfolio";
import React from "react";

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

        <div className="space-y-20 sm:space-y-24 lg:space-y-28">
          {projects.list.map((project, index) => (
            <article
              key={project.title}
              className="project-card relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <header className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10 sm:mb-12 lg:mb-14">
                <div className="lg:col-span-4 lg:self-start">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] mb-3 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    {project.title}
                  </h3>
                  <p className="text-base sm:text-lg font-medium text-[var(--color-ink-light)] leading-relaxed mb-6">{project.tagline}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--color-ink-lighter)]">
                    <span className="font-medium text-[var(--color-ink)]">{project.context}</span>
                    <span aria-hidden="true" className="text-[var(--color-border-dark)]">/</span>
                    <span>{project.status}</span>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="project-links flex flex-col sm:flex-row gap-4">
                    {project.links.live !== "#" && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] text-base font-semibold rounded-md hover:bg-[var(--color-ink-light)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-2"
                      >
                        <span className="relative z-10">View Live</span>
                        <ArrowUpRight className="icon-arrow relative z-10 size-5 shrink-0" aria-hidden="true" />
                      </a>
                    )}
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 border-2 border-[var(--color-border-dark)] text-[var(--color-ink)] text-base font-semibold rounded-md hover:bg-[var(--color-paper-alt)] hover:border-[var(--color-ink)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-2"
                    >
                      <span className="relative z-10">View Source</span>
                      <ArrowUpRight className="icon-arrow relative z-10 size-5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </header>

              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 lg:gap-8">
                  <div className="problem-solution-card p-5 sm:p-6 bg-[var(--color-paper-alt)] rounded-lg border border-[var(--color-border)]">
                    <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-ink)] mb-3">The Problem</h4>
                    <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="problem-solution-card p-5 sm:p-6 bg-[var(--color-paper-alt)] rounded-lg border border-[var(--color-border)]">
                    <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-ink)] mb-3">The Solution</h4>
                    <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <aside className="lg:col-span-5 space-y-6">
                  <div className="shipped-card p-5 sm:p-6 rounded-lg">
                    <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-ink)] mb-3">What Shipped</h4>
                    <p className="text-base text-[var(--color-ink)] leading-relaxed">{project.result}</p>
                  </div>
                  <ul className="space-y-3" role="list">
                    {project.features.map((feature, i) => (
                      <li key={feature} className="feature-item flex gap-3 text-sm text-[var(--color-ink-light)] leading-relaxed" style={{ animationDelay: `${i * 80 + 200}ms` }}>
                        <Check className="size-4 mt-0.5 shrink-0 text-[var(--color-ink)] flex-shrink-0" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>

              <footer className="mt-8 pt-6 border-t border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-ink-lighter)] tracking-wide flex flex-wrap gap-x-3 gap-y-1">
                  {project.tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      {i > 0 && <span aria-hidden="true" className="text-[var(--color-border-dark)]">/</span>}
                      <span className="project-tag font-medium text-[var(--color-ink-light)]">{tag}</span>
                    </React.Fragment>
                  ))}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}