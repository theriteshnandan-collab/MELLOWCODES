"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Top-Tier Brand Reveal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="w-24 h-24 rounded-conquer bg-[#FF5C00] flex items-center justify-center mb-12 shadow-[0_0_100px_rgba(255,92,0,0.3)]"
            >
              <span className="text-white font-black text-3xl">MC</span>
            </motion.div>
            
            <h1 className="text-white font-black text-7xl md:text-[10rem] tracking-tighter uppercase overflow-hidden leading-none text-center"
              style={{ fontFamily: "var(--font-space-grotesk)" }}>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="block italic"
              >
                MELLOW
              </motion.span>
            </h1>
            <h1 className="text-[#FF5C00] font-black text-7xl md:text-[10rem] tracking-tighter uppercase overflow-hidden leading-none mt-[-2vw] text-center"
              style={{ fontFamily: "var(--font-space-grotesk)", WebkitTextStroke: "2px #FF5C00", color: "transparent" }}>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="block"
              >
                STUDIOS
              </motion.span>
            </h1>
          </div>

          {/* Artistic Sketch Animation */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
             <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" stroke="white" strokeWidth="0.3">
                <motion.path 
                  d="M100 100 Q 500 50, 900 100 T 900 900 Q 500 950, 100 900 T 100 100" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M300 300 L700 700 M700 300 L300 700" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                />
                <circle cx="500" cy="500" r="450" strokeDasharray="10 10" stroke="rgba(255,255,255,0.2)" />
             </svg>
          </div>

          {/* Horizontal Progress System */}
          <div className="absolute bottom-20 left-0 w-full px-20">
             <div className="flex justify-between items-end mb-6">
                <div className="flex flex-col gap-2">
                   <span className="text-[#FF5C00] text-[10px] font-black uppercase tracking-[0.5em]">System Boot</span>
                   <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.4em]">Drafting Digital Landscapes...</p>
                </div>
                <p className="text-[#FF5C00] font-black text-[12vw] leading-none opacity-20 tabular-nums" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                   {count}
                </p>
             </div>
             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#FF5C00]"
                  initial={{ width: 0 }}
                  animate={{ width: `${count}%` }}
                />
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
