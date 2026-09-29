"use client";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { contact } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

/** Collapse whitespace into a single trimmed line and bound it for the mailto payload. */
const toSingleLine = (value: FormDataEntryValue | null, max: number): string =>
  String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);

const labelClass = "block text-xs font-medium text-[var(--color-ink-muted)]";
const hintClass = "text-[var(--color-ink-faint)]";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-glow section-pad relative overflow-hidden px-5 sm:px-6"
    >
      <div className="contact-atmos" aria-hidden="true">
        <div className="contact-atmos-blob contact-atmos-a" />
        <div className="contact-atmos-blob contact-atmos-b" />
      </div>

      <div className="shell relative z-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{contact.badge}</p>
          <h2 className="section-title mt-4 font-bold">{contact.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
            {contact.description}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal delay={60} className="lg:col-span-5">
            <a
              href={`mailto:${contact.email}`}
              className="link-arrow-host group flex min-h-11 items-center gap-2 text-base font-semibold text-[var(--color-accent)] sm:text-lg"
            >
              {contact.email}
              <ArrowUpRight className="link-arrow size-4" aria-hidden="true" />
            </a>
            <p className="mt-2 text-sm text-[var(--color-ink-faint)]">{contact.responseTime}</p>

            <ul className="mt-8 space-y-3" role="list">
              {contact.social.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                const external = social.url.startsWith("http");
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex min-h-11 items-center gap-3 border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)]"
                    >
                      <Icon className="size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                      <span>{social.name}</span>
                      <ArrowUpRight
                        className="ml-auto size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <form
              className="card space-y-5 p-6 sm:p-8"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
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
                window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`;
              }}
              aria-describedby="form-note"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name <span className={hintClass}>(required)</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    maxLength={80}
                    required
                    className="form-field mt-2"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className={hintClass}>(required)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    className="form-field mt-2"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="projectType" className={labelClass}>
                    Project Type <span className={hintClass}>(required)</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="form-field mt-2"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    <option value="Website">Website Development</option>
                    <option value="Business System">Business System</option>
                    <option value="Automation">Automation Solution</option>
                    <option value="Other">Other / Not Sure</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className={labelClass}>
                    Budget Range <span className={hintClass}>(optional)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="form-field mt-2"
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
                <label htmlFor="message" className={labelClass}>
                  Tell me about your project <span className={hintClass}>(required)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={2000}
                  required
                  className="form-field mt-2 resize-y"
                  placeholder="What problem do you need solved?"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center">
                <Send className="size-4" aria-hidden="true" />
                Continue in email
              </button>

              <p id="form-note" className="text-xs leading-relaxed text-[var(--color-ink-faint)]">
                This opens a draft in your email application for you to review and send. Nothing is
                stored on this site.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
