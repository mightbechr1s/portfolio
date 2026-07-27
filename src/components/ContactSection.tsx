"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail } from "lucide-react";
import { contact } from "@/data/portfolio";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-28 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-ink-lighter)] mb-4"
        >
          {contact.badge}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {contact.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-base text-[var(--color-ink-light)] mb-10"
        >
          {contact.description}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const data = new FormData(form);
            const subject = `Project Inquiry — ${data.get("projectType") || "General"}`;
            const body = `Name: ${data.get("name")}%0AEmail: ${data.get("email")}%0AProject Type: ${data.get("projectType")}%0ABudget: ${data.get("budget")}%0AMessage: ${data.get("message")}`;
            window.open(`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`);
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-[var(--color-ink-lighter)] mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 text-sm border border-[var(--color-border-dark)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[var(--color-ink-lighter)] mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2.5 text-sm border border-[var(--color-border-dark)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectType" className="block text-xs font-medium text-[var(--color-ink-lighter)] mb-1.5">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                className="w-full px-4 py-2.5 text-sm border border-[var(--color-border-dark)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors"
              >
                <option value="Website">Website Development</option>
                <option value="Business System">Business System</option>
                <option value="Automation">Automation Solution</option>
                <option value="Other">Other / Not Sure</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-xs font-medium text-[var(--color-ink-lighter)] mb-1.5">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                className="w-full px-4 py-2.5 text-sm border border-[var(--color-border-dark)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors"
              >
                <option value="Under PHP 5,000">Under PHP 5,000</option>
                <option value="PHP 5,000 - 15,000">PHP 5,000 - 15,000</option>
                <option value="PHP 15,000+">PHP 15,000+</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-[var(--color-ink-lighter)] mb-1.5">
              Tell me about your project
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-2.5 text-sm border border-[var(--color-border-dark)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors resize-none"
              placeholder="What problem do you need solved?"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] text-sm font-medium hover:bg-[var(--color-ink-light)] transition-all active:scale-[0.98]"
          >
            Send Message
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-[var(--color-ink-lighter)] mb-3">
            {contact.responseTime}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {contact.social.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-border-dark)] text-sm text-[var(--color-ink-light)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors active:scale-95"
              >
                {s.icon === "github" ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                {s.name}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
