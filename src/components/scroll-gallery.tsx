"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface GalleryImage {
  url: string;
  tag: string;
  isSelected: boolean;
}

interface ScrollGalleryProps {
  images?: any[]; // Supports both string[] and structured GalleryImage[]
}

export default function ScrollGallery({ images = [] }: ScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the gallery container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Top-level hooks for exactly 6 cross-fade levels (React hook safety compliance)
  const opacity0 = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.12, 0.18, 0.32, 0.36], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.30, 0.36, 0.50, 0.54], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.48, 0.54, 0.68, 0.72], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.66, 0.72, 0.84, 0.88], [0, 1, 1, 0]);
  const opacity5 = useTransform(scrollYProgress, [0.82, 0.88, 1.0], [0, 1, 1]);

  // Dynamic overall background opacity to fade-in and fade-out smoothly
  const containerBgOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1.0], [0, 1, 1, 0]);

  // Dynamic color transitions for typography and elements to remain readable when background becomes cream
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1.0],
    ["#1C1C1E", "#FFF8F0", "#FFF8F0", "#1C1C1E"]
  );

  const subtextColor = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1.0],
    ["rgba(28, 28, 30, 0.8)", "rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.8)", "rgba(28, 28, 30, 0.8)"]
  );

  const badgeBorderColor = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1.0],
    ["rgba(232, 163, 23, 0.3)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.1)", "rgba(232, 163, 23, 0.3)"]
  );

  const badgeBgColor = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1.0],
    ["rgba(232, 163, 23, 0.05)", "rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.05)", "rgba(232, 163, 23, 0.05)"]
  );

  // View Full Archive Button reveal
  const buttonOpacity = useTransform(scrollYProgress, [0.85, 0.98], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.85, 0.98], [25, 0]);

  // Local fallback images
  const fallbackImages = [
    "/assets/gallery/sil_program.jpg",
    "/assets/gallery/prize_giving.jpg",
    "/assets/gallery/classroom.jpg",
    "/assets/gallery/temple_entrance.jpg",
    "/assets/gallery/sil_program_2.jpg",
    "/assets/gallery/prize_giving_2.jpg"
  ];

  // Resolve images: parse dynamic database inputs (which can be string URLs or objects)
  let parsedList: string[] = [];
  if (images && images.length > 0) {
    // If it's structured objects, filter those marked as selected
    const selectedObjects = images.filter((img: any) => {
      if (typeof img === "object" && img !== null) {
        return !!img.isSelected;
      }
      return false;
    });

    if (selectedObjects.length > 0) {
      parsedList = selectedObjects.map((img: any) => img.url);
    } else {
      // Otherwise, parse raw string array or extract URLs
      parsedList = images.map((img: any) => {
        if (typeof img === "string") return img;
        return img.url || "";
      }).filter(Boolean);
    }
  }

  // Ensure we display exactly up to 6 selected images (fall back to seeds if list is small)
  const displayList = parsedList.length >= 4 
    ? parsedList.slice(0, 6) 
    : fallbackImages;

  const N = displayList.length;
  const opacities = [opacity0, opacity1, opacity2, opacity3, opacity4, opacity5];

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-transparent">
      
      {/* Sticky container that stays fixed for the scroll duration */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        
        {/* Animated Dark background transition */}
        <motion.div 
          style={{ opacity: containerBgOpacity }}
          className="absolute inset-0 bg-[#141416] z-0 pointer-events-none"
        />

        {/* Full-Screen Grayscale Background Stack with cross-dissolve transitions */}
        <motion.div 
          style={{ opacity: containerBgOpacity }}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        >
          {displayList.map((src, idx) => {
            if (idx >= opacities.length) return null;
            return (
              <motion.div
                key={idx}
                style={{ opacity: opacities[idx] }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={src} 
                  alt={`Gallery Background ${idx + 1}`} 
                  className="w-full h-full object-cover grayscale brightness-50"
                />
              </motion.div>
            );
          })}
          {/* Overlay mask for text contrast */}
          <div className="absolute inset-0 bg-black/45 z-15" />
        </motion.div>

        {/* Centered Gallery Heading (Text transitions dynamically between light/dark) */}
        <div className="text-center max-w-xl mx-auto z-20 px-4">
          <motion.span 
            style={{ borderColor: badgeBorderColor, backgroundColor: badgeBgColor }}
            className="text-[10px] font-bold tracking-[0.25em] text-[#E8A317] uppercase border px-4 py-2 rounded-badge backdrop-blur-sm"
          >
            02 / Gallery
          </motion.span>
          <motion.h2 
            style={{ color: textColor }}
            className="text-5xl md:text-6xl font-normal font-serif mt-6 italic leading-none tracking-tight"
          >
            Gallery
          </motion.h2>
          <motion.p 
            style={{ color: subtextColor }}
            className="text-xs sm:text-sm mt-4 leading-relaxed max-w-sm mx-auto"
          >
            Experience the serene compounds and historical moments of Susilodaya. Scroll down to transition between scenes.
          </motion.p>
        </div>

        {/* View Full Archive Button (appears centered underneath when scrolling ends) */}
        <motion.div 
          style={{ opacity: buttonOpacity, y: buttonY }}
          className="mt-12 z-20"
        >
          <Link href="/gallery" className="inline-block px-8 py-3.5 bg-[#E8A317] text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#6B1D3A] transition-all border border-[#E8A317] rounded-cta">
            View Full Archive ↗
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
