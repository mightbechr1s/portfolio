"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-all duration-300 ${scrolled ? "bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-[var(--color-border)]" : "bg-transparent"}`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-bold text-[var(--color-ink)] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            chris
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1.5"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5 text-[var(--color-ink)]" /> : <Menu className="w-5 h-5 text-[var(--color-ink)]" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden bg-[var(--color-paper)] border-b border-[var(--color-border)]"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
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
