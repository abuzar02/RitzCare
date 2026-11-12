// Positions are in the car model's local space. Edit these when you swap in a different GLB.
export interface Hotspot { id: string; label: string; text: string; pos: [number, number, number]; facing: number }
export const HOTSPOTS: Hotspot[] = [
  { id: "grille", label: "Front Grille", text: "Signature grille with chrome surround and active airflow design.", pos: [0, 0.85, 2.3], facing: 0 },
  { id: "headlights", label: "Headlights", text: "Adaptive LED headlights for sharp visibility day and night.", pos: [0.75, 1.0, 2.2], facing: 0 },
  { id: "bumper", label: "Front Bumper", text: "Reinforced bumper with sensors. We repair and refinish bumpers in-house.", pos: [-0.7, 0.4, 2.3], facing: 0 },
  { id: "wheels", label: "Wheels & Tires", text: "Tire fitting, balancing and alignment by expert technicians.", pos: [1.12, 0.45, 1.4], facing: Math.PI / 2 },
];
