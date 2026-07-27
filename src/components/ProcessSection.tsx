"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { process } from "@/data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="py-28 px-6 bg-[var(--color-paper-alt)] border-y border-[var(--color-border)]">
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
          {process.badge}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {process.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-base text-[var(--color-ink-lighter)] mb-14 max-w-md"
        >
          {process.description}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {process.steps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="border border-[var(--color-border)] bg-[var(--color-paper)] p-6 hover:border-[var(--color-ink)] transition-colors"
            >
              <span
                className="text-3xl font-bold text-[var(--color-ink-lighter)] mb-4 block"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {step.number}
              </span>
              <h3
                className="text-base font-bold text-[var(--color-ink)] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
