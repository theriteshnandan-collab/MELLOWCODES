"use client";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import SocialProofMarquee from "@/components/SocialProofMarquee";
import ServicesList from "@/components/ServicesList";
import AboutTimeline from "@/components/AboutTimeline";
import ProcessGrid from "@/components/ProcessGrid";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  return (
    <main className="relative bg-white">
      <Navbar />
      
      <section id="home">
        <Hero />
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <SocialProofMarquee />
      </motion.div>

      <section id="work">
        <ProjectShowcase />
      </section>

      <section id="services">
        <ServicesList />
      </section>

      <section id="about">
        <AboutTimeline />
      </section>

      <section id="process">
        <ProcessGrid />
      </section>

      <section id="contact">
        <Footer />
      </section>
      
      {/* Purged Global Technical Labels per user request */}

    </main>
  );
}
