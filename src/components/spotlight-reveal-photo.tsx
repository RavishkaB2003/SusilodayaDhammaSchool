"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SpotlightRevealPhotoProps {
  imageUrl: string;
  alt: string;
}

export default function SpotlightRevealPhoto({ imageUrl, alt }: SpotlightRevealPhotoProps) {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Reset spotlight coordinates out of view
      mouse.current = { x: -999, y: -999 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let raf: number;
    const tick = () => {
      const canvas = canvasRef.current;
      const reveal = revealRef.current;

      if (canvas && reveal && container) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Smooth lerp easing
          if (mouse.current.x === -999) {
            smooth.current.x += (-999 - smooth.current.x) * 0.1;
            smooth.current.y += (-999 - smooth.current.y) * 0.1;
          } else {
            if (smooth.current.x === -999) {
              smooth.current = { ...mouse.current };
            } else {
              smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
              smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
            }
          }

          const SPOTLIGHT_R = 180;
          const grad = ctx.createRadialGradient(
            smooth.current.x, smooth.current.y, 0,
            smooth.current.x, smooth.current.y, SPOTLIGHT_R
          );
          
          grad.addColorStop(0, "rgba(255,255,255,1)");
          grad.addColorStop(0.3, "rgba(255,255,255,0.95)");
          grad.addColorStop(0.6, "rgba(255,255,255,0.5)");
          grad.addColorStop(0.8, "rgba(255,255,255,0.15)");
          grad.addColorStop(1, "rgba(255,255,255,0)");

          ctx.beginPath();
          ctx.arc(smooth.current.x, smooth.current.y, SPOTLIGHT_R, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          const dataUrl = canvas.toDataURL();
          reveal.style.maskImage = `url(${dataUrl})`;
          reveal.style.webkitMaskImage = `url(${dataUrl})`;
          reveal.style.maskSize = "100% 100%";
          reveal.style.webkitMaskSize = "100% 100%";
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-none overflow-hidden cursor-crosshair"
    >
      {/* 1. Base Layer: Grayscale & Dimmed Cover Image */}
      <div className="absolute inset-0 grayscale contrast-[0.85] brightness-[0.7] transition-all duration-500">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2C1B18]/15 to-transparent pointer-events-none"></div>
      </div>

      {/* Hidden canvas to generate mask */}
      <canvas ref={canvasRef} className="hidden" />

      {/* 2. Reveal Layer: Full Color Image (Revealed by Spotlight mask on hover) */}
      <div
        ref={revealRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover scale-[1.02] transition-transform duration-300"
          unoptimized
        />
      </div>
      
      {/* Corner brackets for editorial print aesthetic */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 pointer-events-none" />
    </div>
  );
}
