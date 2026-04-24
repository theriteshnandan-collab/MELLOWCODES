"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const leftPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const springLeft = useSpring(leftPosition, { stiffness: 120, damping: 30 });

  return (
    <>
      {/* Main gradient progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[102] origin-left"
        style={{
          scaleX,
          height: "2px",
          background: "linear-gradient(90deg, #FF5C00 0%, #FF8547 50%, #FFAD8F 100%)",
          boxShadow: "0 0 12px rgba(255,92,0,0.5), 0 0 24px rgba(255,92,0,0.2)"
        }}
      />
      {/* Trailing glow dot */}
      <motion.div
        className="fixed top-0 z-[103] w-3 h-3 rounded-full -translate-y-1/2 pointer-events-none"
        style={{
          left: springLeft,
          background: "#FF5C00",
          boxShadow: "0 0 16px rgba(255,92,0,0.8), 0 0 32px rgba(255,92,0,0.4)",
          top: "1px"
        }}
      />
    </>
  );
}
