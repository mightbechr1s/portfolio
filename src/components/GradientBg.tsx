"use client";
import { motion } from "motion/react";

export function GradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, var(--color-ink) 0%, transparent 70%)" }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, var(--color-ink-light) 0%, transparent 70%)" }}
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 60, -90, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
