"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, X } from "lucide-react";
import { NAV, scrollToId } from "@/lib/services";

export default function MobileMenu({ open, onClose, onBook }: { open: boolean; onClose: () => void; onBook: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex flex-col bg-navy px-6 py-6 text-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center justify-between">
            <span className="text-lg font-extrabold">Ritz Auto Care</span>
            <button onClick={onClose} aria-label="Close menu" className="rounded-full bg-white/10 p-2"><X size={22} /></button>
          </div>
          <nav className="mt-10 flex flex-1 flex-col gap-2">
            {NAV.map((n, i) => (
              <motion.button key={n.id} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                onClick={() => { onClose(); setTimeout(() => scrollToId(n.id), 250); }} className="border-b border-white/10 py-4 text-left text-2xl font-bold">
                {n.label}
              </motion.button>
            ))}
          </nav>
          <button onClick={() => { onClose(); onBook(); }} className="mb-4 flex items-center justify-center gap-2 rounded-full bg-white py-4 font-bold text-navy"><CalendarDays size={18} /> Book Service</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
