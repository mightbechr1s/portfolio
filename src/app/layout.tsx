import type { Metadata } from "next";
import { Unbounded, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/data/portfolio";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
  title: "Chris | Solutions Developer for Small Businesses",
  description:
    "I build websites, business systems, and automation tools that save time and grow revenue. Web development, business systems, and IT solutions for Philippine small businesses.",
  keywords: [
    "web developer",
    "business systems",
    "freelance developer Philippines",
    "small business websites",
    "IT solutions",
    "automation",
    "Next.js developer",
  ],
  openGraph: {
    title: "Chris | Solutions Developer for Small Businesses",
    description:
      "I build websites, business systems, and automation tools that save time and grow revenue.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? site.url,
    siteName: "Chris | Solutions Developer",
  },
  twitter: {
    card: "summary",
    title: "Chris | Solutions Developer for Small Businesses",
    description:
      "I build websites, business systems, and automation tools that save time and grow revenue.",
  },
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL ?? site.url },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${unbounded.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[var(--color-paper)] text-[var(--color-ink)]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
