"use client";
import { useEffect, useRef } from "react";

/**
 * Mouse interaction for the hero atmosphere (§5).
 *
 * Two things react to the pointer, both interpolated inside a rAF loop rather
 * than written on pointermove so nothing snaps:
 *
 *   1. this glow, eased hard toward the cursor;
 *   2. --mx/--my on the host, which shifts the aurora and blobs. That pair uses
 *      a much lower easing factor and a small multiplier, so the atmosphere
 *      trails the pointer and settles rather than following it.
 *
 * Skipped entirely on coarse pointers and under reduced motion.
 */
export function HeroCursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    const host = node.parentElement;
    if (!host) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let paraTargetX = 0;
    let paraTargetY = 0;
    let paraX = 0;
    let paraY = 0;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      // Relative to the hero's centre and scaled right down: a few dozen
      // pixels of drift across the whole field, not a cursor-attached layer.
      paraTargetX = (event.clientX - (rect.left + rect.width / 2)) * 0.06;
      paraTargetY = (event.clientY - (rect.top + rect.height / 2)) * 0.06;
      node.classList.add("is-active");
    };

    // Let the atmosphere ease back to rest when the pointer leaves.
    const onLeave = () => {
      node.classList.remove("is-active");
      paraTargetX = 0;
      paraTargetY = 0;
    };

    const tick = () => {
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      node.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;

      paraX += (paraTargetX - paraX) * 0.04;
      paraY += (paraTargetY - paraY) * 0.04;
      host.style.setProperty("--mx", `${paraX.toFixed(1)}px`);
      host.style.setProperty("--my", `${paraY.toFixed(1)}px`);

      frame = requestAnimationFrame(tick);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="hero-cursor-glow" aria-hidden="true" />;
}
