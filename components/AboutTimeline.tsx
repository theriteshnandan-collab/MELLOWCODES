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
              className="text-8xl md:text-[10rem] font-black text-black leading-[0.8] tracking-tighter mb-16"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              The<br />
              <span className="italic text-black/5" style={{ WebkitTextStroke: "1px #0A0A0A" }}>DNA.</span>
            </h2>
            <p className="text-black/60 text-2xl md:text-3xl font-light leading-relaxed mb-16 max-w-xl">
              We settle for nothing less than <span className="text-black font-medium border-b-2 border-[#FF5C00]/20 pb-1">absolute market dominance</span>. Every project is a technical conquest where every pixel is intentional.
            </p>

            {/* Animated Stats */}
            <div className="flex items-center gap-10">
              <AnimatedStat value={50} suffix="+" label="Projects Conquered" />
              <div className="w-px h-12 bg-black/10" />
              <AnimatedStat value={12} label="Global Regions" />
              <div className="w-px h-12 bg-black/10" />
              <AnimatedStat value={4} label="Years Active" />
            </div>
          </div>

          {/* Right: Timeline Grid */}
          <div className="lg:col-span-7 grid gap-12">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative p-16 md:p-24 rounded-conquer bg-[#FBFBFB] border border-black/5 overflow-hidden group-hover:border-[#FF5C00]/30 group-hover:shadow-[0_20px_60px_rgba(255,92,0,0.08)] transition-all duration-700 shadow-sm">
                  {/* Icon watermark */}
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-700">
                    <m.icon size={120} className="text-black" />
                  </div>

                  {/* Orange accent line on hover */}
                  <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-[#FF5C00] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                  <div className="flex flex-col md:flex-row md:items-center gap-10 relative z-10">
                    <div className="flex flex-col gap-2">
                      <span
                        className="text-6xl font-black text-[#FF5C00]"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {m.year}
                      </span>
                      <div className="flex items-center gap-3">
                        <Plus size={14} className="text-black/20" />
                        {/* Purged Milestone label */}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3
                        className="text-3xl md:text-4xl font-black text-black uppercase mb-4"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {m.title}
                      </h3>
                      <p className="text-black/50 text-lg leading-relaxed max-w-md">{m.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
