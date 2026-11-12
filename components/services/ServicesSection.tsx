"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import { services } from "./services.data";
import ServiceCard from "./ServiceCard";

interface ServicesSectionProps {
  onBook: (service?: string) => void;
}

const ALL = "All services";
const EASE = [0.22, 1, 0.36, 1] as const;

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ServicesSection({ onBook }: ServicesSectionProps) {
  const [filter, setFilter] = useState<string>(ALL);

  // Build filter list from the data itself
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(services.map((s) => s.category)))],
    []
  );

  const visible = useMemo(
    () =>
      filter === ALL ? services : services.filter((s) => s.category === filter),
    [filter]
  );

  const hasFilters = categories.length > 2;

  return (
    // "user" = animations are automatically reduced for people who
    // enabled "reduce motion" in their OS settings.
    <MotionConfig reducedMotion="user">
      <section
        id="services"
        className="w-full scroll-mt-32 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* ============ HEADER ROW ============ */}
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <motion.div variants={itemV} className="max-w-[640px]">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#082F59] sm:text-4xl lg:text-[44px]">
                Everything your car needs, under one roof
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                From routine maintenance to emergency roadside support, our
                certified technicians keep your vehicle safe, reliable and
                ready for the road.
              </p>
            </motion.div>

            <motion.div variants={itemV}>
              <motion.button
                type="button"
                onClick={() => onBook()}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="inline-flex h-12 w-fit shrink-0 items-center gap-2.5 rounded-md bg-[#0872BB] px-6 text-[14px] font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-[#082F59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
              >
                Get a free quote
                <motion.span
                  variants={{ hover: { x: 5 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex"
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ============ FILTERS ============ */}
          {hasFilters && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="mt-10 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter services by category"
            >
              {categories.map((cat) => {
                const active = cat === filter;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    aria-pressed={active}
                    className={`relative rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB] ${
                      active
                        ? "border-transparent text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#0872BB] hover:text-[#0872BB]"
                    }`}
                  >
                    {/* sliding pill — glides between chips */}
                    {active && (
                      <motion.span
                        layoutId="service-filter-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-0 rounded-full bg-[#082F59]"
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* ============ GRID ============ */}
          <motion.div
            layout
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
              hasFilters ? "mt-8" : "mt-12"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onBook={onBook}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ============ BOTTOM STRIP ============ */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#EAF4FC] px-6 py-6 sm:flex-row sm:items-center sm:px-8"
          >
            <div>
              <p className="text-lg font-semibold text-[#082F59]">
                Not sure which service you need?
              </p>
              <p className="mt-1 text-[15px] text-slate-600">
                Book a free vehicle inspection and we will recommend what your
                car actually needs.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => onBook("Free vehicle inspection")}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-[#082F59] px-5 text-[14px] font-semibold text-[#082F59] transition-colors duration-300 hover:bg-[#082F59] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
            >
              Book a free inspection
            </motion.button>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}