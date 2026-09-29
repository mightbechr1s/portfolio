"use client";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Magnetic hover for a single CTA (§11).
 *
 * The element leans toward the pointer by at most a few pixels once the
 * pointer is inside a padded hit area, then eases back. The offset is clamped
 * hard because an unmagnified-looking button is the failure mode here: it must
 * read as a response, not as the button chasing the mouse.
 *
 * No state, so no re-render. One rAF per instance runs only while the pointer
 * is nearby, and transform is the only property written (§36).
 */
export function Magnetic({
  children,
  strength = 4,
  className = "",
}: {
  children: ReactNode;
  /** Max pixels of travel on each axis. Keep it 3-6. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let running = false;

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

      const settled = Math.abs(targetX - x) < 0.05 && Math.abs(targetY - y) < 0.05;
      if (settled && targetX === 0 && targetY === 0) {
        node.style.transform = "";
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Range of the pointer that counts as "near": half the button plus a pad.
      const rangeX = rect.width / 2 + 40;
      const rangeY = rect.height / 2 + 28;

      const dx = (event.clientX - cx) / rangeX;
      const dy = (event.clientY - cy) / rangeY;
      const distance = Math.hypot(dx, dy);

      if (distance > 1) {
        targetX = 0;
        targetY = 0;
      } else {
        // Full pull when the pointer is on the button, easing off as it leaves.
        // A falloff that peaks at the boundary would mean hovering the button
        // itself does nothing, which is the one place it must respond.
        const falloff = 1 - distance * 0.4;
        targetX = dx * falloff * strength;
        targetY = dy * falloff * strength;
      }
      start();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
