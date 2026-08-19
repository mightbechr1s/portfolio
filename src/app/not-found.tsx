import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { site } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Page Not Found | Chris",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="min-h-[70svh] flex items-center justify-center px-5 sm:px-6 py-24">
      <div className="max-w-xl mx-auto w-full text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-ink-lighter)] mb-5">
          404
        </p>
        <h1 className="section-title font-bold text-[var(--color-ink)]">Page not found.</h1>
        <p className="mt-5 mx-auto max-w-md text-sm sm:text-base text-[var(--color-ink-light)] leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <a
          href={site.url}
          className="mt-8 inline-flex min-h-11 items-center gap-2 px-5 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] text-sm font-semibold hover:opacity-75 active:scale-[0.98] transition-[opacity,transform]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </a>
      </div>
    </section>
  );
}