"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

const SERVICES = [
  { id: "01", title: "Stylized Branding", desc: "Forging iconic identities through hand-drawn 3D systems and strategic vision.", img: "/images/d1_v2.png", tags: ["Visual ID","Logo","Motion"] },
  { id: "02", title: "Kinetic Web",      desc: "Engineering high-performance web environments that move with soul and precision.", img: "/images/d3_v2.png", tags: ["Next.js","React","Animation"] },
  { id: "03", title: "Editorial UI/UX",   desc: "High-contrast layouts that make complex software feel like a premium art book.", img: "/images/d2_v2.png", tags: ["SaaS","Design Systems"] },
  { id: "04", title: "Market Conquest",   desc: "Data-driven growth systems that ensure your brand dominates its niche.",      img: "/images/d4_v2.png", tags: ["SEO","CRO","Strategy"] },
];

const SMOOTH_EASE = [0.19, 1, 0.22, 1] as const;

function ServiceItem({ service, index, active, setActive }: { service: typeof SERVICES[0], index: number, active: number, setActive: (i: number) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActive(index);
    }
  }, [isInView, index, setActive]);

  return (
    <div 
      ref={ref}
      className="py-24 border-b border-black/5"
    >
      <div className="flex items-start gap-10">
        <span className={`text-[12px] font-black mt-4 tabular-nums transition-colors duration-1000 ${active === index ? 'text-[#FF5C00]' : 'text-black/10'}`}>
          {service.id}
        </span>
        <div className="flex flex-col gap-8">
          <h3 className={`text-5xl md:text-8xl font-black transition-all duration-1000 tracking-tighter uppercase ${active === index ? 'text-black' : 'text-black/10'}`}
            style={{ fontFamily: "var(--font-space-grotesk)", transform: active === index ? "translateX(20px)" : "none" }}>
            {service.title}
          </h3>
          <p className={`text-2xl leading-relaxed font-light max-w-xl transition-all duration-1000 ${active === index ? 'text-black/80 opacity-100 translate-y-0' : 'text-black/10 opacity-0 translate-y-10'}`}>
            {service.desc}
          </p>
          <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-100 ${active === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             {service.tags.map(t => (
               <span key={t} className="px-6 py-2 rounded-full border border-black/5 text-[10px] font-bold uppercase tracking-widest text-black/40 bg-[#F8F8F8]">
                 {t}
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesList() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative bg-white pb-60">
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-32">
        
        {/* Sticky Header */}
        <div className="pt-40 mb-20 sticky top-0 bg-white/80 backdrop-blur-md z-10 py-10">
          <h2 className="text-6xl md:text-[10rem] font-black text-black leading-[0.8] tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Drawn to<br />
            <span className="text-[#FF5C00]">Scale.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-32 items-start relative">
          
          <div className="flex flex-col">
            {SERVICES.map((s, i) => (
              <ServiceItem 
                key={s.id} 
                service={s} 
                index={i} 
                active={active} 
                setActive={setActive} 
              />
            ))}
            <div className="h-[40vh]" />
          </div>

          <div className="hidden lg:block sticky top-1/4 h-[50vh] flex items-start">
            <div className="relative w-full aspect-square max-w-[600px] rounded-[3rem] overflow-hidden bg-white/80 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-start justify-center glow-border-orange">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 1, ease: SMOOTH_EASE as any }}
                  className="absolute inset-0 pt-4 md:pt-8 px-12 md:px-16 h-full"
                >
                  <Image 
                    src={SERVICES[active].img} 
                    alt={SERVICES[active].title}
                    fill
                    className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.1)] p-0"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
