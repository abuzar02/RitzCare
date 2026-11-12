"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  Phone,
  Mail,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Globe,
} from "lucide-react";

import gsap from "gsap";

import { scrollToId } from "@/lib/services";
import MobileMenu from "./MobileMenu";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */

type NavItem = { label: string; id: string; dropdown?: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "Roadside support", id: "support" },
  { label: "Services", id: "services", dropdown: "services" },
  { label: "Brands", id: "brands", dropdown: "brands" },
  { label: "Car batteries", id: "batteries" },
  { label: "Car tires", id: "tires" },
  { label: "Service contract", id: "contract" },
  { label: "Free vehicle inspection", id: "inspection" },
  { label: "About us", id: "about", dropdown: "about" },
  { label: "Contact us", id: "contact" },
];

const DROPDOWNS: Record<
  string,
  { label: string; description: string; id: string }[]
> = {
  services: [
    {
      label: "Car service",
      description: "Professional automotive maintenance",
      id: "services",
    },
    {
      label: "Battery services",
      description: "Testing, replacement and installation",
      id: "batteries",
    },
    {
      label: "Tire services",
      description: "Complete tire care solutions",
      id: "tires",
    },
    {
      label: "Roadside assistance",
      description: "Reliable emergency vehicle support",
      id: "support",
    },
  ],
  brands: [
    {
      label: "Battery brands",
      description: "Explore our battery manufacturers",
      id: "brands",
    },
    {
      label: "Tire brands",
      description: "Explore our tire manufacturers",
      id: "brands",
    },
  ],
  about: [
    {
      label: "About Ritz Auto Care",
      description: "Learn more about our company",
      id: "about",
    },
    {
      label: "Contact us",
      description: "Connect with our team",
      id: "contact",
    },
  ],
};

const PHONE = "80079772";
const EMAIL = "info@ritzautocare.ae";

/* ---------------------------------------------------------
   COMPONENT
--------------------------------------------------------- */

