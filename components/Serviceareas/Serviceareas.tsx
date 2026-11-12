"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  MapPin,
  Phone,
  Search,
  X,
} from "lucide-react";

/* ---------------------------------------------------------
   DATA — edit regions / areas to match what you really cover
--------------------------------------------------------- */

const REGIONS: Record<string, string[]> = {
  "Central Dubai": [
    "Al Jaddaf",
    "Al Quoz",
    "Al Quoz 1",
    "Al Quoz 2",
    "Al Quoz 3",
    "Al Safa",
    "Al Satwa",
    "Al Wasl",
    "Business Bay",
    "City Walk",
    "DIFC",
    "Downtown Dubai",
    "Dubai Creek Harbour",
    "Dubai Design District",
    "Dubai Healthcare City",
    "Jumeirah",
    "Karama",
    "La Mer",
    "Oud Metha",
    "Ras Al Khor",
    "Umm Suqeim",
    "Zabeel",
  ],
  "Marina & Al Barsha": [
    "Al Barsha",
    "Al Barsha 1",
    "Al Barsha 2",
    "Al Barsha 3",
    "Al Barsha South",
    "Al Furjan",
    "Al Sufouh",
    "Barsha Heights",
    "Discovery Gardens",
    "Dubai Marina",
    "Emirates Hills",
    "JBR",
    "JLT",
    "Jumeirah Golf Estates",
    "Palm Jumeirah",
    "The Greens",
    "The Lakes",
    "The Springs",
  ],
  "Dubailand & South": [
    "Al Barari",
    "Arabian Ranches",
    "Damac Hills",
    "Damac Hills 2",
    "Damac Lagoons",
    "Dubai Hills",
    "Dubai Production City",
    "Dubai Silicon Oasis",
    "Dubai South",
    "Dubai Sports City",
    "Dubai Studio City",
    "International City",
    "Jumeirah Village Circle",
    "Jumeirah Village Triangle",
    "Liwan",
    "Town Square",
  ],
  "Deira & East Dubai": [
    "Al Awir",
    "Al Mizhar",
    "Al Nahda",
    "Al Qusais",
    "Al Twar",
    "Al Warqa",
    "Deira",
    "Dubai Festival City",
    "Mirdif",
    "Muhaisnah",
    "Nad Al Hamar",
    "Nad Al Sheba",
    "Warsan",
  ],
};

const ALL = "All areas";
const TABS = [ALL, ...Object.keys(REGIONS)];

const AREAS: string[] = Object.values(REGIONS)
  .flat()
  .sort((a, b) => a.localeCompare(b));

const POPULAR = [
  "Dubai Marina",
  "Palm Jumeirah",
  "JLT",
  "Dubai Hills",
  "Jumeirah",
  "Al Barsha",
  "Business Bay",
  "Downtown Dubai",
  "DIFC",
  "Mirdif",
];

const PHONE = "80079772";
const EASE = [0.22, 1, 0.36, 1] as const;

const heroV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const heroItemV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const gridV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.012 } },
};

const cellV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]";

/* ---------------------------------------------------------
   COMPONENT
--------------------------------------------------------- */

interface ServiceAreasProps {
  onBook?: (service?: string) => void;
}

