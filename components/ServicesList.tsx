"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SERVICES = [
  { id: "01", title: "Stylized Branding", desc: "Forging iconic identities through hand-drawn 3D systems and strategic vision.", img: "/images/d1.png", tags: ["Visual ID","Logo","Motion"] },
  { id: "02", title: "Kinetic Web",      desc: "Engineering high-performance web environments that move with soul and precision.", img: "/images/d3.png", tags: ["Next.js","React","Animation"] },
  { id: "03", title: "Editorial UI/UX",   desc: "High-contrast layouts that make complex software feel like a premium art book.", img: "/images/d2.png", tags: ["SaaS","Design Systems"] },
  { id: "04", title: "Market Conquest",   desc: "Data-driven growth systems that ensure your brand dominates its niche.",      img: "/images/d4.png", tags: ["SEO","CRO","Strategy"] },
];

export default function ServicesList() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="py-60 relative bg-white overflow-hidden min-h-screen flex flex-col justify-center">
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
        <div className="mb-24">
          {/* Purged Our Craft label */}
          <h2 className="text-6xl md:text-9xl font-black text-black leading-[0.85] tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Drawn to<br />
            <span className="text-[#FF5C00]">Scale.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Left: List */}
          <div className="space-y-6">
            {SERVICES.map((s, i) => (
              <div 
                key={s.id} 
                onMouseEnter={() => setActive(i)}
                className="group border-b border-black/5 pb-10 cursor-pointer"
              >
                <div className="flex items-start gap-10">
                  <span className="text-[10px] font-bold text-black/20 mt-4 tabular-nums group-hover:text-[#FF5C00] transition-colors">
                    {s.id}
                  </span>
                  <div>
                    <h3 className="text-4xl md:text-7xl font-black text-black/20 group-hover:text-black transition-all duration-500 mb-6"
                      style={{ fontFamily: "var(--font-space-grotesk)", transform: active === i ? "translateX(20px)" : "none" }}>
                      {s.title}
                    </h3>
                    <div className={`transition-all duration-700 ease-out ${active === i ? 'opacity-100 scale-100' : 'opacity-20 scale-[0.98]'}`}>
                      {/* Mobile Image Fallback */}
                      <div className={`lg:hidden relative w-full aspect-video rounded-conquer-sm overflow-hidden bg-[#F8F8F8] border border-black/5 mb-8 mt-4 transition-all duration-700 ${active === i ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden mb-0 mt-0'}`}>
                         <Image 
                           src={s.img} 
                           alt={s.title}
                           fill
                           className="object-contain p-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                         />
                      </div>

                      <p className="text-xl text-black/50 leading-relaxed mb-8 max-w-md font-light">
                        {s.desc}
                      </p>
                      <div className="flex flex-wrap gap-3">
                         {s.tags.map(t => (
                           <span key={t} className="px-4 py-1.5 rounded-full border border-black/5 text-[10px] font-bold uppercase tracking-widest text-black/40 bg-[#F8F8F8]">
                             {t}
                           </span>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Asset Preview */}
          <div className="hidden lg:block sticky top-40">
            <div className="relative w-full aspect-[4/5] rounded-conquer overflow-hidden bg-white/80 backdrop-blur-2xl border border-white/20 shadow-2xl p-24 flex items-center justify-center halftone glow-border-orange">
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 p-12 md:p-24 pb-40"
                >
                  <Image 
                    src={SERVICES[active].img} 
                    alt={SERVICES[active].title}
                    fill
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-8 md:p-12"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Floating badge */}
              <div className="absolute bottom-10 left-10 p-10 bg-white/90 backdrop-blur-xl rounded-conquer-sm border border-black/5 w-[85%] shadow-xl z-20">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-black text-black leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {active === 0 ? "Identify through intent." : 
                     active === 1 ? "Move with purpose." :
                     active === 2 ? "Readability as art." : "Dominate the noise."}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
