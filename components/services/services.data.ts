
import {
  Wrench,
  Truck,
  BatteryCharging,
  CircleGauge,
  Settings2,
  FileText,
  Snowflake,
  ClipboardCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: "01",
    category: "REPAIR",
    title: "Expert Car Repairs",
    description:
      "Professional repairs to restore your vehicle's performance.",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=85",
    icon: Wrench,
  },
  {
    id: "02",
    category: "ROADSIDE",
    title: "Roadside Assistance",
    description:
      "Reliable support whenever and wherever you need us.",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1000&q=85",
    icon: Truck,
  },
  {
    id: "03",
    category: "BATTERY",
    title: "Battery Services",
    description:
      "Complete battery testing, replacement and maintenance.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
    icon: BatteryCharging,
  },
  {
    id: "04",
    category: "TYRES",
    title: "Tyre & Wheel Care",
    description:
      "Better grip, balanced handling and safer journeys.",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=85",
    icon: CircleGauge,
  },
  {
    id: "05",
    category: "MAINTENANCE",
    title: "Vehicle Maintenance",
    description:
      "Complete preventive care for long-lasting performance.",
    image:
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1000&q=85",
    icon: Settings2,
  },
  {
    id: "06",
    category: "SERVICE CONTRACT",
    title: "Service Contracts",
    description:
      "Smart maintenance plans designed around your vehicle.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85",
    icon: FileText,
  },
  {
    id: "07",
    category: "AC SERVICE",
    title: "Car AC Services",
    description:
      "Stay comfortable with professional AC maintenance.",
    image:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1000&q=85",
    icon: Snowflake,
  },
  {
    id: "08",
    category: "INSPECTION",
    title: "Vehicle Inspection",
    description:
      "Detailed vehicle checks for complete peace of mind.",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85",
    icon: ClipboardCheck,
  },
  {
    id: "09",
    category: "DETAILING",
    title: "Premium Car Detailing",
    description:
      "Restore the beauty of your car inside and out.",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1000&q=85",
    icon: Sparkles,
  },
];
