"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X, AlertCircle } from "lucide-react";
import { SERVICE_TYPES, TIME_SLOTS } from "@/lib/services";
import { emptyBooking, validateBooking, type BookingErrors, type BookingInput } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";
const input = "w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/20";

export default function BookingModal({ open, onClose, initialService }: { open: boolean; onClose: () => void; initialService?: string }) {
  const [form, setForm] = useState<BookingInput>(emptyBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (open) {
      setStatus("idle"); setErrors({}); setServerError("");
      setForm({ ...emptyBooking, serviceType: initialService && (SERVICE_TYPES as readonly string[]).includes(initialService) ? initialService : "" });
    }
  }, [open, initialService]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, onClose]);

  const set = (k: keyof BookingInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateBooking(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus("submitting"); setServerError("");
    try {
      const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setStatus("success"); return; }          // success ONLY when the server confirms the save
      if (data.errors) setErrors(data.errors);
      setServerError(data.error || "Something went wrong. Please try again."); setStatus("error");
    } catch { setServerError("Network error. Please check your connection and try again."); setStatus("error"); }
  }

  const F = ({ k, label, children }: { k: keyof BookingInput; label: string; children: React.ReactNode }) => (
    <label className="block text-xs font-semibold text-navy">{label}
      <div className="mt-1">{children}</div>
      {errors[k] && <span className="mt-1 block text-[11px] font-medium text-red-600">{errors[k]}</span>}
    </label>
  );
  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div role="dialog" aria-modal="true" aria-label="Book a service" initial={{ y: 60, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8">
            <div className="flex items-start justify-between">
              <div><h2 className="text-xl font-extrabold text-navy">Book Service</h2><p className="text-sm text-navy/60">Tell us about your vehicle and we will confirm your slot.</p></div>
              <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-navy hover:bg-navy/5"><X size={20} /></button>
            </div>

            {status === "success" ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto text-emerald-500" size={56} />
                <h3 className="mt-4 text-lg font-extrabold text-navy">Booking received</h3>
                <p className="mt-1 text-sm text-navy/60">Thank you, {form.fullName.split(" ")[0]}. Our team will contact you to confirm.</p>
                <button onClick={onClose} className="mt-6 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-royal">Close</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
                <F k="fullName" label="Full Name"><input className={input} value={form.fullName} onChange={set("fullName")} autoComplete="name" /></F>
                <F k="phone" label="Phone Number"><input className={input} value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="+971 50 123 4567" /></F>
                <F k="email" label="Email"><input className={input} type="email" value={form.email} onChange={set("email")} autoComplete="email" /></F>
                <F k="serviceType" label="Service Type">
                  <select className={input} value={form.serviceType} onChange={set("serviceType")}><option value="">Select…</option>{SERVICE_TYPES.map((s) => <option key={s}>{s}</option>)}</select>
                </F>
                <F k="vehicleBrand" label="Vehicle Brand"><input className={input} value={form.vehicleBrand} onChange={set("vehicleBrand")} /></F>
                <F k="vehicleModel" label="Vehicle Model"><input className={input} value={form.vehicleModel} onChange={set("vehicleModel")} /></F>
                <F k="preferredDate" label="Preferred Date"><input className={input} type="date" min={today} value={form.preferredDate} onChange={set("preferredDate")} /></F>
                <F k="preferredTime" label="Preferred Time">
                  <select className={input} value={form.preferredTime} onChange={set("preferredTime")}><option value="">Select…</option>{TIME_SLOTS.map((s) => <option key={s}>{s}</option>)}</select>
                </F>
                <div className="sm:col-span-2"><F k="message" label="Additional Message"><textarea className={input} rows={3} value={form.message} onChange={set("message")} maxLength={1000} /></F></div>
                {status === "error" && <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2"><AlertCircle size={18} className="mt-0.5 shrink-0" />{serverError}</div>}
                <button type="submit" disabled={status === "submitting"} className="flex items-center justify-center gap-2 rounded-full bg-navy py-3.5 text-sm font-bold text-white transition hover:bg-royal disabled:opacity-60 sm:col-span-2">
                  {status === "submitting" ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : "Submit Booking"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
