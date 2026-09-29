"use client";
import { useEffect, useRef } from "react";

/**
 * Two-layer custom cursor (§8-§14).
 *
 * Structure is two fixed elements: a small accent dot that tracks almost
 * exactly, and a larger ring that eases toward the same target. Both move with
 * transform only (§36), and both live inside one fixed, non-scrolling parent so
 * the browser never has to repaint anything but the two layers.
 *
 * Cost control (§12):
 *   - one rAF loop for the whole site, not one per layer;
 *   - pointermove only stores coordinates, all work happens in the loop (§38);
 *   - no canvas, no SVG filter, no backdrop-filter on the moving elements;
 *   - listeners are delegated from document, so no per-element work.
 *
 * Enhancement only (§14). The native cursor is hidden by adding a class to
 * <html> *after* this component has confirmed a fine pointer exists, so a
 * failure to mount, a touch device, or no-JS all leave the real cursor intact.
 */

type Mode = "default" | "link" | "button" | "card" | "image";

const RING_SIZE: Record<Mode, number> = {
  default: 28,
  link: 45,
  button: 52,
  card: 64,
  image: 46,
};

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Gate every check before touching the DOM: one early return and the whole
    // system is inert, which is the desired behaviour on those devices anyway.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const host = document.documentElement;
    host.classList.add("has-custom-cursor");

    // Target is the true pointer position; the two layers chase it at
    // different rates, which is what produces the trail.
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let mode: Mode = "default";
    let pressed = false;
    let frame = 0;

    const resolveMode = (target: Element | null): Mode => {
      if (!target) return "default";
      const el = target as HTMLElement;
      if (el.closest("[data-cursor-label]")) return "card";
      if (el.closest("img, video, .project-shot")) return "image";
      if (el.closest("button, [role='button'], .btn")) return "button";
      if (el.closest("a, [role='link']")) return "link";
      return "default";
    };

    const applyMode = (next: Mode) => {
      if (next === mode) return;
      mode = next;
      const size = RING_SIZE[next];
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      const labelText =
        next === "card" ? (document.querySelector<HTMLElement>("[data-cursor-label]")?.dataset
          .cursorLabel ?? "") : "";
      label.textContent = labelText;
      host.dataset.cursor = next;
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      applyMode(resolveMode(event.target as Element | null));
    };

    // Leaving the window parks the cursor instead of freezing it mid-air.
    const onLeave = () => {
      targetX = dotX;
      targetY = dotY;
    };

    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };

    const tick = () => {
      // Dot is snappy, ring is slow. Different factors are the entire effect.
      dotX += (targetX - dotX) * 0.55;
      dotY += (targetY - dotY) * 0.55;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;

      dot.style.transform = `translate3d(${dotX.toFixed(1)}px, ${dotY.toFixed(1)}px, 0)`;
      ring.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0)${
        pressed ? " scale(0.88)" : ""
      }`;

      frame = requestAnimationFrame(tick);
    };

    // Seed at the current position so the cursor never animates in from 0,0.
    dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    ring.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(frame);
      host.classList.remove("has-custom-cursor");
      delete host.dataset.cursor;
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
