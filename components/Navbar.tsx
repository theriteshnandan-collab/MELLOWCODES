"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Plus } from "lucide-react";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "Work",     href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About",    href: "#about" },
  { label: "Process",  href: "#process" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine scroll direction
    const direction = latest - lastScrollY.current;
    
    // Hide on scroll down, show on scroll up
    if (latest > 100 && direction > 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    
    // Background blur/border visibility
    setScrolled(latest > 40);
    lastScrollY.current = latest;
  });

  return (
    <>
      <motion.header
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: visible ? 0 : 120, 
          opacity: visible ? 1 : 0 
        }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="fixed bottom-0 inset-x-0 z-[100] px-6 lg:px-12 pb-8 pointer-events-none"
      >
        <div className={`max-w-[1600px] mx-auto flex items-center justify-between h-24 px-8 lg:px-12 rounded-conquer border pointer-events-auto transition-all duration-1000 shadow-2xl ${scrolled ? 'glass-ultra' : 'bg-transparent border-transparent'}`}
          style={{ 
            borderColor: scrolled ? "rgba(255,255,255,0.8)" : "transparent",
            transform: scrolled ? "scale(1.02)" : "scale(1)"
          }}>
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
               <div className="absolute inset-0 bg-black rounded-xl group-hover:rotate-45 group-hover:bg-[#FF5C00] transition-all duration-700" />
               <span className="relative z-10 text-white font-black text-xs tracking-tighter">MC</span>
            </div>
            <div className="flex flex-col">
                <span className="font-black text-sm uppercase tracking-[0.25em] text-[#0A0A0A]">
                  Mellow Code Studios
                </span>
                <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#FF5C00] opacity-0 group-hover:opacity-100 transition-opacity">
                  Elite Creative Agency
                </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-12">
            {links.map((l, i) => (
              <a key={l.label} href={l.href}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 hover:text-[#0A0A0A] transition-all relative group flex items-center gap-2"
              >
                <Plus size={8} className="text-[#FF5C00] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-8">
             <div className="h-8 w-px bg-black/5" />
            <MagneticButton strength={20}>
              <motion.a href="#contact"
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] text-white shadow-[0_20px_40px_rgba(255,92,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,92,0,0.4)] transition-all hover:scale-105 inline-block"
                style={{ background: "#FF5C00" }}>
                Hire Studio
              </motion.a>
            </MagneticButton>
          </div>

          <button className="lg:hidden p-4 bg-black/5 rounded-full text-black" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={  { opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[99] bg-white flex flex-col justify-center px-12 overflow-hidden"
          >
             <div className="absolute top-20 left-20 opacity-[0.02] text-black pointer-events-none">
                <span className="text-[35vw] font-black uppercase leading-none" style={{ fontFamily: "var(--font-space-grotesk)" }}>MENU</span>
             </div>
            <ul className="space-y-12 relative z-10">
              {links.map((l, i) => (
                <motion.li key={l.label}
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}>
                  <a href={l.href} onClick={() => setOpen(false)}
                    className="group flex items-end gap-6"
                  >
                    <span className="text-xl font-bold text-[#FF5C00] mb-4">0{i+1}</span>
                    <span className="text-7xl md:text-9xl font-black text-black hover:italic transition-all leading-none"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >{l.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
