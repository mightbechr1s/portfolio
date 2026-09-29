import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { CustomCursor } from "@/components/CustomCursor";
import { ProjectParallax } from "@/components/ProjectParallax";
import { ServiceTilt } from "@/components/ServiceTilt";
import { site } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

const description =
  "IT student and developer building practical websites, business systems, and automation tools. Open to freelance work.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
  title: "Chris | IT Student & Developer",
  description,
  keywords: [
    "IT student developer",
    "web developer",
    "business systems",
    "freelance developer Philippines",
    "automation",
    "Next.js developer",
  ],
  openGraph: {
    title: "Chris | IT Student & Developer",
    description,
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? site.url,
    siteName: "Chris | IT Student & Developer",
  },
  twitter: {
    card: "summary",
    title: "Chris | IT Student & Developer",
    description,
  },
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL ?? site.url },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds a class to <html>
    // before React hydrates.
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document as script-enabled so scroll reveals stay hidden until
            observed. Without JS the class is never added and content shows. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
        <ProjectParallax />
        <ServiceTilt />
        <CustomCursor />
      </body>
    </html>
  );
}
