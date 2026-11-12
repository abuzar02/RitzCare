"use client";
import { useEffect, type RefObject } from "react";
import { dragBy, rot } from "@/lib/rotationStore";

/** Attaches mouse + touch drag-to-rotate (with inertia) to the given element. */
export default function RotationController({ targetRef }: { targetRef: RefObject<HTMLElement> }) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    let x = 0, t = 0, active = false;
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("[data-nodrag]")) return;
      active = true; rot.dragging = true; rot.target = null; rot.vel = 0; x = e.clientX; t = performance.now();
      el.setPointerCapture(e.pointerId); el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!active) return;
      const now = performance.now(), dt = Math.max(0.001, (now - t) / 1000);
      dragBy((e.clientX - x) * 0.012, dt); x = e.clientX; t = now;
    };
    const up = (e: PointerEvent) => {
      if (!active) return;
      active = false; rot.dragging = false; el.style.cursor = "grab";
      if (performance.now() - t > 80) rot.vel = 0; // released after a pause: no fling
      try { el.releasePointerCapture(e.pointerId); } catch {}
    };
    el.style.cursor = "grab"; el.style.touchAction = "pan-y";
    el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
    return () => { el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up); };
  }, [targetRef]);
  return null;
}
