"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            onComplete();
          }, 400);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[var(--color-ink)] flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-[var(--color-paper)] text-5xl font-bold mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              chris
            </motion.div>

            <div className="w-48 h-[2px] bg-[#333] mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-[var(--color-paper)]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-[#666] mt-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
