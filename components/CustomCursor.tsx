"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Intelligent contrast detection:
      // We check if the cursor is over an element that belongs to the Footer (Orange BG)
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const isOverOrange = element.closest('#contact') || element.closest('.bg-\\[\\#FF5C00\\]');
        setIsWhiteTheme(!!isOverOrange);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border transition-colors duration-500"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isWhiteTheme ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 92, 0, 0.3)",
        }}
      />
      
      {/* Thick Dot Core */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full transition-colors duration-500"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isWhiteTheme ? "#FFFFFF" : "#FF5C00",
          boxShadow: isWhiteTheme 
            ? "0 0 15px rgba(255, 255, 255, 0.5)" 
            : "0 0 15px rgba(255, 92, 0, 0.5)",
        }}
      />
    </div>
  );
}
