"use client";
import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in ms, applied as transition-delay (§8). */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Reveals children once they enter the viewport. All nodes share a single
 * IntersectionObserver instance; motion itself is a CSS transition.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );
  return observer;
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion: show immediately, observe nothing (§28).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }

    node.classList.add("reveal");
    if (delay) node.style.transitionDelay = `${delay}ms`;

    const io = getObserver();
    io.observe(node);
    return () => io.unobserve(node);
  }, [delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
