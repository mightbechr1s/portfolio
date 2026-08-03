"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sun, Moon, Monitor } from "lucide-react";

const modes = [
  { key: "light", icon: Sun },
  { key: "dark", icon: Moon },
  { key: "system", icon: Monitor },
] as const;

const subscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const reduceMotion = useReducedMotion();

  if (!mounted) {
    return <span className="size-11" aria-hidden="true" />;
  }

  const current = modes.find((m) => m.key === theme) ?? modes[2];
  const next = modes[(modes.indexOf(current) + 1) % modes.length];

  return (
    <motion.button
      initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => setTheme(next.key)}
      className="size-11 shrink-0 flex items-center justify-center bg-[var(--color-paper)] border border-[var(--color-border-dark)] text-[var(--color-ink-light)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
      aria-label={`${current.key} theme selected. Switch to ${next.key} theme`}
    >
      <next.icon className="w-4 h-4" aria-hidden="true" />
    </motion.button>
  );
}
