import { SERVICE_TYPES, TIME_SLOTS } from "./services";
export interface BookingInput {
  fullName: string; phone: string; email: string; vehicleBrand: string; vehicleModel: string;
  serviceType: string; preferredDate: string; preferredTime: string; message: string;
}
export type BookingErrors = Partial<Record<keyof BookingInput, string>>;
export const emptyBooking: BookingInput = { fullName: "", phone: "", email: "", vehicleBrand: "", vehicleModel: "", serviceType: "", preferredDate: "", preferredTime: "", message: "" };

export function validateBooking(b: BookingInput): BookingErrors {
  const e: BookingErrors = {};
  if (b.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  const digits = b.phone.replace(/\D/g, "");
  if (!/^\+?[0-9\s\-()]+$/.test(b.phone.trim()) || digits.length < 8 || digits.length > 15) e.phone = "Enter a valid phone number (8–15 digits).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.email.trim())) e.email = "Enter a valid email address.";
  if (!b.vehicleBrand.trim()) e.vehicleBrand = "Vehicle brand is required.";
  if (!b.vehicleModel.trim()) e.vehicleModel = "Vehicle model is required.";
  if (!(SERVICE_TYPES as readonly string[]).includes(b.serviceType)) e.serviceType = "Select a service type.";
  const d = new Date(b.preferredDate + "T00:00:00");
  const today = new Date(); today.setHours(0, 0, 0, 0);
  if (!b.preferredDate || isNaN(d.getTime())) e.preferredDate = "Choose a preferred date.";
  else if (d < today) e.preferredDate = "Date cannot be in the past.";
  if (!(TIME_SLOTS as readonly string[]).includes(b.preferredTime)) e.preferredTime = "Select a preferred time.";
  if (b.message.length > 1000) e.message = "Message is too long (max 1000 characters).";
  return e;
}
