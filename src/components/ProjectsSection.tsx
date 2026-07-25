"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";
import { TechBadge } from "./TechBadge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-28 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-ink-lighter)] mb-4"
        >
          {projects.badge}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {projects.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
           className="text-base text-[var(--color-ink-lighter)] mb-14 max-w-md"
        >
          {projects.description}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.list.map((p, idx) => (
            <motion.div
              key={p.title}
              variants={cardVariants}
              className="group border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2 group-hover:underline underline-offset-4 transition-all">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-4">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-[var(--color-border)]">
                  {p.links.live !== "#" && (
                    <motion.a
                      href={p.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      <ExternalLink className="w-3 h-3" /> Live
                    </motion.a>
                  )}
                  <motion.a
                    href={p.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> Source
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
