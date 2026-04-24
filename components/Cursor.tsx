"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot   = dotRef.current!;
    const ring  = ringRef.current!;
    const trail = trailRef.current!;

    // QuickTo for high-performance tracking
    const dotX  = gsap.quickTo(dot,   "x", { duration: 0.15, ease: "power3" });
    const dotY  = gsap.quickTo(dot,   "y", { duration: 0.15, ease: "power3" });
    const ringX = gsap.quickTo(ring,  "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring,  "y", { duration: 0.55, ease: "power3" });
    const trailX= gsap.quickTo(trail, "x", { duration: 1.1,  ease: "power3" });
    const trailY= gsap.quickTo(trail, "y", { duration: 1.1,  ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      trailX(e.clientX);
      trailY(e.clientY);
    };

    // Magnetic expand on interactive elements
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      gsap.to(ring, { scale: 2.5, opacity: 0.3, duration: 0.4, ease: "power2.out" });
      gsap.to(dot,  { scale: 0,   opacity: 0,   duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1,   duration: 0.5, ease: "expo.out" });
      gsap.to(dot,  { scale: 1, opacity: 1,   duration: 0.3 });
    };

    // Click pulse
    const onClick = () => {
      gsap.fromTo(ring, { scale: 1.5 }, { scale: 1, duration: 0.5, ease: "expo.out" });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Hide on mouse leave window
    const onLeaveWindow = () => gsap.to([dot, ring, trail], { opacity: 0, duration: 0.3 });
    const onEnterWindow = () => gsap.to([dot, ring, trail], { opacity: 1, duration: 0.3 });
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      targets.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-2 h-2 rounded-full bg-[#FF5C00]" />
      </div>

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-8 h-8 rounded-full border border-[#FF5C00]/60" />
      </div>

      {/* Ghost trail */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-14 h-14 rounded-full bg-[#FF5C00]/5" />
      </div>
    </>
  );
}