export default function ServiceAreas({ onBook }: ServiceAreasProps) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<string>(ALL);
  const [selected, setSelected] = useState<string | null>(null);

  const list = useMemo(() => {
    const base =
      tab === ALL
        ? AREAS
        : [...REGIONS[tab]].sort((a, b) => a.localeCompare(b));
    const q = query.trim().toLowerCase();
    return q ? base.filter((a) => a.toLowerCase().includes(q)) : base;
  }, [tab, query]);

  const toggleArea = (area: string) =>
    setSelected((cur) => (cur === area ? null : area));

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value) setTab(ALL); // search always looks through every region
  };

  const stats = [
    {
      icon: MapPin,
      value: `${Math.floor(AREAS.length / 10) * 10}+`,
      label: "Areas covered",
    },
    { icon: BadgeCheck, value: "Free", label: "Vehicle inspection" },
    { icon: CalendarDays, value: "7 days", label: "Open every week" },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="areas"
        className="w-full scroll-mt-32 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* ================= HERO PANEL ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-[#082F59] px-6 pb-24 pt-12 sm:px-12 sm:pt-14 lg:px-16 lg:pb-28 lg:pt-16">
            {/* subtle dotted "map" texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            <motion.div
              variants={heroV}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* heading */}
              <div>
                <motion.span
                  variants={heroItemV}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white"
                >
                  <MapPin size={14} />
                  Service areas
                </motion.span>

                <motion.h2
                  variants={heroItemV}
                  className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[46px]"
                >
                  Wherever you are in Dubai, we come to you.
                </motion.h2>

                <motion.p
                  variants={heroItemV}
                  className="mt-4 max-w-[500px] text-base leading-relaxed text-white/75"
                >
                  Professional car repair, maintenance and roadside assistance
                  across Dubai. Search your area to check coverage and book in
                  a minute.
                </motion.p>
              </div>

              {/* search + popular */}
              <motion.div variants={heroItemV}>
                <label htmlFor="area-search" className="sr-only">
                  Search your area
                </label>
                <div className="flex h-14 items-center gap-3 rounded-xl bg-white px-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)] ring-2 ring-transparent transition focus-within:ring-[#3FA9F5]">
                  <Search size={20} className="shrink-0 text-[#0872BB]" />
                  <input
                    id="area-search"
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search your area, e.g. Business Bay"
                    autoComplete="off"
                    className="w-full min-w-0 bg-transparent text-[15px] text-[#082F59] outline-none placeholder:text-slate-400"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 ${focusRing}`}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <p className="mt-5 text-[13px] font-medium text-white/60">
                  Popular areas
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {POPULAR.map((area) => {
                    const active = selected === area;
                    return (
                      <motion.button
                        key={area}
                        type="button"
                        onClick={() => toggleArea(area)}
                        aria-pressed={active}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                          active
                            ? "bg-white text-[#082F59]"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {active && <Check size={13} />}
                        {area}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ================= STATS STRIP (overlaps panel) ================= */}
          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative z-10 mx-4 -mt-12 grid divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(8,47,89,0.12)] sm:mx-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mx-20"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <li key={label} className="flex items-center gap-4 px-6 py-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF4FC] text-[#0872BB]">
                  <Icon size={22} />
                </span>
                <span className="leading-tight">
                  <span className="block text-2xl font-semibold tracking-tight text-[#082F59]">
                    {value}
                  </span>
                  <span className="mt-0.5 block text-[14px] text-slate-600">
                    {label}
                  </span>
                </span>
              </li>
            ))}
          </motion.ul>

          {/* ================= REGION TABS ================= */}
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="group"
              aria-label="Filter areas by region"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map((name) => {
                const active = tab === name && !query;
                const count =
                  name === ALL ? AREAS.length : REGIONS[name].length;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setTab(name);
                      setQuery("");
                    }}
                    aria-pressed={active}
                    className={`relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[14px] font-medium transition-colors ${focusRing} ${
                      active
                        ? "border-transparent text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#0872BB] hover:text-[#0872BB]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="area-region-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-0 rounded-full bg-[#0872BB]"
                      />
                    )}
                    <span className="relative z-10">
                      {name}
                      <span
                        className={`ml-2 text-[12px] ${
                          active ? "text-white/80" : "text-slate-400"
                        }`}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <p
              className="shrink-0 text-[13px] text-slate-500"
              aria-live="polite"
            >
              Showing {list.length} of {AREAS.length} areas
            </p>
          </div>

          {/* ================= AREA GRID ================= */}
          <div className="mt-6">
            {list.length > 0 ? (
              <motion.ul
                key={tab}
                variants={gridV}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {list.map((area) => {
                  const active = selected === area;
                  return (
                    <motion.li key={area} variants={cellV}>
                      <button
                        type="button"
                        onClick={() => toggleArea(area)}
                        aria-pressed={active}
                        className={`group flex h-[60px] w-full items-center gap-3 rounded-xl border px-4 text-left transition-all duration-200 ${focusRing} ${
                          active
                            ? "border-[#082F59] bg-[#082F59] text-white shadow-[0_10px_24px_rgba(8,47,89,0.25)]"
                            : "border-slate-200 bg-white text-[#082F59] hover:-translate-y-0.5 hover:border-[#0872BB] hover:shadow-[0_10px_24px_rgba(8,47,89,0.08)]"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            active
                              ? "bg-white/15 text-white"
                              : "bg-[#EAF4FC] text-[#0872BB] group-hover:bg-[#0872BB] group-hover:text-white"
                          }`}
                        >
                          {active ? <Check size={17} /> : <MapPin size={17} />}
                        </span>
                        <span className="text-[14px] font-medium leading-tight">
                          {area}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
                <p className="text-base font-semibold text-[#082F59]">
                  No area matches “{query}”
                </p>
                <p className="mt-1 text-[14px] text-slate-600">
                  We may still reach you. Call us and we will confirm
                  availability for your location.
                </p>
                <a
                  href={`tel:${PHONE}`}
                  className={`mt-4 inline-flex h-11 items-center gap-2 rounded-md bg-[#0872BB] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#082F59] ${focusRing}`}
                >
                  <Phone size={16} />
                  Call {PHONE}
                </a>
              </div>
            )}
          </div>

          {/* ================= FLOATING BOOKING BAR ================= */}
          <div className="pointer-events-none sticky bottom-4 z-30 mt-6 flex justify-center">
            <AnimatePresence>
              {selected && (
                <motion.div
                  key="booking-bar"
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="pointer-events-auto flex w-full max-w-[720px] flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 pl-5 shadow-[0_20px_50px_rgba(8,47,89,0.22)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4FC] text-[#0872BB]">
                      <Check size={20} />
                    </span>
                    <p className="text-[14px] leading-snug text-slate-600">
                      <span className="block font-semibold text-[#082F59]">
                        We serve {selected}
                      </span>
                      Book a technician to your location.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onBook?.(`Service in ${selected}`)}
                      className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#0872BB] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#082F59] sm:flex-none ${focusRing}`}
                    >
                      Book now
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      aria-label="Clear selected area"
                      className={`flex h-11 w-11 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 ${focusRing}`}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ================= BOTTOM CTA ================= */}
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#EAF4FC] px-6 py-7 sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="text-lg font-semibold text-[#082F59]">
                Can’t find your area?
              </p>
              <p className="mt-1 text-[15px] text-slate-600">
                Tell us where your vehicle is and we will confirm if we can
                reach you today.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                onClick={() => onBook?.()}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex h-12 items-center gap-2 rounded-md bg-[#0872BB] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#082F59] ${focusRing}`}
              >
                Get a free quote
                <ArrowRight size={16} />
              </motion.button>

              <a
                href={`tel:${PHONE}`}
                className={`inline-flex h-12 items-center gap-2 rounded-md border border-[#082F59] px-5 text-[14px] font-semibold text-[#082F59] transition-colors hover:bg-[#082F59] hover:text-white ${focusRing}`}
              >
                <Phone size={16} />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}