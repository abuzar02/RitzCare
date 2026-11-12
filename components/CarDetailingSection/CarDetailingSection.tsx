
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CarDetailingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let mm: gsap.MatchMedia | null = null;

    const setupAnimation = () => {
      if (!video.duration || !Number.isFinite(video.duration)) {
        console.error("Video duration not available");
        return;
      }

      // Clean previous animation
      mm?.revert();

      mm = gsap.matchMedia();

      const duration = video.duration;

      // DESKTOP SCROLL ANIMATION
      mm.add("(min-width: 768px)", () => {
        video.pause();
        video.currentTime = 0;

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=300%",

          pin: true,
          scrub: 1.5,

          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const targetTime = self.progress * duration;

            // Update video according to scroll progress
            if (
              Math.abs(video.currentTime - targetTime) > 0.025
            ) {
              video.currentTime = Math.min(
                targetTime,
                duration - 0.01
              );
            }
          },

          onRefresh: (self) => {
            video.currentTime = Math.min(
              self.progress * duration,
              duration - 0.01
            );
          },
        });

        return () => {
          trigger.kill();
          video.pause();
        };
      });

      // MOBILE NORMAL PLAYBACK
      mm.add("(max-width: 767px)", () => {
        video.currentTime = 0;

        video.play().catch((error) => {
          console.warn("Mobile autoplay blocked:", error);
        });

        return () => {
          video.pause();
        };
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    const handleError = () => {
      console.error("Video loading error:", video.error);
    };

    video.addEventListener("loadedmetadata", setupAnimation);
    video.addEventListener("error", handleError);

    // Handle already loaded video
    if (video.readyState >= 1) {
      setupAnimation();
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupAnimation);
      video.removeEventListener("error", handleError);

      mm?.revert();
      mm = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="car-detailing-section"
    >
      <div className="car-detailing-video-wrapper">
        <video
          ref={videoRef}
          className="car-detailing-video"
          src="/Car_detailing.mp4"
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
        />
      </div>
    </section>
  );
}
