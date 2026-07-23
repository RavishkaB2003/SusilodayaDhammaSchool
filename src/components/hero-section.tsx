"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import AnimatedHeading from "@/components/animated-heading";
import ScrollReveal from "@/components/scroll-reveal";

const MotionLink = motion(Link);

interface HeroData {
  title: string;
  subtext: string;
  buttonText: string;
  imageUrl: string;
}

interface HeroSectionProps {
  heroData: HeroData;
}

export default function HeroSection({ heroData }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scrolling relative to the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Background image opacity and scale transforms
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  
  // Text parallax scroll and fade effects (retaining readability over longer range)
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.85], [0, -45]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DDD0]/30 overflow-hidden"
    >
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Dynamic full-bleed dark grayscale background (transitions to cream on scroll down) */}
        <div className="absolute inset-0 bg-[#141416]" />
        
        <motion.div style={{ scale: bgScale }} className="w-full h-full relative">
          <img 
            src={heroData.imageUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover grayscale opacity-40 brightness-75"
          />
          {/* Subtle dark vignette overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-[#141416]/80" />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </motion.div>

      {/* Seamless bottom gradient fade to blend the hero dark background into the stats cream background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/30 via-[#FFF8F0]/5 to-transparent z-10 pointer-events-none">
        {/* Continuous parchment dot-grid overlay matching the page background */}
        <div 
          className="absolute inset-0 opacity-100 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(rgba(28, 28, 30, 0.08) 1.2px, transparent 1.2px), 
              radial-gradient(rgba(28, 28, 30, 0.08) 1.2px, transparent 1.2px)
            `,
            backgroundSize: '48px 48px',
            backgroundPosition: '0 0, 24px 24px'
          }}
        />
      </div>

      {/* Decorative vertical editorial line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 pointer-events-none hidden lg:block z-10" />

      {/* Text Copywriting Content */}
      <motion.div 
        style={{ opacity: textOpacity, y: textY }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-20 py-12"
      >
        <div className="lg:col-span-8 space-y-8 pr-0 lg:pr-8 text-left">
          <ScrollReveal direction="right" className="inline-block">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E8A317] uppercase border border-[#E8A317]/30 px-4 py-2 rounded-badge bg-white/5 backdrop-blur-sm">
              Venerable Heritage · Since 2006
            </span>
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={0.1}>
            <AnimatedHeading 
              text={heroData.title} 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-serif text-[#FFF8F0] leading-[0.95] tracking-tight italic" 
            />
          </ScrollReveal>

          {/* Saffron horizontal rule */}
          <div className="border-y border-white/10 py-6">
            <ScrollReveal direction="right" delay={0.2}>
              <p className="text-sm sm:text-base text-white/80 font-normal tracking-wide leading-relaxed max-w-2xl">
                {heroData.subtext}
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/enrollment"
                className="px-8 py-3.5 bg-[#E8A317] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center space-x-2 border border-[#E8A317] hover:bg-[#6B1D3A] hover:border-[#6B1D3A] rounded-cta"
              >
                <span>{heroData.buttonText}</span>
                <span>↗</span>
              </Link>
              <Link
                href="/#about"
                className="px-8 py-3.5 bg-white/5 border border-white/20 text-white/95 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/10 hover:text-white transition-all duration-300 rounded-cta"
              >
                Learn History
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  );
}
