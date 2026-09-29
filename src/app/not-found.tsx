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
        <p className="eyebrow">404</p>
        <h1 className="section-title mt-4 font-bold">Page not found.</h1>
        <p className="mt-5 mx-auto max-w-md text-sm sm:text-base text-[var(--color-ink-muted)] leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <a href={site.url} className="btn btn-primary mt-8">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </a>
      </div>
    </section>
  );
}