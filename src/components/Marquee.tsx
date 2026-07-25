"use client";
import { motion } from "motion/react";
import { TechBadge } from "./TechBadge";

export function Marquee({ items, speed = 40 }: { items: string[]; speed?: number }) {
  return (
    <div className="relative overflow-hidden py-4 mask-x-fade">
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: items.length * (speed / 10), repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((t, i) => (
          <TechBadge key={`${t}-${i}`} name={t} />
        ))}
      </motion.div>
    </div>
  );
}
