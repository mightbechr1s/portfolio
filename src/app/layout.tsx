import type { Metadata } from "next";
import { Unbounded, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { PreloaderWrapper } from "@/components/PreloaderWrapper";
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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[var(--color-paper)] text-[var(--color-ink)]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PreloaderWrapper />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