export default function Header({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null);

  const [menu, setMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeId, setActiveId] = useState("home");
  const [lang, setLang] = useState<"ar" | "en">("en");
  const [search, setSearch] = useState("");

  /* Sticky state + simple scroll-spy for the active nav item */
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 120);
      setActiveDropdown(null);

      let current = "home";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 180) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Escape closes dropdown + mobile menu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Entrance animation.
     fromTo + clearProps guarantees the text always ends up visible,
     even if the animation is interrupted (React strict mode, fast
     refresh, route change). */
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".header-logo",
          { x: -24, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.6, clearProps: "all" }
        )
        .fromTo(
          ".header-top-item",
          { y: 8, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.05,
            duration: 0.4,
            clearProps: "all",
          },
          "-=0.35"
        )
        .fromTo(
          ".header-nav-item",
          { y: 8, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.03,
            duration: 0.3,
            clearProps: "all",
          },
          "-=0.25"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  /* Handlers */
  const handleNavigation = (id: string) => {
    setActiveDropdown(null);
    setMenu(false);
    scrollToId(id);
  };

  const handleBook = () => {
    setActiveDropdown(null);
    setMenu(false);
    onBook();
  };

  const toggleDropdown = (id: string) =>
    setActiveDropdown((cur) => (cur === id ? null : id));

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    handleNavigation("services");
  };

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]";

  return (
    <>
      <header
        ref={root}
        className={`fixed inset-x-0 top-0 z-[9999] w-full bg-white transition-shadow duration-300 ${
          isSticky ? "shadow-[0_4px_20px_rgba(8,47,89,0.12)]" : "shadow-sm"
        }`}
      >
        {/* ================= TOP BAR ================= */}
        <div
          className={`border-b border-slate-100 bg-white transition-[padding] duration-300 ${
            isSticky ? "py-1.5" : "py-3"
          }`}
        >
          <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:gap-6 lg:px-8 xl:px-10">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavigation("home")}
              aria-label="Ritz Auto Care home"
              className={`header-logo flex shrink-0 items-center rounded ${focusRing}`}
            >
              <img
                src="/Rits-Auto-Care-Logo-2-1536x448.webp"
                alt="Ritz Auto Care LLC"
                className={`h-auto object-contain transition-all duration-300 ${
                  isSticky
                    ? "w-[130px] sm:w-[145px] lg:w-[155px]"
                    : "w-[150px] sm:w-[175px] lg:w-[195px]"
                }`}
              />
            </button>

            {/* Contact + search + language (desktop) */}
            <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 lg:flex xl:gap-7">
              {/* Phone */}
              <a
                href={`tel:${PHONE}`}
                className={`header-top-item group flex shrink-0 items-center gap-3 rounded ${focusRing}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4FC] text-[#0872BB] transition-colors group-hover:bg-[#0872BB] group-hover:text-white">
                  <Phone size={17} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[11px] text-slate-500">
                    Call us
                  </span>
                  <span className="block text-[14px] font-semibold text-[#082F59]">
                    {PHONE}
                  </span>
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className={`header-top-item group hidden shrink-0 items-center gap-3 rounded xl:flex ${focusRing}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4FC] text-[#0872BB] transition-colors group-hover:bg-[#0872BB] group-hover:text-white">
                  <Mail size={17} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[11px] text-slate-500">
                    Email us
                  </span>
                  <span className="block text-[14px] font-semibold text-[#082F59]">
                    {EMAIL}
                  </span>
                </span>
              </a>

              {/* Search */}
              <form
                onSubmit={handleSearch}
                role="search"
                className="header-top-item flex h-10 w-full min-w-[150px] max-w-[240px] shrink items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 transition-colors focus-within:border-[#0872BB] focus-within:bg-white"
              >
                <Search size={17} className="shrink-0 text-[#0872BB]" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search services"
                  aria-label="Search website"
                  className="w-full min-w-0 bg-transparent text-[13px] text-[#082F59] outline-none placeholder:text-slate-400"
                />
              </form>

              {/* Language */}
              <div
                className="header-top-item flex shrink-0 items-center gap-2 text-[#082F59]"
                role="group"
                aria-label="Language"
              >
                <Globe size={17} className="text-[#0872BB]" />
                <div className="flex rounded-full bg-slate-100 p-0.5">
                  {(["en", "ar"] as const).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLang(code)}
                      aria-pressed={lang === code}
                      className={`rounded-full px-3 py-1 text-[12px] font-semibold transition-colors ${focusRing} ${
                        lang === code
                          ? "bg-[#082F59] text-white"
                          : "text-[#082F59] hover:text-[#0872BB]"
                      }`}
                    >
                      {code === "en" ? "EN" : "AR"}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleBook}
                className={`header-top-item flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-[#0872BB] px-6 text-[13px] font-bold text-white shadow-sm transition-colors duration-300 hover:bg-[#082F59] ${focusRing}`}
              >
                Get a free quote
              </button>
            </div>

            {/* Mobile / tablet actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={handleBook}
                className={`flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-[#0872BB] px-3.5 text-[12px] font-bold text-white transition-colors hover:bg-[#082F59] ${focusRing}`}
              >
                Free quote
              </button>
            </div>

            {/* Hamburger (visible whenever the nav bar is hidden) */}
            <button
              type="button"
              onClick={() => setMenu(!menu)}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#082F59] text-white xl:hidden ${focusRing}`}
            >
              {menu ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* ================= NAV BAR (xl and up) ================= */}
        <div className="relative hidden w-full bg-[#082F59] xl:block">
          <nav
            aria-label="Main navigation"
            className="mx-auto flex w-full max-w-[1600px] items-stretch justify-between px-6 xl:px-8"
          >
            {NAV_ITEMS.map((item) => {
              const dropdown = item.dropdown ? DROPDOWNS[item.dropdown] : null;
              const isOpen = !!item.dropdown && activeDropdown === item.dropdown;
              const isActive =
                activeId === item.id ||
                (dropdown?.some((d) => d.id === activeId) ?? false);

              return (
                <div
                  key={item.id}
                  className="relative flex shrink-0 items-stretch"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.dropdown)
                  }
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      item.dropdown
                        ? toggleDropdown(item.dropdown)
                        : handleNavigation(item.id)
                    }
                    aria-expanded={dropdown ? isOpen : undefined}
                    aria-haspopup={dropdown ? "true" : undefined}
                    aria-current={isActive ? "true" : undefined}
                    className={`header-nav-item relative flex items-center gap-1 whitespace-nowrap px-3 py-3.5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-white/10 2xl:px-4 2xl:text-[14px] ${focusRing} focus-visible:-outline-offset-2 focus-visible:outline-white ${
                      isActive ? "bg-white/10" : ""
                    }`}
                  >
                    {item.label}

                    {dropdown && (
                      <ChevronDown
                        size={14}
                        strokeWidth={2.5}
                        className={`shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}

                    {/* active underline */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-[#3FA9F5] transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {dropdown && (
                    <div
                      className={`absolute left-0 top-full z-[10001] w-[300px] transition-all duration-200 ease-out ${
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-b-lg border border-t-0 border-slate-100 bg-white shadow-[0_16px_40px_rgba(8,47,89,0.18)]">
                        <div className="p-2">
                          {dropdown.map((sub) => (
                            <button
                              key={sub.label}
                              type="button"
                              onClick={() => handleNavigation(sub.id)}
                              className={`group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors hover:bg-[#EFF7FF] ${focusRing}`}
                            >
                              <span>
                                <span className="block text-[14px] font-semibold text-[#082F59] group-hover:text-[#0872BB]">
                                  {sub.label}
                                </span>
                                <span className="mt-0.5 block text-[12px] text-slate-500">
                                  {sub.description}
                                </span>
                              </span>
                              <ArrowRight
                                size={15}
                                className="shrink-0 text-[#0872BB] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      <MobileMenu open={menu} onClose={() => setMenu(false)} onBook={handleBook} />
    </>
  );
}