"use client";
import { useEffect, useRef } from "react";
import { norm, rot, setAngleNearest, setTarget, TAU } from "@/lib/rotationStore";

const P0 = [20, 20], P1 = [180, 66], P2 = [340, 20];
const pt = (t: number) => [(1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0], (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1]];
const VIEWS = [["Front", 0], ["Right", Math.PI / 2], ["Rear", Math.PI], ["Left", (3 * Math.PI) / 2]] as const;

export default function RotationIndicator() {
  const svg = useRef<SVGSVGElement>(null);
  const thumb = useRef<SVGCircleElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const t = norm(rot.angle + Math.PI) / TAU; // front (angle 0) sits in the middle of the track
      const [x, y] = pt(t);
      thumb.current?.setAttribute("cx", String(x));
      thumb.current?.setAttribute("cy", String(y));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const fromPointer = (e: React.PointerEvent) => {
    const r = svg.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 360;
    const t = Math.min(1, Math.max(0, (x - 20) / 320));
    setAngleNearest((t - 0.5) * TAU);
  };

  return (
    <div data-nodrag className="indicator flex flex-col items-center select-none">
      <svg ref={svg} viewBox="0 0 360 80" className="w-[300px] touch-none sm:w-[360px]"
        onPointerDown={(e) => { dragging.current = true; rot.dragging = true; (e.target as Element).setPointerCapture?.(e.pointerId); fromPointer(e); }}
        onPointerMove={(e) => dragging.current && fromPointer(e)}
        onPointerUp={() => { dragging.current = false; rot.dragging = false; rot.idleSince = performance.now(); }}
        onPointerCancel={() => { dragging.current = false; rot.dragging = false; }}>
        <text x="180" y="22" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0b1b4d" fontStyle="italic">360°</text>
        <path d="M20 20 Q180 66 340 20" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="6" strokeLinecap="round" />
        <path d="M20 20 Q180 66 340 20" fill="none" stroke="rgba(11,27,77,.25)" strokeWidth="1.5" strokeLinecap="round" />
        <circle ref={thumb} cx="180" cy="43" r="11" fill="#1d4ed8" stroke="#fff" strokeWidth="4" style={{ cursor: "grab", filter: "drop-shadow(0 4px 8px rgba(29,78,216,.5))" }} />
      </svg>
      <div className="-mt-1 flex gap-2">
        {VIEWS.map(([l, a]) => (
          <button key={l} onClick={() => setTarget(a)} className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold text-navy transition hover:bg-navy hover:text-white">{l}</button>
        ))}
      </div>
    </div>
  );
}
