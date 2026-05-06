"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = ["Home", "Work", "Services", "About", "Process", "Contact"];

export default function SideIndex() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      const sectionElements = sections.map(id => document.getElementById(id.toLowerCase()));
      
      sectionElements.forEach((el, i) => {
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActive(i);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-8 lg:right-12 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-10">
      {sections.map((s, i) => (
        <a 
          key={s} 
          href={`#${s.toLowerCase()}`}
          className="relative group flex items-center justify-center"
        >
          {/* Label Tooltip */}
          <div className="absolute right-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none">
             <div className="flex items-center gap-4">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black bg-white/80 backdrop-blur-md px-4 py-2 rounded-conquer-sm border border-black/10 shadow-2xl whitespace-nowrap">
                   {s}
                </span>
                <div className="w-8 h-px bg-black/10" />
             </div>
          </div>

          {/* Animated Dot */}
          <div className="relative w-6 h-6 flex items-center justify-center">
             <motion.div 
               animate={{ 
                 height: active === i ? 40 : 8,
                 width: active === i ? 4 : 2,
                 backgroundColor: active === i ? "#FF5C00" : "rgba(10,10,10,0.15)",
                 scale: active === i ? 1.3 : 1
               }}
               className="rounded-full transition-all duration-1000 ease-expo"
               style={{ 
                 boxShadow: active === i ? "0 0 25px rgba(255,92,0,0.5), 0 0 50px rgba(255,92,0,0.2)" : "none" 
               }}
             />
             
             {/* Invisible expansion for hover area */}
             <div className="absolute inset-0 w-full h-full" />
          </div>

          {/* Purged Section Number per user request */}

        </a>
      ))}

      <style jsx>{`
        .ease-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </div>
  );
}
