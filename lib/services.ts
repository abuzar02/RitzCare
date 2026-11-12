export const SERVICE_TYPES = ["Car Service", "Roadside Support", "Battery Replacement", "Tire Replacement", "Service Contract", "Free Inspection", "Other"] as const;
export const TIME_SLOTS = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"] as const;
export const NAV = [
  { label: "Home", id: "home" }, { label: "Services", id: "services" }, { label: "Brands", id: "brands" },
  { label: "Buy Batteries", id: "batteries" }, { label: "Buy Tires", id: "tires" },
  { label: "Service Contract", id: "contract" }, { label: "Support", id: "support" },
];
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
}
