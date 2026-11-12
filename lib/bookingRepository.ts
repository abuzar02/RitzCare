// Data layer: swap this file's implementation to connect another backend.
import { getClient } from "./db";
import type { BookingInput } from "./validation";

export async function saveBooking(b: BookingInput): Promise<string> {
  const c = await getClient();
  const res = await c.db(process.env.MONGODB_DB || "ritz_auto_care").collection("bookings").insertOne({ ...b, status: "new", createdAt: new Date() });
  return res.insertedId.toString();
}
