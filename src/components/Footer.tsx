import { ArrowUpRight, Mail } from "lucide-react";
import { contact, footer } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/mightbechr1s", Icon: GithubIcon },
  { name: "LinkedIn", url: "https://linkedin.com/in/cw-webster-ba7266425", Icon: LinkedinIcon },
  { name: "Email", url: `mailto:${contact.email}`, Icon: Mail },
];

const sectionLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#tech", label: "Tech" },
  { href: "#education", label: "Education" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="shell pt-16 pb-10">
        <div className="grid items-end gap-6 sm:grid-cols-12">
          <p className="text-3xl font-bold tracking-tight sm:col-span-9 sm:text-5xl">
            {footer.cta}
          </p>
          <a
            href="#contact"
            className="btn btn-primary justify-center sm:col-span-3"
          >
            Start a conversation
            <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-[var(--color-line)] pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-[var(--color-ink-faint)]">{footer.text}</p>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center text-xs text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-accent)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ul className="flex items-center gap-2" role="list">
            {socialLinks.map(({ name, url, Icon }) => {
              const external = url.startsWith("http");
              return (
                <li key={name}>
                  <a
                    href={url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex size-11 items-center justify-center border border-[var(--color-line)] text-[var(--color-ink-faint)] transition-colors hover:border-[var(--color-line-strong)] hover:text-[var(--color-accent)]"
                    aria-label={`Chris on ${name}`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
