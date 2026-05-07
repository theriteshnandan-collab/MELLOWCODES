"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Palette, Code, Rocket, X } from "lucide-react";
import Image from "next/image";

const steps = [
  { id: "01", title: "Reconnaissance", desc: "Deep-diving into market gaps and technical feasibility to establish a dominant strike plan.", icon: Search, img: "/images/s1_v2.png" },
  { id: "02", title: "Drafting",        desc: "Bespoke interface sculpting where every pixel follows the logic of a hand-crafted narrative.", icon: Palette, img: "/images/s2_v2.png" },
  { id: "03", title: "Engineering",     desc: "High-fidelity development that translates technical poetry into robust, zero-lag architectures.", icon: Code, img: "/images/s3_v2.png" },
  { id: "04", title: "Launch",          desc: "Absolute market conquest through seamless deployment and strategic performance tuning.", icon: Rocket, img: "/images/s4_v2.png" },
];

const SMOOTH_EASE = [0.19, 1, 0.22, 1] as const;

export default function ProcessGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-fetch selected step to avoid find() overhead during render
  const selectedStep = steps.find(s => s.id === selectedId);

  const handleMouseEnter = (id: string) => {
    if (selectedId) return; // Don't trigger if already open
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setSelectedId(id);
    }, 300); // Specific dwell time per user request
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  return (
    <section id="process" className="py-40 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-24">

        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
          <div className="max-w-[900px]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#FF5C00]" />
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#FF5C00]">The Strike Protocol</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black text-black leading-tight tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Methodical<br />
              <span className="italic text-black/10" style={{ WebkitTextStroke: "1px #0A0A0A" }}>Conquest.</span>
            </h2>
          </div>
          <p className="text-black/60 text-xl md:text-2xl font-light leading-relaxed max-w-sm">
            Four stages of calculated precision to transform raw ideas into digital dominance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.id} className="relative h-full">
              <motion.div
                layoutId={`card-${step.id}`}
                transition={{ duration: 0.8, ease: SMOOTH_EASE as any }}
                className="relative aspect-[3/4] rounded-xl bg-[#FAFAFA] border border-black/5 overflow-hidden transition-shadow duration-700 hover:shadow-2xl cursor-pointer p-8 flex flex-col justify-between"
                onMouseEnter={() => handleMouseEnter(step.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedId(step.id)}
              >
                <div className="flex justify-between items-start relative z-10 px-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#FF5C00] tracking-[0.3em] uppercase opacity-40">Step {step.id}</span>
                    <motion.h3 
                      layoutId={`title-${step.id}`} 
                      className="text-2xl md:text-3xl font-black text-black uppercase leading-none tracking-tighter" 
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {step.title}
                    </motion.h3>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white border border-black/5 flex items-center justify-center text-[#FF5C00] shadow-sm">
                    <step.icon size={16} />
                  </div>
                </div>

                <div className="relative flex-grow flex items-center justify-center my-4">
                  <motion.div 
                    layoutId={`image-${step.id}`} 
                    className="relative w-full h-[75%] z-20"
                  >
                    <Image
                      src={step.img}
                      alt={step.title}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </div>

                <div className="relative z-10 mt-auto px-1">
                   <motion.p layoutId={`desc-${step.id}`} className="text-black/60 text-sm leading-relaxed font-medium">
                      {step.desc}
                   </motion.p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedStep && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div
              layoutId={`card-${selectedId}`}
              transition={{ duration: 0.8, ease: SMOOTH_EASE as any }}
              className="relative w-full max-w-[1200px] h-auto min-h-[600px] rounded-3xl bg-white border border-black/5 overflow-hidden shadow-2xl flex flex-col md:flex-row cursor-default z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-10 right-10 z-50 w-16 h-16 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF5C00] transition-all duration-500 shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="flex-1 p-16 md:p-24 flex flex-col justify-center gap-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#FF5C00]/10 flex items-center justify-center text-[#FF5C00]">
                    <selectedStep.icon size={28} />
                  </div>
                  <span className="text-xl font-black text-black/20 italic tracking-widest">{selectedId}</span>
                </div>
                <motion.h3 
                  layoutId={`title-${selectedId}`} 
                  className="text-5xl md:text-8xl font-black text-black uppercase leading-tight tracking-tighter" 
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {selectedStep.title}
                </motion.h3>
                <motion.p 
                  layoutId={`desc-${selectedId}`} 
                  className="text-black/60 text-2xl md:text-3xl leading-relaxed font-light"
                >
                  {selectedStep.desc}
                </motion.p>
              </div>

              <div className="flex-1 relative flex items-center justify-center p-12 bg-[#FAFAFA]">
                <motion.div 
                  layoutId={`image-${selectedId}`} 
                  className="relative w-full h-[85%] min-h-[400px]"
                >
                  <Image
                    src={selectedStep.img}
                    alt={selectedStep.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
