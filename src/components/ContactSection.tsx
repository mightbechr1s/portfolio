"use client";
import { ArrowUpRight, Mail } from "lucide-react";
import { contact } from "@/data/portfolio";

const fieldClass = "w-full min-h-11 px-4 py-3 text-sm border border-[var(--color-border-dark)] bg-[var(--color-paper)] text-[var(--color-ink)] placeholder:text-[var(--color-ink-lighter)] focus:border-[var(--color-ink)] transition-colors";

const requiredCue = <span className="text-[var(--color-paper)]/55">(required)</span>;
const optionalCue = <span className="text-[var(--color-paper)]/55">(optional)</span>;

/** Collapse whitespace/newlines into a single trimmed line and bound its length for the mailto payload. */
const toSingleLine = (value: FormDataEntryValue | null, max: number): string =>
  String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);

export function ContactSection() {
  return (
    <section id="contact" className="contact-section py-24 sm:py-32 px-5 sm:px-6 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="section-title font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>{contact.title}</h2>
          <p className="text-base text-[var(--color-paper)]/70 leading-relaxed max-w-md mb-8">{contact.description}</p>
          <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-paper)] hover:underline underline-offset-4">
            {contact.email} <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <p className="mt-3 text-xs text-[var(--color-paper)]/55">{contact.responseTime}</p>
        </div>

        <div className="lg:col-span-7">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const projectType = toSingleLine(data.get("projectType"), 60);
            const subject = `Project Inquiry - ${projectType || "General"}`.slice(0, 80);
            const budget = toSingleLine(data.get("budget"), 40) || "Not provided";
            const body = [
              `Name: ${toSingleLine(data.get("name"), 80)}`,
              `Email: ${toSingleLine(data.get("email"), 254)}`,
              `Project Type: ${projectType}`,
              `Budget: ${budget}`,
              "",
              String(data.get("message") ?? "").trim().slice(0, 2000),
            ].join("\n");
            window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          }}
          aria-describedby="form-note"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-[var(--color-paper)]/65 mb-2">
                Name {requiredCue}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                maxLength={80}
                required
                className={fieldClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[var(--color-paper)]/65 mb-2">
                Email {requiredCue}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                maxLength={254}
                required
                className={fieldClass}
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectType" className="block text-xs font-medium text-[var(--color-paper)]/65 mb-2">
                Project Type {requiredCue}
              </label>
              <select
                id="projectType"
                name="projectType"
                className={fieldClass}
                defaultValue=""
                required
              >
                <option value="" disabled>Select a project type</option>
                <option value="Website">Website Development</option>
                <option value="Business System">Business System</option>
                <option value="Automation">Automation Solution</option>
                <option value="Other">Other / Not Sure</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-xs font-medium text-[var(--color-paper)]/65 mb-2">
                Budget Range {optionalCue}
              </label>
              <select
                id="budget"
                name="budget"
                className={fieldClass}
                defaultValue=""
              >
                <option value="">Prefer not to say</option>
                <option value="Under PHP 5,000">Under PHP 5,000</option>
                <option value="PHP 5,000 - 15,000">PHP 5,000 - 15,000</option>
                <option value="PHP 15,000+">PHP 15,000+</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-[var(--color-paper)]/65 mb-2">
              Tell me about your project {requiredCue}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={2000}
              required
              className={`${fieldClass} resize-y`}
              placeholder="What problem do you need solved?"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-12 px-6 py-3 bg-[var(--color-paper)] text-[var(--color-ink)] text-sm font-bold hover:opacity-80 transition-opacity"
          >
            Continue in email
          </button>
          <p id="form-note" className="text-xs text-[var(--color-paper)]/55 leading-relaxed">
            This opens a draft in your email application for you to review and send. Nothing is stored on this site.
          </p>
        </form>

          <div className="flex flex-wrap gap-3 mt-8 pt-7 border-t border-[var(--color-paper)]/20">
            {contact.social.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-11 items-center gap-2 px-4 py-2 border border-[var(--color-paper)]/25 text-sm text-[var(--color-paper)]/75 hover:border-[var(--color-paper)] hover:text-[var(--color-paper)] transition-colors"
              >
                {s.icon === "github" ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                ) : s.icon === "linkedin" ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                ) : (
                  <Mail className="w-4 h-4" aria-hidden="true" />
                )}
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
