"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight, ChevronsLeftRight, Images } from "lucide-react";

/* ---------------------------------------------------------
   DATA — replace the image paths with your own (inside /public)
--------------------------------------------------------- */

const WORKS = [
  {
    tag: "Detailing",
    title: "Paint correction",
    text: "Swirl marks and scratches removed to bring back a deep, glossy finish.",
    before: "/Before.png",
    after: "/After.png",
  },
  {
    tag: "Restoration",
    title: "Headlight restoration",
    text: "Yellowed, hazy lenses polished back to clear for safer night driving.",
    before: "/Damaged-before.png",
    after: "/Restored-after.png",
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
   BEFORE / AFTER SLIDER
--------------------------------------------------------- */

function BeforeAfter({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const [pos, setPos] = useState(50);

  const inView = useInView(box, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  // One-time nudge so people notice the slider is interactive
  useEffect(() => {
    if (!inView || reduce) return;

    let back: { stop: () => void } | undefined;
    const out = animate(50, 32, {
      duration: 0.8,
      delay: 0.4,
      ease: EASE,
      onUpdate: (v) => !touched.current && setPos(v),
      onComplete: () => {
        back = animate(32, 50, {
          duration: 0.8,
          ease: EASE,
          onUpdate: (v) => !touched.current && setPos(v),
        });
      },
    });

    return () => {
      out.stop();
      back?.stop();
    };
  }, [inView, reduce]);

  const moveTo = (clientX: number) => {
    const el = box.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 15 : 5;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    touched.current = true;
    e.preventDefault();
  };

  return (
    <div
      ref={box}
      role="slider"
      tabIndex={0}
      aria-label={`${label}: drag to compare before and after`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onKeyDown={onKeyDown}
      onPointerDown={(e) => {
        touched.current = true;
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className={`relative aspect-[4/3] w-full cursor-ew-resize select-none touch-pan-y overflow-hidden bg-slate-200 ${focusRing} focus-visible:-outline-offset-2`}
    >
      {/* BEFORE (base layer) */}
      <img
        src={before}
        alt={`${label} — before`}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* AFTER (clipped from the handle to the right edge) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img
          src={after}
          alt={`${label} — after`}
          draggable={false}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* LABELS */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-[#082F59] shadow-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#0872BB] px-3 py-1 text-[12px] font-semibold text-white shadow-sm">
        After
      </span>

      {/* HANDLE */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#0872BB] text-white shadow-[0_8px_20px_rgba(8,47,89,0.35)]">
          <ChevronsLeftRight size={20} />
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   SECTION
--------------------------------------------------------- */

interface WorkGalleryProps {
  onBook?: (service?: string) => void;
  /** where the "View full gallery" button goes */
  galleryHref?: string;
}

export default function WorkGallery({
  onBook,
  galleryHref = "/gallery",
}: WorkGalleryProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="gallery"
        className="w-full scroll-mt-32 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* ============ HEADER ROW ============ */}
          <motion.div
            variants={stackV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[640px]">
              <motion.span
                variants={riseV}
                className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FC] px-4 py-1.5 text-[13px] font-semibold text-[#0872BB]"
              >
                <Images size={14} />
                Our work
              </motion.span>

              <motion.h2
                variants={riseV}
                className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#082F59] sm:text-4xl lg:text-[44px]"
              >
                Visible results.
                <span className="block text-[#0872BB]">
                  Real transformations.
                </span>
              </motion.h2>

              <motion.p
                variants={riseV}
                className="mt-4 text-base leading-relaxed text-slate-600"
              >
                Real before-and-after results from diagnostics, detailing and
                car restoration. Drag the slider on each photo to see the
                difference we make.
              </motion.p>
            </div>

            <motion.div variants={riseV}>
              <a
                href={galleryHref}
                className={`group inline-flex h-12 items-center gap-2 rounded-md border border-[#082F59] px-6 text-[14px] font-semibold text-[#082F59] transition-colors duration-300 hover:bg-[#082F59] hover:text-white ${focusRing}`}
              >
                View full gallery
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* ============ SLIDER CARDS ============ */}
          <motion.ul
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid gap-6 md:grid-cols-2"
          >
            {WORKS.map((work) => (
              <motion.li
                key={work.title}
                variants={riseV}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(8,47,89,0.08)]"
              >
                <BeforeAfter
                  before={work.before}
                  after={work.after}
                  label={work.title}
                />

                <div className="flex items-start justify-between gap-4 px-6 py-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[#082F59]">
                      {work.title}
                    </h3>
                    <p className="mt-1 max-w-[440px] text-[14px] leading-relaxed text-slate-600">
                      {work.text}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#EAF4FC] px-3 py-1 text-[12px] font-semibold text-[#0872BB]">
                    {work.tag}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* ============ BOTTOM CTA ============ */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#EAF4FC] px-6 py-6 sm:flex-row sm:items-center sm:px-8"
          >
            <div>
              <p className="text-lg font-semibold text-[#082F59]">
                Want results like these for your car?
              </p>
              <p className="mt-1 text-[15px] text-slate-600">
                Book a free inspection and we will tell you exactly what your
                vehicle needs.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => onBook?.("Free vehicle inspection")}
              whileTap={{ scale: 0.97 }}
              className={`group inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-[#0872BB] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#082F59] ${focusRing}`}
            >
              Get a free quote
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}