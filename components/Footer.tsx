"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Mail, Globe, MessageSquare, ExternalLink, Send, CheckCircle, Users } from "lucide-react";
import MagneticButton from "./MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL = [
  { icon: Users,          href: "https://linkedin.com/company/mellowcode",    label: "LinkedIn"  },
  { icon: Globe,          href: "https://mellowcode.studio",                  label: "Website"   },
  { icon: MessageSquare,  href: "https://twitter.com/mellowcode",             label: "Twitter"   },
  { icon: Mail,           href: "mailto:mellowcodestudios@gmail.com",           label: "Email"     },
];

type FormState = "idle" | "loading" | "success";

export default function Footer() {
  const [time, setTime]         = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm]         = useState({ name: "", email: "", brief: "" });
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef     = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC"
      }) + " UTC");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        const split = new SplitType(ctaRef.current, { types: "lines,chars" });
        gsap.from(split.chars, {
          y: 120, opacity: 0, rotateX: -40,
          duration: 1.5, stagger: 0.02, ease: "expo.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" }
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simulate async submission (replace with real endpoint)
    await new Promise(res => setTimeout(res, 1800));
    setFormState("success");
  };

  return (
    <footer ref={sectionRef} id="contact" className="bg-[#FF5C00] min-h-screen flex flex-col justify-center py-40 relative overflow-hidden">

      {/* Kinetic Ghost Header */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.1] pointer-events-none select-none text-black">
        <span
          className="text-[40vw] font-black leading-none uppercase whitespace-nowrap"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          CONQUER —
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-32 relative z-10">

        {/* ── Main CTA ── */}
        <div className="mb-32">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-12 h-px bg-black" />
            {/* Purged Final Frontier label */}
          </div>

          <h2
            ref={ctaRef}
            className="text-7xl md:text-[11rem] font-black text-black leading-[0.78] tracking-tighter mb-24"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Let&apos;s draw<br />
            <span className="italic text-white" style={{ WebkitTextStroke: "2px #0A0A0A" }}>the future.</span>
          </h2>

          {/* Email link */}
          <MagneticButton strength={40}>
            <motion.a
              href="mailto:mellowcodestudios@gmail.com"
              whileHover={{ x: 10 }}
              className="group inline-flex flex-col gap-3 text-4xl md:text-6xl font-black text-black hover:text-white transition-all duration-700"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] opacity-40">Direct Line</span>
              <div className="flex items-center gap-8">
                mellowcodestudios@gmail.com
                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <ArrowRight size={28} />
                </div>
              </div>
              <p className="text-black/30 text-xl font-bold mt-4 tracking-widest">+91 9695996753</p>
            </motion.a>
          </MagneticButton>
        </div>

        {/* ── Contact Form ── */}
        <div className="mb-40 grid lg:grid-cols-2 gap-24 items-start">

          {/* Form intro */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-black" />
              {/* Purged Start a Project label */}
            </div>
            <h3
              className="text-4xl md:text-7xl font-black text-black leading-[0.85] tracking-tighter mb-8"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Tell us<br />
              <span className="italic">everything.</span>
            </h3>
            <p className="text-black/60 text-lg font-light leading-relaxed max-w-sm">
              We respond within 24 hours. Your idea deserves more than a template reply.
            </p>
          </div>

          {/* The form */}
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-start gap-6 py-16"
              >
                <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
                  <CheckCircle size={36} className="text-[#FF5C00]" />
                </div>
                <h4
                  className="text-5xl font-black text-black"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Transmission<br />Received.
                </h4>
                <p className="text-black/60 text-lg">
                  Our team will be in touch within 24 hours. Prepare for conquest.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-0"
              >
                {/* Name field */}
                <div className="form-field">
                  <input
                    type="text"
                    id="name"
                    placeholder=" "
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    required
                    className="peer"
                    style={{ color: "#0A0A0A", borderBottomColor: "rgba(0,0,0,0.25)" }}
                  />
                  <label htmlFor="name">Your Name</label>
                </div>

                {/* Email field */}
                <div className="form-field">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    required
                    style={{ color: "#0A0A0A", borderBottomColor: "rgba(0,0,0,0.25)" }}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>

                {/* Brief field */}
                <div className="form-field">
                  <textarea
                    id="brief"
                    placeholder=" "
                    rows={4}
                    value={form.brief}
                    onChange={e => setForm(p => ({ ...p, brief: e.target.value }))}
                    required
                    style={{ color: "#0A0A0A", borderBottomColor: "rgba(0,0,0,0.25)" }}
                  />
                  <label htmlFor="brief">Project Brief</label>
                </div>

                {/* Submit */}
                <MagneticButton strength={20}>
                  <motion.button
                    type="submit"
                    disabled={formState === "loading"}
                    whileTap={{ scale: 0.98 }}
                    className="mt-12 group relative flex items-center gap-8 bg-black text-white px-20 py-8 rounded-conquer font-black text-[13px] uppercase tracking-[0.3em] overflow-hidden self-start shadow-[0_30px_60px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] transition-all duration-700 disabled:opacity-60"
                  >
                    <div className="absolute inset-0 bg-[#0A0A0A] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700" />
                    <span className="relative z-10">
                      {formState === "loading" ? "Transmitting..." : "Launch Project"}
                    </span>
                    {formState === "loading" ? (
                      <motion.div
                        className="relative z-10 w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <Send size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                  </motion.button>
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* ── Info Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 py-24 border-t-2 border-black/10">

          <div className="flex flex-col gap-10">
            {/* Purged Navigation label */}
            <ul className="space-y-5">
              {["Work", "Services", "About", "Process"].map(l => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-lg font-black text-black/60 hover:text-white transition-all flex items-center gap-3 group"
                  >
                    <Plus size={10} className="opacity-0 group-hover:opacity-100 transition-all" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-10">
            {/* Purged Connect label */}
            <div className="flex flex-wrap gap-6">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-20 h-20 rounded-full border-2 border-black/15 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black hover:scale-110 transition-all duration-500"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {/* Purged Studio Time per user request */}
          </div>

          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Purged Manifesto label */}
              <p className="text-sm text-black font-medium leading-relaxed max-w-[240px] mt-8">
                We settle for nothing less than absolute market dominance. Every project is a conquest.
              </p>
            </div>
            <div className="mt-16">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">
                MELLOW CODE STUDIO © MMXXV
              </span>
            </div>
          </div>
        </div>

        {/* ── Legal ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-black/10">
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors cursor-pointer">Service Terms</span>
          </div>
          <div className="flex items-center gap-4">
             {/* Purged Status indicators for absolute minimalism */}
          </div>
        </div>

      </div>
    </footer>
  );
}
