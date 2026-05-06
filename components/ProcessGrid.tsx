"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Palette, Code, Rocket, X } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    id: "01",
    title: "Reconnaissance",
    desc: "Deep-diving into market gaps and technical feasibility to establish a dominant strike plan.",
    icon: Search,
    img: "/images/s1.png",
  },
  {
    id: "02",
    title: "Drafting",
    desc: "Bespoke interface sculpting where every pixel follows the logic of a hand-crafted narrative.",
    icon: Palette,
    img: "/images/s2.png",
  },
  {
    id: "03",
    title: "Engineering",
    desc: "High-fidelity development that translates technical poetry into robust, zero-lag architectures.",
    icon: Code,
    img: "/images/s3.png",
  },
  {
    id: "04",
    title: "Launch",
    desc: "Absolute market conquest through seamless deployment and strategic performance tuning.",
    icon: Rocket,
    img: "/images/process-main.png",
  },
];

export default function ProcessGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="process" className="py-60 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-32">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-40">
          <div className="max-w-[800px]">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-[#FF5C00]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF5C00]">The Strike Protocol</span>
             </div>
             <h2 className="text-8xl md:text-[10rem] font-black text-black leading-[0.8] tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Methodical<br />
                <span className="italic text-black/5" style={{ WebkitTextStroke: "1px #0A0A0A" }}>Conquest.</span>
             </h2>
          </div>
          <p className="text-black/40 text-2xl font-light leading-relaxed max-w-sm mb-4">
             Four stages of calculated precision to transform raw ideas into digital dominance.
          </p>
        </div>

        {/* Step Grid: Improved Balance */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className="group relative flex flex-col h-full"
            >
              <motion.div 
                layoutId={`card-${step.id}`}
                className="relative aspect-[3/4] rounded-3xl bg-[#FBFBFB] border border-black/5 overflow-hidden transition-all duration-700 shadow-sm hover:shadow-xl cursor-pointer"
                onMouseEnter={() => setSelectedId(step.id)}
              >
                
                {/* Safe Zone Wrapper */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start relative z-10 px-2">
                    <div className="flex flex-col gap-2 transition-transform duration-700">
                      <motion.h3 layoutId={`title-${step.id}`} className="text-3xl md:text-4xl font-black text-black uppercase leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>{step.title}</motion.h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-white border border-black/5 flex items-center justify-center text-black/20 transition-colors duration-500 flex-shrink-0 shadow-sm ml-4">
                       <step.icon size={20} />
                    </div>
                  </div>

                  {/* Asset: Content containment to prevent overlap */}
                  <div className="relative w-full aspect-square flex items-center justify-center py-4 flex-shrink min-h-[100px]">
                     <div className="absolute inset-0 bg-white rounded-[1.5rem] border border-black/5 scale-90 transition-transform duration-1000 shadow-[0_10px_30px_rgba(0,0,0,0.05)]" />
                     <motion.div layoutId={`image-${step.id}`} className="relative w-[75%] h-[75%] transition-all duration-1000 ease-[0.19,1,0.22,1] z-20">
                        <Image 
                          src={step.img} 
                          alt={step.title} 
                          fill 
                          className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-1000 ink-filter"
                        />
                     </motion.div>
                  </div>

                   <div className="relative z-10 px-2 mt-auto transition-transform duration-700">
                      <motion.p layoutId={`desc-${step.id}`} className="text-black/50 transition-colors duration-700 text-sm md:text-base leading-relaxed font-medium">
                         {step.desc}
                      </motion.p>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Center Screen Expansion Modal */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-white/60 backdrop-blur-xl"
            onClick={() => setSelectedId(null)}
          >
            {(() => {
              const step = steps.find(s => s.id === selectedId);
              if (!step) return null;
              return (
                <motion.div
                  layoutId={`card-${step.id}`}
                  className="relative w-full max-w-[1200px] h-[80vh] min-h-[600px] rounded-[3rem] bg-[#FBFBFB] border border-black/5 overflow-hidden shadow-2xl flex flex-col md:flex-row cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute top-8 right-8 z-50 w-16 h-16 rounded-full bg-white border border-black/5 flex items-center justify-center text-black hover:bg-[#FF5C00] hover:text-white transition-all duration-500 shadow-lg hover:scale-110"
                  >
                    <X size={28} />
                  </button>

                  <div className="flex-1 p-12 md:p-24 flex flex-col justify-center gap-8 relative z-10">
                     <div className="flex items-center gap-6 mb-4">
                        <div className="w-16 h-16 rounded-full bg-[#FF5C00]/10 flex items-center justify-center text-[#FF5C00]">
                           <step.icon size={32} />
                        </div>
                        <span className="text-2xl font-black text-black/20 italic tracking-widest">{step.id}</span>
                     </div>
                     <motion.h3 
                       layoutId={`title-${step.id}`} 
                       className="text-6xl md:text-[6rem] font-black text-black uppercase leading-[0.85] tracking-tighter" 
                       style={{ fontFamily: "var(--font-space-grotesk)" }}
                     >
                       {step.title}
                     </motion.h3>
                     <motion.p 
                       layoutId={`desc-${step.id}`} 
                       className="text-black/60 text-2xl md:text-3xl leading-relaxed font-medium max-w-2xl mt-8"
                     >
                       {step.desc}
                     </motion.p>
                  </div>

                  <div className="flex-1 relative flex items-center justify-center p-12 bg-white/50">
                    <div className="absolute inset-12 bg-white rounded-[4rem] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)]" />
                    <motion.div layoutId={`image-${step.id}`} className="relative w-[90%] h-[90%] z-20">
                      <Image 
                        src={step.img} 
                        alt={step.title} 
                        fill 
                        className="object-contain drop-shadow-[0_40px_80px_rgba(255,92,0,0.3)] ink-filter scale-110 transition-transform duration-1000 ease-out"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
