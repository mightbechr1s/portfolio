"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Back-to-top control (§29).
 *
 * It is an anchor to #home rather than a button, so the jump is native: it
 * honours `scroll-margin-top` and the CSS `scroll-behavior`, needs no click
 * handler, works on keyboard Enter, and keeps right-click copy-link.
 * globals.css already flips scroll-behavior to `auto` under reduced motion, so
 * the anchor animates normally and jumps instantly when motion is off.
 *
 * Visibility is the only thing JS does here: hidden until the page is scrolled
 * past a full viewport, so it never competes with the hero CTAs. When JS is
 * absent the button simply stays hidden and the nav logo's #home link covers
 * the same trip.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#home"
      aria-label="Back to top"
      className={`back-to-top${visible ? " is-visible" : ""}`}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </a>
  );
}
