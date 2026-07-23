"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatsCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatsCounter({ value, suffix = "", label }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 1.5; // seconds
      const steps = Math.min(end, 60);
      const stepTime = (duration * 1000) / steps;
      let stepCount = 0;

      const timer = setInterval(() => {
        stepCount += 1;
        const progress = stepCount / steps;
        // Ease out quadratic
        const currentVal = Math.round(end * (progress * (2 - progress)));
        setCount(currentVal);
        
        if (stepCount >= steps) {
          setCount(end);
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="bg-[#FFF8F0] p-12 flex flex-col items-center text-center w-full transition-colors duration-500 hover:bg-[#E8A317]/5">
      <span className="font-serif italic text-6xl text-[#E8A317] tracking-tight">
        {count}
        {suffix}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1C1E]/70 mt-3">{label}</span>
    </div>
  );
}
