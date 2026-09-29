"use client";
import { useEffect } from "react";

/**
 * Subtle screenshot parallax (§22).
 *
 * One listener on the whole section, not one per card. Pointer coordinates are
 * stored and read on the next frame, and only the card currently hovered is
 * touched, so a mouse sweep across the grid costs two style writes rather than
 * one per card (§38).
 *
 * The offset is written as two custom properties the stylesheet consumes via
 * transform, keeping the image on the compositor (§36). Touch and reduced
 * motion get nothing at all, so the two devices that cannot hover and the
 * users who asked for stillness are not shipped a feature that cannot work.
 */
export function ProjectParallax() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MAX = 5; // px, per §22
    let card: HTMLElement | null = null;
    let frame = 0;
    let nx = 0;
    let ny = 0;

    const apply = () => {
      frame = 0;
      if (!card) return;
      card.style.setProperty("--px", `${(nx * MAX).toFixed(2)}px`);
      card.style.setProperty("--py", `${(ny * MAX).toFixed(2)}px`);
    };

    const onMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const next = target?.closest<HTMLElement>(".project-card") ?? null;
      if (next !== card) {
        // Reset the card being left so it settles back before the next hover.
        if (card) {
          card.style.setProperty("--px", "0px");
          card.style.setProperty("--py", "0px");
        }
        card = next;
      }
      if (!card) return;
      const rect = card.getBoundingClientRect();
      nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (card) {
        card.style.setProperty("--px", "0px");
        card.style.setProperty("--py", "0px");
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
