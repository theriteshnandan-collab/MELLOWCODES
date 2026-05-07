"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, MoveRight, Command } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Hero3DAsset from "./Hero3DAsset";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref      = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const assetRef   = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();

  const titleY = useTransform(scrollY, [0, 500], [0, -120]);
  const titleScale = useTransform(scrollY, [0, 500], [1, 0.92]);
  const assetRotate = useTransform(scrollY, [0, 500], [0, 25]);
  const gridOpacity = useTransform(scrollY, [0, 400], [0.12, 0]);

  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      
      const x = (clientX / window.innerWidth - 0.5) * 60;
      const y = (clientY / window.innerHeight - 0.5) * 60;
      gsap.to(assetRef.current, {
        x, y,
        rotateY: x * 1.5,
        rotateX: y * -1.5,
        duration: 1.2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      if (h1Ref.current) {
        const st = new SplitType(h1Ref.current, { types: "lines,chars" });
        gsap.set(st.chars, { 
          y: 100, 
          opacity: 0, 
          rotateX: -90,
          filter: "blur(10px)"
        });
        
        tl.to(st.chars, { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          filter: "blur(0px)",
          duration: 1.5, 
          ease: "expo.out", 
          stagger: {
            amount: 0.8,
            from: "random"
          }
        });
      }

      tl.from(subRef.current, { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");
      tl.from(ctaRef.current, { y: 20, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6");
      tl.from(assetRef.current, { scale: 0.8, opacity: 0, duration: 2, ease: "expo.out" }, "-=1.5");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A] cursor-none"
    >
      {/* Dynamic Cinematic Spotlight */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none opacity-50"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 92, 0, 0.12), transparent 80%)`
          )
        }}
      />

      {/* Blueprint Grid Detail */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }} 
      />



      <div className="max-w-[1600px] mx-auto px-6 lg:px-40 w-full grid lg:grid-cols-12 gap-20 relative z-10 pt-40 pb-20">
        
        <div className="lg:col-span-8 flex flex-col justify-center">
          
          <div className="flex items-center gap-4 mb-12 group">
             <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] shadow-[0_0_15px_#FF5C00] animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 group-hover:text-[#FF5C00] transition-colors duration-500 cursor-default">Open for Conquest</span>
          </div>

          <motion.h1
            ref={h1Ref}
            style={{ y: titleY, scale: titleScale, fontFamily: "var(--font-space-grotesk)" }}
            className="font-black leading-[0.85] mb-12 text-white"
          >
            <div className="flex flex-col">
              <span className="inline-block italic tracking-[-0.15em] text-[#AD2524] text-[clamp(5rem,16vw,15rem)] chromatic-aberration">MELLOW</span>
              <span className="inline-block italic tracking-[-0.15em] text-[#AD2524] text-[clamp(5rem,16vw,15rem)] chromatic-aberration">CODE</span>
              
              <div className="flex flex-col mt-4 tracking-[-0.07em] text-[clamp(2.5rem,8vw,6rem)]">
                <span className="inline-block">Digital</span>
                <span className="inline-block transition-colors duration-1000 italic pr-8 text-[#FF5C00] hover:text-white cursor-default text-shimmer">Narratives</span>
                <span className="inline-block">redefined.</span>
              </div>
            </div>
          </motion.h1>

          <div className="max-w-[750px] flex gap-12 items-start">
             <div className="hidden md:flex flex-col items-center gap-6 pt-4">
                <div className="w-px h-40 bg-gradient-to-b from-[#FF5C00] via-[#FF5C00]/20 to-transparent" />
             </div>

             <div className="flex flex-col">
                <p ref={subRef} className="text-2xl md:text-3xl leading-[1.35] mb-20 text-white/80 font-light tracking-tight">
                  Engineering the gap between <span className="text-[#FF5C00] font-medium underline decoration-[#FF5C00]/20 underline-offset-8">technical precision</span> and the <span className="italic text-white">raw soul</span> of a sketch to achieve <span className="text-white font-medium border-b border-white/20 px-2 pb-1 bg-white/5 rounded-lg">absolute dominance.</span>
                </p>

                <div ref={ctaRef} className="flex flex-wrap items-center gap-16">
                  <div className="flex flex-col items-start gap-6">
                    <MagneticButton strength={35}>
                      <a
                        href="#contact"
                        className="group relative flex items-center gap-8 bg-white px-14 py-8 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(255,92,0,0.15)] transition-all duration-700 hover:rounded-[3.5rem] hover:shadow-[0_40px_80px_rgba(255,92,0,0.3)]"
                      >
                        <div className="absolute inset-0 bg-black translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.19,1,0.22,1]" />
                        <span className="relative z-10 text-black font-black text-xs uppercase tracking-[0.4em] group-hover:text-[#FF5C00] transition-colors duration-500">Initialize Project</span>
                        <MoveRight size={20} className="relative z-10 text-black group-hover:translate-x-4 group-hover:text-[#FF5C00] transition-all duration-700" />
                      </a>
                    </MagneticButton>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 relative hidden lg:flex items-center justify-center">
          <div className="absolute inset-0 rounded-[8rem] bg-white/[0.02] border border-white/5 -rotate-6 scale-95 translate-x-16 z-0" />
          <div className="absolute inset-0 rounded-[8rem] bg-[#FF5C00]/5 border border-[#FF5C00]/10 rotate-3 scale-90 -translate-x-8 z-0" />
          
          <motion.div
            ref={assetRef}
            style={{ rotateZ: assetRotate }}
            className="relative w-full aspect-square z-10 rounded-[10rem] overflow-hidden bg-white/[0.08] backdrop-blur-3xl border border-white/20 shadow-[0_80px_160px_rgba(0,0,0,0.8)] flex items-center justify-center glow-border-orange group"
          >
            <div className="absolute inset-0 bg-[#FF5C00]/10 blur-[120px] rounded-full animate-pulse group-hover:bg-[#FF5C00]/25 transition-colors duration-1000" />
            <div className="relative w-[85%] h-[85%] flex items-center justify-center transform transition-transform duration-1000 group-hover:scale-105 z-20">
               <Hero3DAsset />
            </div>
          </motion.div>
        </div>
      </div>



    </section>
  );
}
