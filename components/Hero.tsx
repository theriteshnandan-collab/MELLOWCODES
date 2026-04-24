"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref      = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const assetRef   = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLSpanElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();

  // Scroll-linked transforms for "Top Tier" depth
  const titleY = useTransform(scrollY, [0, 500], [0, -100]);
  const titleScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const assetRotate = useTransform(scrollY, [0, 500], [0, 15]);
  const gridOpacity = useTransform(scrollY, [0, 400], [0.08, 0]);

  useEffect(() => {
    // High-performance GSAP mouse tracking
    const xTo = gsap.quickTo(assetRef.current, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(assetRef.current, "y", { duration: 0.8, ease: "power3" });
    const rYTo = gsap.quickTo(assetRef.current, "rotateY", { duration: 0.8, ease: "power3" });
    const rXTo = gsap.quickTo(assetRef.current, "rotateX", { duration: 0.8, ease: "power3" });
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      xTo(x); yTo(y);
      rYTo(x * 1.2); rXTo(y * -1.2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      if (h1Ref.current) {
        const st = new SplitType(h1Ref.current, { types: "lines,chars" });
        gsap.set(st.chars, { y: 150, opacity: 0, rotateX: -60 });
        tl.to(st.chars, { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.8, 
          ease: "expo.out", 
          stagger: 0.02 
        });
      }

      tl.from(".hero-badge", { x: -60, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=1.4");
      tl.from(subRef.current, { y: 40, opacity: 0, duration: 1, ease: "expo.out" }, "-=1.2");
      tl.from(ctaRef.current, { y: 40, opacity: 0, duration: 1, ease: "expo.out" }, "-=1");
      tl.from(assetRef.current, { scale: 0.5, opacity: 0, rotateZ: 20, duration: 2, ease: "expo.out" }, "-=1.6");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[110vh] flex items-center overflow-hidden bg-white"
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none speed-lines"
        style={{ 
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(255,92,0,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,92,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "200px 200px"
        }} 
      />
      <div className="absolute inset-0 halftone opacity-[0.03] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-40 w-full grid lg:grid-cols-12 gap-20 relative z-10 pt-32">
        
        <div className="lg:col-span-8 flex flex-col justify-center">
          {/* Purged Hero Badge per user request */}


          <motion.h1
            ref={h1Ref}
            style={{ 
              y: titleY, 
              scale: titleScale,
              fontFamily: "var(--font-space-grotesk)", 
              fontSize: "clamp(5rem, 15vw, 14rem)" 
            }}
            className="font-black leading-[0.78] tracking-[-0.07em] mb-16 text-[#0A0A0A] will-change-transform text-balance"
          >
            <motion.span style={{ y: useTransform(scrollY, [0, 500], [0, -50]) }} className="inline-block">Digital</motion.span><br />
            <span 
              ref={narrativeRef}
              className="inline-block transition-colors duration-700 italic pr-8 hover-glitch"
              style={{ color: isHovered ? "#0A0A0A" : "#FF5C00", WebkitTextStroke: isHovered ? "2px #0A0A0A" : "none" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Narratives
            </span><br />
            <motion.span style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }} className="inline-block">redefined.</motion.span>
          </motion.h1>

          <div className="max-w-[650px] grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
             <div className="md:col-span-1 hidden md:flex flex-col items-center gap-4 pt-2">
                <div className="w-px h-24 bg-gradient-to-b from-[#FF5C00] to-transparent" />
             </div>

             <div className="md:col-span-11">
                <p ref={subRef} className="text-2xl md:text-3xl leading-[1.3] mb-16 text-black/60 font-light tracking-tight max-w-xl">
                  We bridge the gap between <span className="text-black font-medium border-b-2 border-[#FF5C00]/20 pb-1">technical precision</span> and the <span className="italic text-[#FF5C00]">raw soul</span> of a sketch to achieve <span className="text-black font-medium">absolute market dominance</span>.
                </p>

                 <div ref={ctaRef} className="flex flex-wrap items-center gap-12 mt-4">
                  {/* Magnetic CTA */}
                  <div className="flex flex-col items-start gap-4">
                    <MagneticButton strength={25}>
                      <a
                        href="#contact"
                        className="group relative flex items-center gap-6 bg-black px-12 py-6 rounded-full overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_rgba(255,92,0,0.25)] transition-shadow duration-500"
                      >
                        <div className="absolute inset-0 bg-[#FF5C00] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.19,1,0.22,1)" }} />
                        <span className="relative z-10 text-white font-black text-sm uppercase tracking-[0.3em]">Launch Project</span>
                        <ArrowRight size={18} className="relative z-10 text-white group-hover:translate-x-2 transition-transform duration-500" />
                      </a>
                    </MagneticButton>
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/30 ml-2">Secure your slot for Q2</span>
                  </div>
                  
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF5C00] mb-3 flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full bg-[#FF5C00]"
                          style={{ boxShadow: "0 0 10px rgba(255,92,0,0.8), 0 0 20px rgba(255,92,0,0.4)", animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                        />
                        Live Status
                     </span>
                     <p className="text-sm font-black text-black uppercase tracking-[0.15em] bg-black/5 px-6 py-2 rounded-full">Open for Conquest</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 relative flex items-center justify-center">
          <div className="absolute inset-0 border border-black/5 rounded-[8rem] bg-[#F8F8F8] -rotate-3 scale-90 translate-x-20 z-0" />
          <motion.div
            ref={assetRef}
            style={{ rotateZ: assetRotate }}
            className="relative w-full aspect-square scale-125 will-change-transform z-10 rounded-[10rem] overflow-hidden bg-white/50 backdrop-blur-sm border border-black/5 ink-filter shadow-2xl"
          >
            <div className="absolute inset-0 bg-[#FF5C00]/5 blur-[150px] rounded-full" />
            <Image
              src="/images/h2.png" 
              alt="Mellow Architectural Core"
              fill
              className="object-contain p-12 drop-shadow-[0_60px_120px_rgba(255,92,0,0.25)]"
              priority
              onLoad={() => ScrollTrigger.refresh()}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[9px] font-black uppercase tracking-[0.6em] text-black">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-black to-transparent" />
      </motion.div>

      {/* Purged Coordinates per user request */}
    </section>
  );
}

// Purged internal MagneticButton per user request

