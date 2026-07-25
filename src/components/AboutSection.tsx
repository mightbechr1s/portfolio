"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { about } from "@/data/portfolio";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-ink-lighter)] mb-4"
        >
          {about.badge}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-10 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {about.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
          className="space-y-5"
        >
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="text-base sm:text-lg text-[var(--color-ink-light)] leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>


      </motion.div>
    </section>
  );
}
