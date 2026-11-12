"use client";

import { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "./services.data";

interface ServiceCardProps {
  service: Service;
  /** used only to stagger the entrance animation */
  index?: number;
  /** kept for backward compatibility (not used) */
  total?: number;
  onBook: (service?: string) => void;
}

/* -------------------------------------------
   Brand palette (matches Header)
   Navy  : #082F59
   Blue  : #0872BB
   Sky   : #3FA9F5
   Tint  : #EAF4FC
------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Hover choreography: the <article> owns "rest" / "hover" and every
   child that declares those keys animates together with it. */
const cardV: Variants = {
  rest: {
    y: 0,
    borderColor: "rgba(226,232,240,1)",
    boxShadow: "0 1px 2px rgba(8,47,89,0.04)",
    transition: { duration: 0.35, ease: EASE },
  },
  hover: {
    y: -8,
    borderColor: "rgba(8,114,187,0.45)",
    boxShadow: "0 28px 56px rgba(8,47,89,0.16)",
    transition: { duration: 0.35, ease: EASE },
  },
};

const imageV: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.8, ease: EASE } },
};

const shadeV: Variants = {
  rest: { opacity: 0.55 },
  hover: { opacity: 1, transition: { duration: 0.4 } },
};

const chipV: Variants = {
  rest: { y: 0, rotate: 0, scale: 1 },
  hover: {
    y: -5,
    rotate: -6,
    scale: 1.06,
    transition: { type: "spring", stiffness: 320, damping: 16 },
  },
};

const lineV: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.5, ease: EASE } },
};

const arrowBtnV: Variants = {
  rest: { backgroundColor: "#EAF4FC", color: "#0872BB" },
  hover: {
    backgroundColor: "#0872BB",
    color: "#FFFFFF",
    transition: { duration: 0.25 },
  },
};

const arrowV: Variants = {
  rest: { x: 0, y: 0 },
  hover: {
    x: 2,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 14 },
  },
};

const labelV: Variants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.3, ease: EASE } },
};

/* forwardRef is required so AnimatePresence (mode="popLayout")
   can measure the card when filtering. */
const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  function ServiceCard({ service, index = 0, onBook }, ref) {
    const Icon = service.icon;

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{
          duration: 0.6,
          ease: EASE,
          delay: (index % 3) * 0.1,
          layout: { duration: 0.45, ease: EASE },
        }}
        className="h-full"
      >
        <motion.article
          variants={cardV}
          initial="rest"
          animate="rest"
          whileHover="hover"
          className="service-card relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white"
        >
          {/* IMAGE + CHIP */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <motion.img
                variants={imageV}
                src={service.image}
                alt={service.title}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
              />

              {/* bottom shade for depth */}
              <motion.div
                variants={shadeV}
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#082F59]/60 via-[#082F59]/5 to-transparent"
              />

              {/* category badge */}
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-[#082F59] shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0872BB]" />
                {service.category}
              </span>
            </div>

            {/* ICON CHIP — sits on the image edge, outside the clipped box */}
            <motion.div
              variants={chipV}
              className="absolute -bottom-7 left-6 z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0872BB] to-[#082F59] text-white shadow-[0_10px_24px_rgba(8,114,187,0.45)] ring-4 ring-white"
            >
              <Icon size={24} strokeWidth={1.8} />
            </motion.div>
          </div>

          {/* BODY */}
          <div className="flex flex-1 flex-col px-6 pb-6 pt-11">
            <h3 className="text-xl font-semibold leading-snug tracking-tight text-[#082F59]">
              {service.title}
            </h3>

            <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-slate-600">
              {service.description}
            </p>

            {/* FOOTER */}
            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={() => onBook(service.title)}
                className="flex w-full items-center justify-between border-t border-slate-100 pt-4 text-left text-[14px] font-semibold text-[#082F59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0872BB]"
              >
                <motion.span variants={labelV}>Book this service</motion.span>

                <motion.span
                  variants={arrowBtnV}
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <motion.span variants={arrowV} className="flex">
                    <ArrowUpRight size={18} />
                  </motion.span>
                </motion.span>
              </button>
            </div>
          </div>

          {/* ACCENT LINE — draws across on hover */}
          <motion.span
            variants={lineV}
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-[#0872BB] to-[#3FA9F5]"
          />
        </motion.article>
      </motion.div>
    );
  }
);

export default ServiceCard;