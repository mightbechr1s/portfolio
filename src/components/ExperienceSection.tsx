"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { experience } from "@/data/portfolio";
import { TechBadge } from "./TechBadge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const jobVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-28 px-6 bg-[var(--color-paper-alt)] border-y border-[var(--color-border)]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-ink-lighter)] mb-4"
        >
          {experience.badge}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-14 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {experience.title}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-2"
        >
          {experience.jobs.map((job, i) => (
            <motion.div
              key={i}
              variants={jobVariants}
              className="border border-[var(--color-border)] bg-[var(--color-paper)] p-6 -mt-px first:mt-0 hover:border-[var(--color-border-dark)] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-bold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-heading)" }}>{job.role}</h3>
                  <p className="text-sm text-[var(--color-ink-light)]">{job.company}</p>
                </div>
                <span className="text-xs text-[var(--color-ink-lighter)] shrink-0" style={{ fontFamily: "var(--font-mono)" }}>{job.period}</span>
              </div>
              <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map((t) => (
                  <TechBadge key={t} name={t} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
