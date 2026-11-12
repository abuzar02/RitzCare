// Shared, non-reactive rotation state (mutated every frame; no React re-renders).
export const TAU = Math.PI * 2;
export const rot = { angle: 0, vel: 0, dragging: false, target: null as number | null, idleSince: 0 };
export const norm = (a: number) => ((a % TAU) + TAU) % TAU;

function nearest(t: number) {
  let d = norm(t) - norm(rot.angle);
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return rot.angle + d;
}
export function setTarget(t: number) {
  rot.target = nearest(t);
  rot.vel = 0;
  rot.idleSince = performance.now();
}
export function setAngleNearest(t: number) {
  rot.target = null;
  rot.vel = 0;
  rot.angle = nearest(t);
  rot.idleSince = performance.now();
}
export function dragBy(dRad: number, dt: number) {
  rot.target = null;
  rot.angle += dRad;
  if (dt > 0) rot.vel = rot.vel * 0.5 + Math.max(-6, Math.min(6, dRad / dt)) * 0.5;
  rot.idleSince = performance.now();
}
export function step(dt: number, autoRotate: boolean) {
  if (rot.dragging) return;
  const now = performance.now();
  if (rot.target !== null) {
    const d = rot.target - rot.angle;
    rot.angle += d * Math.min(1, dt * 5);
    if (Math.abs(d) < 0.002) { rot.angle = rot.target; rot.target = null; }
    return;
  }
  if (Math.abs(rot.vel) > 0.0005) {
    rot.angle += rot.vel * dt;
    rot.vel *= Math.pow(0.04, dt); // natural inertia
    rot.idleSince = now;
    return;
  }
  rot.vel = 0;
  if (autoRotate && now - rot.idleSince > 2500) rot.angle += 0.25 * dt; // resumes after interaction
}
