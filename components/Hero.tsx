"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import HeroTypography from "./HeroTypography";
import LoadingScreen from "./LoadingScreen";

const Car3DViewer = dynamic(() => import("./Car3DViewer"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

interface HeroProps {
  onBook: (service?: string) => void;
}

export default function Hero({ onBook }: HeroProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector(".hero-title");
      const subtitle = section.querySelector(".hero-sub");
      const car = section.querySelector(".car-wrap");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Background
      tl.fromTo(section, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 });

      // Main heading (behind car)
      if (title) {
        tl.from(
          title,
          { x: -80, autoAlpha: 0, duration: 1, clearProps: "all" },
          0.25
        );
      }

      // Subtitle (behind car)
      if (subtitle) {
        tl.from(
          subtitle,
          { x: 60, y: 15, autoAlpha: 0, duration: 0.9, clearProps: "all" },
          0.5
        );
      }

      // 3D car entrance (in front of text)
      if (car) {
        tl.from(
          car,
          { y: 100, scale: 0.92, autoAlpha: 0, duration: 1.3, clearProps: "all" },
          0.65
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

 return (
  <section
    id="home"
    ref={root}
    className="hero-bg-layer hero-bg relative isolate flex min-h-[100svh] flex-col overflow-hidden"
  >
    {/* TEXT LAYER — car ke peeche */}
    <HeroTypography />

    {/* CAR LAYER — text ke aage, thoda neeche */}
    <div
      className="
        car-wrap relative z-20 mt-auto
        h-[52vh] min-h-[320px] w-full
        translate-y-[6%]
        sm:h-[58vh] sm:min-h-[380px] sm:translate-y-[8%]
        lg:absolute lg:inset-x-0 lg:-bottom-[6%]
        lg:mt-0 lg:h-[76vh] lg:min-h-[500px] lg:translate-y-0
        xl:h-[80vh]
      "
    >
      <Car3DViewer />
    </div>
  </section>
);
}