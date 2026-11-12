"use client";

import { useRef } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Check,
  Phone,
  ShieldCheck,
  Users,
  Wrench,
  Car,
} from "lucide-react";

import { scrollToId } from "@/lib/services";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */

const PHONE = "80079772";

const CHECKS = [
  "Professional technicians",
  "Advanced diagnostics",
  "Quality workmanship",
  "Customer-focused service",
];

const FEATURES = [
  {
    icon: Activity,
    title: "Engine diagnostics",
    text: "Advanced diagnostic tools to accurately identify and resolve your vehicle’s problems.",
  },
  {
    icon: BadgeCheck,
    title: "Certified technicians",
    text: "Highly trained technicians with years of hands-on experience on every make.",
  },
  {
    icon: Wrench,
    title: "Modern equipment",
    text: "State-of-the-art tools that make every repair faster, cleaner and more reliable.",
  },
  {
    icon: Car,
    title: "Complete vehicle care",
    text: "Comprehensive repair and maintenance to keep your vehicle running safely.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const stackV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const riseV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]";

/* ---------------------------------------------------------
   COMPONENT
--------------------------------------------------------- */

interface AboutSectionProps {
  onBook?: (service?: string) => void;
  /** path of the garage photo inside /public */
  image?: string;
}

export default function AboutSection({
  onBook,
  image = "/about-garage.webp",
}: AboutSectionProps) {
  const reduce = useReducedMotion();
  const imgBox = useRef<HTMLDivElement>(null);

  // gentle parallax inside the photo frame
  const { scrollYProgress } = useScroll({
    target: imgBox,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="about"
        className="w-full scroll-mt-32 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* ===================================================
              PART 1 — ABOUT
          =================================================== */}
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            {/* ---------- PHOTO ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative mx-auto w-full max-w-[600px] pb-6 pl-0 lg:mx-0 lg:pl-4"
            >
              {/* offset frame */}
              <div
                aria-hidden="true"
                className="absolute inset-y-6 right-0 left-6 -z-0 translate-x-4 translate-y-4 rounded-3xl bg-[#EAF4FC] lg:left-10"
              />

              <div
                ref={imgBox}
                className="relative aspect-[5/5.4] w-full overflow-hidden rounded-3xl bg-slate-200 shadow-[0_24px_60px_rgba(8,47,89,0.18)]"
              >
                <motion.img
                  src={image}
                  alt="Technicians working inside the Ritz Auto Care workshop"
                  loading="lazy"
                  draggable={false}
                  style={{ y: reduce ? 0 : parallaxY, scale: 1.15 }}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#082F59]/85 via-[#082F59]/10 to-transparent" />

                {/* caption */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                    Driven by excellence.
                  </h3>
                  <p className="mt-2 max-w-[360px] text-[14px] leading-relaxed text-white/80">
                    Every vehicle that enters our workshop gets the same care
                    we would give our own.
                  </p>
                </div>
              </div>

              {/* floating card — top left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 14 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, type: "spring", stiffness: 220, damping: 18 }}
                className="absolute left-0 top-8 z-10 flex items-center gap-3 rounded-xl bg-white py-3 pl-3 pr-5 shadow-[0_14px_36px_rgba(8,47,89,0.18)] sm:-left-2"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF4FC] text-[#0872BB]">
                  <ShieldCheck size={20} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[14px] font-semibold text-[#082F59]">
                    Quality first
                  </span>
                  <span className="block text-[12px] text-slate-500">
                    Every repair double-checked
                  </span>
                </span>
              </motion.div>

              {/* floating card — bottom right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 14 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
                className="absolute -bottom-0 right-2 z-10 flex items-center gap-3 rounded-xl bg-[#0872BB] py-3 pl-3 pr-5 text-white shadow-[0_14px_36px_rgba(8,114,187,0.4)] sm:-right-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                  <Users size={20} />
                </span>
                <span className="leading-tight">
                  <span className="block text-2xl font-semibold">20+</span>
                  <span className="block text-[12px] text-white/80">
                    Expert mechanics
                  </span>
                </span>
              </motion.div>
            </motion.div>

            {/* ---------- TEXT ---------- */}
            <motion.div
              variants={stackV}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span
                variants={riseV}
                className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FC] px-4 py-1.5 text-[13px] font-semibold text-[#0872BB]"
              >
                <Wrench size={14} />
                About Ritz Auto Care
              </motion.span>

              <motion.h2
                variants={riseV}
                className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#082F59] sm:text-4xl lg:text-[44px]"
              >
                More than just car maintenance.
                <span className="block text-[#0872BB]">
                  We care about your drive.
                </span>
              </motion.h2>

              <motion.p
                variants={riseV}
                className="mt-5 max-w-[560px] text-base leading-relaxed text-slate-600"
              >
                Ritz Auto Care delivers professional maintenance and repair
                across Dubai, backed by trained technicians and modern
                diagnostic equipment. We find the real problem and fix it
                properly the first time.
              </motion.p>
              <motion.p
                variants={riseV}
                className="mt-3 max-w-[560px] text-base leading-relaxed text-slate-600"
              >
                From a routine service to a roadside emergency, you get clear
                advice, fair pricing and work you can trust.
              </motion.p>

              {/* CHECKLIST */}
              <motion.ul
                variants={riseV}
                className="mt-8 grid gap-3 sm:grid-cols-2"
              >
                {CHECKS.map((label) => (
                  <li
                    key={label}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0872BB]/50 hover:shadow-[0_10px_24px_rgba(8,47,89,0.08)]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF4FC] text-[#0872BB] transition-colors duration-300 group-hover:bg-[#0872BB] group-hover:text-white">
                      <Check size={15} strokeWidth={3} />
                    </span>
                    <span className="text-[14px] font-semibold text-[#082F59]">
                      {label}
                    </span>
                  </li>
                ))}
              </motion.ul>

              {/* BUTTONS */}
              <motion.div
                variants={riseV}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <motion.button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  whileTap={{ scale: 0.97 }}
                  className={`group inline-flex h-12 items-center gap-2 rounded-md bg-[#0872BB] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#082F59] ${focusRing}`}
                >
                  Get in touch
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>

                <a
                  href={`tel:${PHONE}`}
                  className={`inline-flex h-12 items-center gap-2 rounded-md border border-slate-200 px-5 text-[14px] font-semibold text-[#082F59] transition-colors hover:border-[#0872BB] hover:text-[#0872BB] ${focusRing}`}
                >
                  <Phone size={16} />
                  Call {PHONE}
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ===================================================
              PART 2 — WHY CHOOSE US
          =================================================== */}
          <div className="relative mt-20 overflow-hidden rounded-3xl bg-[#082F59] px-6 py-12 sm:px-12 sm:py-14 lg:mt-28 lg:px-16 lg:py-16">
            {/* subtle dotted texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            {/* header row */}
            <motion.div
              variants={stackV}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-[560px]">
                <motion.span
                  variants={riseV}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white"
                >
                  <BadgeCheck size={14} />
                  Why choose us
                </motion.span>
                <motion.h2
                  variants={riseV}
                  className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]"
                >
                  The Ritz Auto Care difference.
                </motion.h2>
              </div>

              <motion.div
                variants={riseV}
                className="max-w-[440px] lg:text-right"
              >
                <p className="text-base leading-relaxed text-white/75">
                  Discover the expertise, technology and commitment that make
                  your satisfaction our priority.
                </p>
                <motion.button
                  type="button"
                  onClick={() => onBook?.()}
                  whileTap={{ scale: 0.97 }}
                  className="group mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-[14px] font-semibold text-[#082F59] transition-colors hover:bg-[#EAF4FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Book a service
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* feature cards */}
            <motion.ul
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <motion.li
                  key={title}
                  variants={riseV}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#3FA9F5]/60 hover:bg-white/[0.10]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0872BB] text-white shadow-[0_10px_24px_rgba(8,114,187,0.45)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon size={22} />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/70">
                    {text}
                  </p>

                  {/* accent line on hover */}
                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#0872BB] to-[#3FA9F5] transition-transform duration-500 group-hover:scale-x-100" />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}