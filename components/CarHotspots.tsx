"use client";
import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { HOTSPOTS, type Hotspot } from "@/lib/hotspots";
import { rot } from "@/lib/rotationStore";

function Spot({ h, active, onToggle }: { h: Hotspot; active: boolean; onToggle: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  useFrame(() => {
    if (!wrap.current) return;
    const v = Math.cos(h.facing + rot.angle); // camera looks from +z; hide spots on the far side
    const o = Math.max(0, Math.min(1, (v - 0.1) * 4));
    wrap.current.style.opacity = String(o);
    wrap.current.style.pointerEvents = o > 0.5 ? "auto" : "none";
  });
  return (
    <Html position={h.pos} center zIndexRange={[20, 0]}>
      <div ref={wrap} data-nodrag className="relative">
        <div className="spot-pop">
          <button onClick={onToggle} aria-label={h.label} aria-expanded={active}
            className="spot-ring flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-royal text-[13px] font-bold leading-none text-white shadow-lg">{active ? "×" : "+"}</button>
        </div>
        {active && (
          <div className="glass absolute left-8 top-1/2 z-30 w-52 -translate-y-1/2 rounded-2xl p-3 text-navy shadow-xl">
            <p className="text-xs font-extrabold">{h.label}</p>
            <p className="mt-1 text-[11px] leading-snug text-navy/80">{h.text}</p>
          </div>
        )}
      </div>
    </Html>
  );
}

export default function CarHotspots() {
  const [active, setActive] = useState<string | null>(null);
  return <>{HOTSPOTS.map((h) => <Spot key={h.id} h={h} active={active === h.id} onToggle={() => setActive(active === h.id ? null : h.id)} />)}</>;
}
