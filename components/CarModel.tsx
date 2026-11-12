"use client";
import { useMemo } from "react";
import { RoundedBox, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PAINT = "#19c5cf";

/** Built-in procedural SUV (no external asset needed). Replace by setting NEXT_PUBLIC_CAR_MODEL_URL to a GLB. */
function ProceduralSUV() {
  const paint = <meshPhysicalMaterial color={PAINT} metalness={0.75} roughness={0.22} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={1.4} />;
  const dark = <meshStandardMaterial color="#0c1220" metalness={0.4} roughness={0.35} />;
  const glass = <meshPhysicalMaterial color="#0a1a2a" metalness={0.9} roughness={0.05} envMapIntensity={1.6} />;
  const chrome = <meshStandardMaterial color="#e8eef2" metalness={1} roughness={0.12} />;
  return (
    <group>
      <RoundedBox args={[2, 0.78, 4.5]} radius={0.2} smoothness={4} position={[0, 0.78, 0]} castShadow>{paint}</RoundedBox>
      <RoundedBox args={[1.82, 0.72, 2.7]} radius={0.22} smoothness={4} position={[0, 1.5, -0.35]} castShadow>{paint}</RoundedBox>
      <RoundedBox args={[1.86, 0.46, 2.74]} radius={0.12} smoothness={4} position={[0, 1.5, -0.35]}>{glass}</RoundedBox>
      <RoundedBox args={[1.8, 0.09, 2.6]} radius={0.04} position={[0, 1.88, -0.35]}>{paint}</RoundedBox>
      {/* front */}
      <RoundedBox args={[1.0, 0.34, 0.08]} radius={0.04} position={[0, 0.88, 2.26]}>{dark}</RoundedBox>
      <RoundedBox args={[1.12, 0.42, 0.04]} radius={0.05} position={[0, 0.88, 2.24]}>{chrome}</RoundedBox>
      {[-1, 1].map((s) => (
        <group key={s}>
          <RoundedBox args={[0.5, 0.17, 0.08]} radius={0.05} position={[s * 0.72, 1.03, 2.24]}><meshStandardMaterial color="#fff" emissive="#dffaff" emissiveIntensity={1.6} /></RoundedBox>
          <RoundedBox args={[0.4, 0.14, 0.08]} radius={0.05} position={[s * 0.75, 1.0, -2.24]}><meshStandardMaterial color="#ff2a3a" emissive="#ff1020" emissiveIntensity={1.2} /></RoundedBox>
          {[1.45, -1.45].map((z) => (
            <group key={z} position={[s * 1.0, 0.46, z]} rotation={[0, 0, Math.PI / 2]}>
              <mesh castShadow><cylinderGeometry args={[0.47, 0.47, 0.34, 32]} />{dark}</mesh>
              <mesh position={[0, s * 0.18, 0]}><cylinderGeometry args={[0.31, 0.31, 0.02, 24]} />{chrome}</mesh>
            </group>
          ))}
        </group>
      ))}
      <RoundedBox args={[1.96, 0.3, 0.3]} radius={0.1} position={[0, 0.42, 2.18]}>{dark}</RoundedBox>
      <RoundedBox args={[1.96, 0.3, 0.3]} radius={0.1} position={[0, 0.42, -2.18]}>{dark}</RoundedBox>
    </group>
  );
}

function GLBCar({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const size = box.getSize(new THREE.Vector3());
    const s = 4.5 / Math.max(size.x, size.z);
    c.scale.setScalar(s);
    const b2 = new THREE.Box3().setFromObject(c);
    const ctr = b2.getCenter(new THREE.Vector3());
    c.position.set(-ctr.x, -b2.min.y, -ctr.z);
    c.traverse((o) => { if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = true; });
    return c;
  }, [scene]);
  return <primitive object={model} />;
}

export default function CarModel() {
  const url = process.env.NEXT_PUBLIC_CAR_MODEL_URL;
  return url ? <GLBCar url={url} /> : <ProceduralSUV />;
}
