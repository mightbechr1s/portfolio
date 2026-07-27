"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Globe, LayoutGrid, Zap } from "lucide-react";
import { services } from "@/data/portfolio";

const icons = {
  globe: Globe,
  layout: LayoutGrid,
  zap: Zap,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 px-6 bg-[var(--color-paper-alt)] border-y border-[var(--color-border)]">
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
          {services.badge}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {services.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-base text-[var(--color-ink-lighter)] mb-14 max-w-md"
        >
          {services.description}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-5"
        >
          {services.list.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group border border-[var(--color-border)] bg-[var(--color-paper)] p-7 hover:border-[var(--color-ink)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] mb-5 group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-paper)] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3
                  className="text-lg font-bold text-[var(--color-ink)] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-xs text-[var(--color-ink-lighter)] leading-relaxed">
                  <span className="font-medium text-[var(--color-ink-light)]">Who needs this:</span>{" "}
                  {service.target}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
