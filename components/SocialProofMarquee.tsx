"use client";
import { motion } from "framer-motion";

const ITEMS_ROW1 = [
  "Brand Strategy", "Interface Engineering", "Full-Stack Dev", "Motion Design",
  "SaaS Architecture", "E-Commerce", "Growth Systems", "UX Research",
];

const ITEMS_ROW2 = [
  "Next.js", "React Native", "Webflow", "Figma", 
  "GSAP Animation", "Conversion Rate Optim.", "Web3 Identity", "Editorial UI",
];

const MarqueeRow = ({
  items,
  direction = 1,
  speed = 45,
}: {
  items: string[];
  direction?: 1 | -1;
  speed?: number;
}) => {
  const animX = direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="relative overflow-hidden flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: animX }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, set) => (
          <div key={set} className="flex items-center">
            {items.map((item, i) => (
              <div key={i} className="flex items-center">
                <span
                  className="font-black uppercase leading-none px-10 select-none"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "clamp(2rem, 5vw, 5rem)",
                    // Alternate filled vs outline for visual rhythm
                    color: i % 2 === 0 ? "transparent" : "rgba(10,10,10,0.15)",
                    WebkitTextStroke: i % 2 === 0
                      ? "1.5px rgba(255,92,0,0.4)"
                      : "none",
                  }}
                >
                  {item}
                </span>
                <div className="w-3 h-3 rounded-full bg-[#FF5C00]/20 border border-[#FF5C00]/40 flex items-center justify-center mx-6 flex-shrink-0">
                  <div className="w-1 h-1 rounded-full bg-[#FF5C00]" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function SocialProofMarquee() {
  return (
    <div className="relative overflow-hidden py-20 bg-white border-t border-b border-black/5">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-48 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

      <div className="flex flex-col gap-8">
        <MarqueeRow items={ITEMS_ROW1} direction={1}  speed={50} />
        <MarqueeRow items={ITEMS_ROW2} direction={-1} speed={40} />
      </div>
    </div>
  );
}
