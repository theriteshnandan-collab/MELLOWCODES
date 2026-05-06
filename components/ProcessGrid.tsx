"use client";
import { motion } from "framer-motion";
import { Plus, Search, Palette, Code, Rocket } from "lucide-react";
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
              <div className="relative aspect-[3/4] rounded-[3rem] bg-[#FBFBFB] border border-black/5 p-[40px] pt-[60px] md:p-[60px] md:pt-[70px] flex flex-col justify-between overflow-hidden group-hover:border-[#FF5C00]/20 transition-all duration-700 shadow-sm hover:shadow-2xl">
                
                <div className="flex justify-between items-start relative z-10 px-4">
                  <div className="flex flex-col gap-2">
                    {/* Purged Stage label */}
                    <h3 className="text-3xl font-black text-black uppercase leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>{step.title}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white border border-black/5 flex items-center justify-center text-black/20 group-hover:text-[#FF5C00] transition-colors flex-shrink-0 shadow-sm">
                     <step.icon size={20} />
                  </div>
                </div>

                {/* Asset: Content containment to prevent overlap */}
                <div className="relative w-full aspect-square flex items-center justify-center py-8">
                   <div className="absolute inset-0 bg-white rounded-conquer-sm border border-black/5 scale-90 group-hover:scale-100 transition-transform duration-1000" />
                   <div className="relative w-[75%] h-[75%] transform group-hover:scale-110 transition-transform duration-1000">
                      <Image 
                        src={step.img} 
                        alt={step.title} 
                        fill 
                        className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)] group-hover:drop-shadow-[0_40px_80px_rgba(255,92,0,0.2)] transition-all duration-1000 ink-filter"
                      />
                   </div>
                </div>

                 <div className="relative z-10 px-4">
                    <p className="text-black/50 text-base leading-relaxed font-medium mb-12">
                       {step.desc}
                    </p>
                    {/* Purged Technical Draft label */}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
