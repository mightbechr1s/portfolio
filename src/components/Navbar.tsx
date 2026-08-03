"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstMobileLink.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50" aria-label="Primary navigation">
      <div className={`transition-[background-color,border-color,backdrop-filter] duration-300 ${scrolled || open ? "bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-[var(--color-border)]" : "bg-transparent border-b border-transparent"}`}>
        <div className="max-w-5xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="#main-content"
            className="text-xl font-bold lowercase text-[var(--color-ink)] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            chris
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors py-2"
              >
                {l.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuButton}
              onClick={() => setOpen(!open)}
              className="size-11 flex items-center justify-center text-[var(--color-ink)]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X className="w-5 h-5 text-[var(--color-ink)]" aria-hidden="true" /> : <Menu className="w-5 h-5 text-[var(--color-ink)]" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            id="mobile-navigation"
            className="md:hidden bg-[var(--color-paper)] border-t border-[var(--color-border)]"
          >
            <div className="px-5 py-4 flex flex-col">
              {links.map((l, index) => (
                <a
                  key={l.href}
                  href={l.href}
                  ref={index === 0 ? firstMobileLink : undefined}
                  onClick={() => setOpen(false)}
                  className="text-lg font-semibold text-[var(--color-ink)] py-3 border-b border-[var(--color-border)] last:border-0"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
