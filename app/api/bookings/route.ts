import { NextResponse } from "next/server";
import { validateBooking, type BookingInput } from "@/lib/validation";
import { isDbConfigured } from "@/lib/db";
import { saveBooking } from "@/lib/bookingRepository";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Partial<BookingInput>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  const keys: (keyof BookingInput)[] = ["fullName", "phone", "email", "vehicleBrand", "vehicleModel", "serviceType", "preferredDate", "preferredTime", "message"];
  const data = Object.fromEntries(keys.map((k) => [k, String(body[k] ?? "").trim()])) as unknown as BookingInput;
  const errors = validateBooking(data);
  if (Object.keys(errors).length) return NextResponse.json({ error: "Validation failed.", errors }, { status: 422 });
  if (!isDbConfigured()) return NextResponse.json({ error: "Booking service is not configured yet. Please call us or try again later." }, { status: 503 });
  try {
    const id = await saveBooking(data);
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    console.error("Booking save failed:", err);
    return NextResponse.json({ error: "Could not save your booking. Please try again." }, { status: 500 });
  }
}
