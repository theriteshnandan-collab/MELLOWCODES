"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Plus, Zap, Globe, Command } from "lucide-react";

const milestones = [
  {
    year: "2021",
    title: "Inception // Draft 01",
    desc: "Mellow Code was born as a boutique laboratory for high-fidelity technical experiments.",
    icon: Command,
  },
  {
    year: "2023",
    title: "Global Sync // Edge 02",
    desc: "Expanded into the international agency space, conquering projects across 12 countries.",
    icon: Globe,
  },
  {
    year: "2025",
    title: "Absolute Mastery // Final",
    desc: "Redefining the digital frontier with our trademark 'Digital Narrative' architecture.",
    icon: Zap,
  }
];

// Animated counter hook
function useCountUp(target: number, duration: number = 2000, triggered: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);

  return count;
}

function AnimatedStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, 2200, inView);

  return (
    <div ref={ref} className="flex flex-col">
      <span
        className="text-5xl font-black text-[#FF5C00]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {count}{suffix}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-1">
        {label}
      </span>
    </div>
  );
}

export default function AboutTimeline() {
  return (
    <section id="about" className="py-60 bg-white relative overflow-hidden">

      {/* Background Ghost Label */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <span className="text-[30vw] font-black uppercase tracking-[0.2em] text-black whitespace-nowrap">
          STUDIO DNA // 2021-2025
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-32 relative z-10">

        <div className="grid lg:grid-cols-12 gap-24 items-start">

          {/* Left: Manifesto */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-px bg-[#FF5C00]" />
              {/* Purged Our Architecture label */}
            </div>
            <h2
              className="text-7xl md:text-[9rem] font-black text-black leading-[0.8] tracking-tighter mb-12"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              The<br />
              <span className="italic text-black/5" style={{ WebkitTextStroke: "1px #0A0A0A" }}>DNA.</span>
            </h2>
            <p className="text-black/60 text-xl md:text-2xl font-light leading-relaxed mb-20 max-w-lg">
              We settle for nothing less than <span className="text-black font-medium border-b-2 border-[#FF5C00]/20 pb-1">absolute market dominance</span>. Every project is a technical conquest where every pixel is intentional.
            </p>

            {/* Animated Stats */}
            <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-black/5">
              <AnimatedStat value={50} suffix="+" label="Projects Conquered" />
              <div className="hidden md:block w-px h-12 bg-black/10" />
              <AnimatedStat value={12} label="Global Regions" />
              <div className="hidden md:block w-px h-12 bg-black/10" />
              <AnimatedStat value={4} label="Years Active" />
            </div>
          </div>

          {/* Right: Timeline Grid */}
          <div className="lg:col-span-7 flex flex-col pt-12 lg:pt-0 pl-0 lg:pl-12">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group relative flex gap-8 md:gap-16 pb-20 border-l-2 border-black/5 ml-4 pl-10 md:pl-16 last:border-transparent last:pb-0"
              >
                {/* Minimalist Timeline Dot */}
                <div className="absolute top-0 left-[-6px] w-[10px] h-[10px] rounded-full bg-black/20 group-hover:bg-[#FF5C00] group-hover:scale-150 transition-all duration-500 shadow-[0_0_0_6px_white]" />
                
                <div className="flex-shrink-0 w-24 md:w-32 -mt-4">
                   <span 
                     className="text-4xl md:text-5xl font-black text-transparent italic tracking-tighter" 
                     style={{ fontFamily: "var(--font-space-grotesk)", WebkitTextStroke: "1px #FF5C00" }}
                   >
                     {m.year}
                   </span>
                </div>
                
                <div className="flex-grow -mt-2">
                  <h3 
                    className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter mb-4" 
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-black/50 text-base md:text-lg leading-relaxed max-w-md font-medium">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
