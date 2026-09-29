"use client";
import { useEffect } from "react";

/**
 * Pointer-following tilt for the service cards (§22).
 *
 * One delegated listener for the whole section rather than one per card: the
 * pointer only ever rests over a single card, so per-card listeners would do
 * identical work and multiply the listener count by the card count.
 *
 * The listener only runs while the pointer is inside a card, and only writes two
 * custom properties, which the stylesheet feeds into a transform. Nothing here
 * sets React state, so hovering a card never re-renders the section.
 */
export function ServiceTilt() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MAX = 4; // degrees, small enough to read as depth rather than a gimmick
    let card: HTMLElement | null = null;
    let frame = 0;
    let rx = 0;
    let ry = 0;

    const apply = () => {
      frame = 0;
      if (!card) return;
      card.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
    };

    const onMove = (event: PointerEvent) => {
      const next =
        (event.target as HTMLElement | null)?.closest<HTMLElement>(".service-card") ??
        null;
      if (next !== card) {
        if (card) {
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
        }
        card = next;
      }
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      // Card tips away from the pointer, which is what makes the surface look
      // solid rather than like a flat image being stretched.
      rx = -ny * MAX;
      ry = nx * MAX;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (card) {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      }
      card = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
