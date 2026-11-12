"use client";
import { useEffect, useRef } from "react";
import { norm, rot, step, TAU } from "@/lib/rotationStore";

/**
 * Used when WebGL is unavailable.
 * - If NEXT_PUBLIC_CAR_FRAMES_PATTERN is set (e.g. "/car-frames/{i}.webp"), it plays a real image sequence (36–72 frames).
 * - Otherwise it shows a static front illustration (NOT a rotating model).
 */
export default function CarFallback() {
  const img = useRef<HTMLImageElement>(null);
  const pattern = process.env.NEXT_PUBLIC_CAR_FRAMES_PATTERN;
  const count = Number(process.env.NEXT_PUBLIC_CAR_FRAMES_COUNT || 36);

  useEffect(() => {
    if (!pattern) return;
    let raf = 0, last = performance.now();
    for (let i = 0; i < count; i++) new Image().src = pattern.replace("{i}", String(i));
    const loop = (n: number) => {
      step(Math.min((n - last) / 1000, 0.05), true); last = n;
      const i = Math.round((norm(rot.angle) / TAU) * count) % count;
      if (img.current) img.current.src = pattern.replace("{i}", String(i));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pattern, count]);

  if (pattern) return <div className="flex h-full items-center justify-center"><img ref={img} alt="Ritz Auto Care showcase vehicle" className="max-h-full max-w-full object-contain" draggable={false} /></div>;
  return (
    <div className="flex h-full items-center justify-center p-6">
      <svg viewBox="0 0 400 220" className="w-full max-w-xl" role="img" aria-label="Luxury SUV, front view (3D view unavailable)">
        <ellipse cx="200" cy="200" rx="150" ry="10" fill="rgba(11,27,77,.2)" />
        <rect x="70" y="95" width="260" height="85" rx="26" fill="#19c5cf" />
        <path d="M105 95 L125 45 H275 L295 95Z" fill="#19c5cf" /><path d="M120 92 L135 55 H265 L280 92Z" fill="#0a1a2a" />
        <rect x="165" y="125" width="70" height="24" rx="6" fill="#0c1220" />
        <rect x="95" y="118" width="52" height="14" rx="6" fill="#fff" /><rect x="253" y="118" width="52" height="14" rx="6" fill="#fff" />
        <rect x="55" y="140" width="34" height="62" rx="10" fill="#0c1220" /><rect x="311" y="140" width="34" height="62" rx="10" fill="#0c1220" />
      </svg>
    </div>
  );
}
