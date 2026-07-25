"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { skills } from "@/data/portfolio";
import { TechBadge } from "./TechBadge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-28 px-6 bg-[var(--color-paper-alt)] border-y border-[var(--color-border)]">
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
          {skills.badge}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-14 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {skills.title}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-3 gap-6"
        >
          {skills.categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={itemVariants}
              className="bg-[var(--color-paper)] border border-[var(--color-border)] p-6 hover:border-[var(--color-border-dark)] transition-colors"
            >
              <h3
                className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <TechBadge key={skill.name} name={skill.name} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
