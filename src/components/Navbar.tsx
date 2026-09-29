"use client";
import { useEffect, useRef, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { resume } from "@/data/portfolio";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#tech", label: "Tech" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the last section whose top has passed the nav line is active.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(visible.length > 0 ? `#${visible[0].target.id}` : "");
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    for (const id of ids) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
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
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-[var(--color-line)] bg-[var(--color-bg)]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      aria-label="Primary navigation"
    >
      <div className="shell flex h-[4.25rem] items-center justify-between gap-4">
        <a
          href="#home"
          className="inline-flex min-h-11 items-center font-mono text-sm font-semibold tracking-tight text-[var(--color-ink)]"
        >
          chris<span className="text-[var(--color-accent)]">.</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`nav-link ${active === l.href ? "is-active" : ""}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={resume.href}
            className="btn btn-ghost ml-1 !min-h-9 !px-3 !py-1.5 !text-xs"
          >
            <FileText className="size-3.5" aria-hidden="true" />
            {resume.label}
          </a>
        </div>

        <button
          ref={menuButton}
          onClick={() => setOpen((v) => !v)}
          className="btn btn-ghost !min-h-10 !px-2.5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        inert={!open}
        className="overflow-hidden border-[var(--color-line)] bg-[var(--color-bg)]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out lg:hidden"
        style={{ maxHeight: open ? "22rem" : "0rem", opacity: open ? 1 : 0 }}
      >
        <div className="shell flex flex-col py-3">
          {links.map((l, index) => (
            <a
              key={l.href}
              href={l.href}
              ref={index === 0 ? firstMobileLink : undefined}
              onClick={() => setOpen(false)}
              aria-current={active === l.href ? "true" : undefined}
              className={`border-b border-[var(--color-line)] py-3.5 text-base font-medium transition-colors last:border-0 ${
                active === l.href
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-ink-muted)]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={resume.href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 py-3.5 text-base font-medium text-[var(--color-ink-muted)]"
          >
            <FileText className="size-4" aria-hidden="true" />
            {resume.label}
          </a>
        </div>
      </div>
    </nav>
  );
}
