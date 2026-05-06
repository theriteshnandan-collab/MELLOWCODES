"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { 
    id: "01", 
    title: "Lumina", 
    tags: ["Product", "3D"], 
    img: "/images/p1.png",
    color: "#F3F3F3",
    desc: "Redefining the perception of light through hand-drawn interface architectures."
  },
  { 
    id: "02", 
    title: "Flux", 
    tags: ["SaaS", "Motion"], 
    img: "/images/p2.png",
    color: "#EFEFEF",
    desc: "A fluid ecosystem for high-fidelity technical logic and data flow."
  },
  { 
    id: "03", 
    title: "Atlas", 
    tags: ["Platform", "Branding"], 
    img: "/images/p3.png",
    color: "#F8F8F8",
    desc: "Mapping the digital landscape with bespoke architectural precision."
  },
  { 
    id: "04", 
    title: "Kage", 
    tags: ["Web3", "Identity"], 
    img: "/images/p4.png",
    color: "#F0F0F0",
    desc: "The shadow protocol for the next generation of digital conquerors."
  },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure all assets are loaded before calculating scroll width
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current || !sectionRef.current) return;
      
      const scrollWidth = containerRef.current.scrollWidth;
      const windowWidth = window.innerWidth;

      gsap.to(containerRef.current, {
        x: () => -(scrollWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 2,
          start: "top top",
          end: () => "+=" + (scrollWidth - windowWidth),
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      gsap.to(".bg-text", {
        x: -500,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        }
      });
    }, sectionRef);

    // Final safety refresh
    const timer = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      window.removeEventListener("load", handleLoad);
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative h-screen bg-white overflow-hidden">
      
      {/* Purged Background Kinetic Text per user request */}


      <div ref={containerRef} className="flex h-screen items-center px-[10vw] gap-[12vw] relative z-10 w-max will-change-transform">
        
        {/* Intro */}
        <div className="w-[450px] md:w-[600px] flex-shrink-0 flex flex-col justify-center pr-24">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-12 h-px bg-[#FF5C00]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF5C00]">Selected Masterpieces</span>
          </div>
          <h2 className="text-8xl md:text-[10rem] font-black text-black leading-[0.8] tracking-tighter mb-16"
            style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Our<br />
            <span className="italic text-black/5" style={{ WebkitTextStroke: "1px #0A0A0A" }}>Mastery.</span>
          </h2>
          <p className="text-black/40 text-2xl leading-relaxed font-light max-w-sm mb-12">
            We sculpt technical narratives that conquer market attention and redefine digital boundaries.
          </p>
          
          <div className="flex items-center gap-6 opacity-30">
             <div className="w-10 h-[2px] bg-black" />
             <span className="text-[9px] font-black uppercase tracking-[0.6em] text-black">Scroll to Conquer</span>
          </div>
        </div>

        {/* Project Cards */}
        {PROJECTS.map((p, i) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0, 0.55, 0.45, 1] }}
            viewport={{ margin: "-100px" }}
            className="relative w-[70vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0 group"
          >
            {/* Card Frame */}
            <div className="relative aspect-[4/5] rounded-conquer overflow-hidden bg-white/80 backdrop-blur-2xl border border-black/5 px-16 py-24 md:px-24 md:pt-40 md:pb-32 flex flex-col transition-all duration-1000 shadow-lg hover:shadow-2xl ink-filter sketch-border glow-border-orange">
              
              <div className="flex justify-between items-start mb-10 px-4 md:px-8">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-5xl md:text-7xl font-black text-black uppercase leading-none" style={{ fontFamily: "var(--font-space-grotesk)" }}>{p.title}</h3>
                  </div>
                  <div className="w-20 h-20 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#FF5C00] group-hover:border-[#FF5C00] transition-all duration-700 flex-shrink-0 ml-4">
                    <ArrowUpRight size={28} className="text-black group-hover:text-white transition-all" />
                  </div>
              </div>

              <div className="relative flex-grow flex items-center justify-center mb-12 overflow-hidden rounded-conquer bg-white border border-black/5 p-8 md:p-12 mx-4 md:mx-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out">
                   <Image 
                     src={p.img} 
                     alt={p.title} 
                     fill 
                     className="object-cover md:object-contain ink-filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.06)] group-hover:drop-shadow-[0_60px_100px_rgba(255,92,0,0.25)] transition-all duration-1000 rounded-[2rem]"
                     quality={95}
                   />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-8 md:pt-12 border-t border-black/5 px-4 md:px-8">
                 <div className="md:col-span-12 flex flex-col gap-6">
                    <p className="text-black/60 text-base md:text-lg leading-relaxed font-medium pr-8">
                       {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {p.tags.map(t => (
                        <span key={t} className="text-[9px] font-black uppercase tracking-widest text-[#FF5C00] px-4 py-2 rounded-full border border-[#FF5C00]/10 bg-[#FF5C00]/5">{t}</span>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Final Conquest CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative w-[80vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0"
        >
          <a href="#contact" className="group block relative aspect-[4/5] rounded-conquer overflow-hidden bg-black p-16 md:p-24 flex flex-col justify-center items-center text-center">
             <div className="absolute inset-0 bg-[#FF5C00] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
             <div className="relative z-10 flex flex-col items-center gap-10">
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:border-black/20 transition-all">
                   <ArrowUpRight size={40} className="text-[#FF5C00] group-hover:text-black transition-all" />
                </div>
                <h3 className="text-6xl md:text-8xl font-black text-white group-hover:text-black uppercase leading-[0.85] tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Start Your<br />Conquest.
                </h3>
                <p className="text-white/40 group-hover:text-black/60 text-lg font-light max-w-[280px]">
                  Ready to redefine your digital narrative? Let&apos;s build the future together.
                </p>
             </div>
          </a>
        </motion.div>

        <div className="w-[45vw] flex-shrink-0 flex flex-col justify-center pl-32">
           <h2 className="text-[12vw] font-black text-black leading-none tracking-tighter opacity-10" style={{ fontFamily: "var(--font-space-grotesk)" }}>
             CONQUER<br />NEXT.
           </h2>
        </div>

      </div>
    </section>
  );
}
