import { footer } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-paper-alt)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 pb-8">
        <div className="mb-14 grid sm:grid-cols-12 gap-6 items-end">
          <p
            className="sm:col-span-9 text-2xl sm:text-4xl font-bold text-[var(--color-ink)] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {footer.cta}
          </p>
          <a href="#contact" className="sm:col-span-3 sm:justify-self-end inline-flex min-h-11 items-center px-5 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] text-sm font-semibold">Start a conversation</a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-ink-lighter)]">{footer.text}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a
              href="https://github.com/mightbechr1s"
              target="_blank"
              rel="noopener noreferrer"
              className="size-11 inline-flex items-center justify-center text-[var(--color-ink-lighter)] hover:text-[var(--color-ink)] transition-colors"
              aria-label="Chris on GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="#about" className="min-h-11 inline-flex items-center text-xs text-[var(--color-ink-lighter)] hover:text-[var(--color-ink)] transition-colors">About</a>
            <a href="#services" className="min-h-11 inline-flex items-center text-xs text-[var(--color-ink-lighter)] hover:text-[var(--color-ink)] transition-colors">Services</a>
            <a href="#projects" className="min-h-11 inline-flex items-center text-xs text-[var(--color-ink-lighter)] hover:text-[var(--color-ink)] transition-colors">Projects</a>
            <a href="#process" className="min-h-11 inline-flex items-center text-xs text-[var(--color-ink-lighter)] hover:text-[var(--color-ink)] transition-colors">Process</a>
            <a href="#contact" className="min-h-11 inline-flex items-center text-xs text-[var(--color-ink-lighter)] hover:text-[var(--color-ink)] transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
