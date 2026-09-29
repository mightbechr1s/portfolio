import { ArrowUpRight, Check, FileCode2 } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Reveal } from "./Reveal";

function Shot({ image, alt }: { image: string | null; alt: string | null }) {
  if (!image || !alt) {
    return (
      <div className="project-shot flex aspect-[16/10] flex-col items-center justify-center gap-2 px-6 text-center">
        <FileCode2 className="size-6 text-[var(--color-accent)]" aria-hidden="true" />
        <p className="font-mono text-xs text-[var(--color-ink-faint)]">
          Desktop application &mdash; no browser demo
        </p>
      </div>
    );
  }
  return (
    <div className="project-shot">
      {/* Plain img: static export sets images.unoptimized, so next/image adds
          nothing but a wrapper here, and lazy loading keeps the payload light. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={alt} width={1200} height={750} loading="lazy" decoding="async" />
    </div>
  );
}
function Links({ project }: { project: (typeof projects.list)[number] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.links.live !== "#" && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Live Demo
          <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
        </a>
      )}
      <a
        href={project.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
      >
        Source
        <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function Details({ project }: { project: (typeof projects.list)[number] }) {
  return (
    <div className="grid gap-6 border-t border-[var(--color-line)] p-6 sm:p-8 lg:grid-cols-12">
      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-2)] p-5">
          <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
            The Problem
          </h4>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
            {project.problem}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-2)] p-5">
          <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
            The Solution
          </h4>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
            {project.solution}
          </p>
        </div>
      </div>

      <div className="lg:col-span-5">
        <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
          Key Features
        </h4>
        <ul className="mt-3 space-y-2.5">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-ink-muted)]"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-[var(--color-line)] pt-5 lg:col-span-12">
        <p className="text-sm leading-relaxed text-[var(--color-ink)]">{project.result}</p>
        <ul className="mt-4 flex flex-wrap gap-2" role="list">
          {project.tags.map((tag) => (
            <li key={tag} className="chip !cursor-default">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [featured, ...rest] = projects.list;

  return (
    <section
      id="projects"
      className="section-glow section-pad px-5 sm:px-6"
    >
      <div className="shell">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{projects.badge}</p>
            <h2 className="section-title mt-4 font-bold">{projects.title}</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[var(--color-ink-muted)] lg:col-span-4 lg:self-end">
            {projects.description}
          </p>
        </Reveal>

        {/* Featured project: wide horizontal card */}
        <Reveal delay={60} className="mt-12 lg:mt-16">
          {/* data-cursor-label is what the custom cursor reads to swap its ring
              for a labelled state over a project card (§10). */}
          <article
            className="card project-card overflow-hidden"
            data-cursor-label="VIEW"
          >
            <Shot image={featured.image} alt={featured.imageAlt} />
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[var(--color-ink-faint)]">
                  <span className="text-[var(--color-accent)]">Featured</span>
                  <span aria-hidden="true">/</span>
                  <span>{featured.context}</span>
                  <span aria-hidden="true">/</span>
                  <span>{featured.status}</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{featured.title}</h3>
                <p className="mt-2 text-base text-[var(--color-ink-muted)]">{featured.tagline}</p>
              </div>
              <div className="lg:col-span-5 lg:self-end lg:justify-self-end">
                <Links project={featured} />
              </div>
            </div>
            <Details project={featured} />
          </article>
        </Reveal>

        {/* Remaining projects: 1-up on mobile, 2-up on tablet, 3-up on desktop (§15) */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => (
            <Reveal as="article" key={project.title} delay={index * 100}>
              <div
                className="card project-card flex h-full flex-col overflow-hidden"
                data-cursor-label="VIEW"
              >
                <Shot image={project.image} alt={project.imageAlt} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-x-2 font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--color-ink-faint)]">
                    <span>{project.context}</span>
                    <span aria-hidden="true">/</span>
                    <span>{project.status}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{project.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{project.tagline}</p>

                  <div className="mt-5">
                    <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      Key Features
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-ink-muted)]"
                        >
                          <Check
                            className="mt-0.5 size-3.5 shrink-0 text-[var(--color-accent)]"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-5 border-t border-[var(--color-line)] pt-4 text-sm leading-relaxed text-[var(--color-ink)]">
                    {project.result}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2" role="list">
                    {project.tags.map((tag) => (
                      <li key={tag} className="chip !cursor-default">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-1 lg:mt-auto">
                    <Links project={project} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
