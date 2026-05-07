"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: "01", title: "Lumina", tags: ["UI/UX", "Mobile"], img: "/images/p1_v2.png", desc: "Forging high-fidelity mobile ecosystems with a focus on glassmorphism and elite user narrative." },
  { id: "02", title: "Flux",   tags: ["3D", "SaaS"],   img: "/images/p2_v2.png", desc: "A liquid data visualization engine engineered for high-performance enterprise decision making." },
  { id: "03", title: "Atlas",  tags: ["Branding", "ID"], img: "/images/p3_v2.png", desc: "Architectural brand identity systems that establish absolute market authority through minimalism." },
  { id: "04", title: "Kage",   tags: ["Web3", "Crypto"], img: "/images/p4_v2.png", desc: "The dark-mode technical interface for the next generation of sovereign digital finance." },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!containerRef.current || !sectionRef.current) return;

      const totalWidth = containerRef.current.scrollWidth;
      const scrollDistance = totalWidth - window.innerWidth;

      gsap.to(containerRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.from(".project-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative h-screen bg-white overflow-hidden">
      
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-[0.02] pointer-events-none select-none z-0">
        <span className="text-[40vw] font-black uppercase tracking-[0.2em] text-black whitespace-nowrap block text-center">
          SELECTED
        </span>
      </div>

      <div 
        ref={containerRef} 
        className="flex flex-row flex-nowrap h-screen items-center px-[10vw] gap-[12vw] relative z-10 w-max min-w-full will-change-transform"
      >

        {/* Intro */}
        <div className="w-[500px] md:w-[700px] flex-shrink-0 flex flex-col justify-center pr-32">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-px bg-[#FF5C00]" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#FF5C00]">Our Masterpieces</span>
          </div>
          <h2 className="text-8xl md:text-[12rem] font-black text-black leading-[0.8] tracking-tighter mb-20"
            style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Our<br />
            <span className="italic text-[#FF5C00] chromatic-aberration">Mastery.</span>
          </h2>
          <p className="text-black/60 text-2xl leading-relaxed font-light max-w-sm">
            Sculpting technical narratives that conquer market attention and redefine digital boundaries.
          </p>
        </div>

        {/* Project Cards */}
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="project-card relative w-[75vw] md:w-[55vw] lg:w-[45vw] flex-shrink-0 group"
          >
            {/* Main Card Body */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAFAFA] border border-black/5 transition-all duration-1000 shadow-xl hover:shadow-[0_40px_80px_rgba(255,92,0,0.1)] group-hover:border-[#FF5C00]/20 flex flex-col p-12 md:p-16">
              
              {/* Top Header - Always Visible */}
              <div className="relative z-30 flex justify-between items-start mb-6 transition-transform duration-700 group-hover:-translate-y-2">
                <div className="flex flex-col gap-4">
                  <h3 className="text-6xl md:text-8xl font-black text-black uppercase leading-none tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>{p.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {p.tags.map(t => (
                      <span key={t} className="text-[10px] font-black uppercase tracking-widest text-[#FF5C00] opacity-40 group-hover:opacity-100 transition-opacity duration-700">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl border border-black/5 flex items-center justify-center bg-white shadow-sm group-hover:bg-[#FF5C00] group-hover:rotate-12 transition-all duration-700">
                  <ArrowUpRight className="w-8 h-8 text-black group-hover:text-white transition-all duration-700" />
                </div>
              </div>

              {/* Central Content Area - EXPANDS INSIDE LIMITS */}
              <div className="relative flex-grow flex items-center justify-center overflow-hidden rounded-[2rem] bg-white border border-black/5 transition-all duration-1000 group-hover:m-0 group-hover:rounded-none">
                {/* 
                   Expansion Logic:
                   The image container is usually 'inset-4' but on hover it fills the card (m-0).
                   However, we keep the z-index of text higher to prevent 'undershadowing'.
                */}
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-contain p-8 md:p-12 transition-all duration-1000 group-hover:p-0 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Bottom Footer - Always Visible */}
              <div className="relative z-30 mt-8 transition-transform duration-700 group-hover:translate-y-2">
                <p className="text-black/60 text-xl md:text-2xl leading-tight font-medium max-w-md group-hover:text-black transition-colors duration-700">
                  {p.desc}
                </p>
              </div>

              {/* Hover Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-20" />
            </div>
          </div>
        ))}

        {/* Final Conquest CTA Card */}
        <div className="project-card relative w-[80vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0">
          <a href="#contact" className="group block relative aspect-[4/5] rounded-3xl overflow-hidden bg-black p-16 md:p-24 flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-[#FF5C00] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700" />
            <div className="relative z-10 flex flex-col items-center gap-12">
              <div className="w-24 h-24 rounded-3xl border border-white/20 flex items-center justify-center group-hover:border-black/20 group-hover:rotate-[30deg] transition-all duration-700 bg-white/5 backdrop-blur-xl">
                <ArrowUpRight size={40} className="text-[#FF5C00] group-hover:text-black transition-all" />
              </div>
              <h3 className="text-6xl md:text-9xl font-black text-white group-hover:text-black uppercase leading-[0.8] tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Start Your<br />Conquest.
              </h3>
              <p className="text-white/40 group-hover:text-black/60 text-2xl font-light max-w-[320px]">
                Ready to redefine your digital narrative?
              </p>
            </div>
          </a>
        </div>

        <div className="w-[45vw] flex-shrink-0 flex flex-col justify-center pl-32">
          <h2 className="text-[14vw] font-black text-black leading-none tracking-tighter opacity-[0.04] uppercase" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            CONQUER<br />NEXT.
          </h2>
        </div>

      </div>
    </section>
  );
}
