"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

export default function SaturdayTimeline() {
  const items: TimelineItem[] = [
    {
      time: "08:30 AM - 09:00 AM",
      title: "Morning Assembly & Devotion",
      description: "Traditional gathering of all students and staff. Includes Buddha Vandana, Sutta recitations, and a silent meditation session to set a mindful tone for learning."
    },
    {
      time: "09:00 AM - 10:30 AM",
      title: "Dhamma & Abhidhamma Studies",
      description: "Systematic classroom instruction divided by grade rosters. Students study Dhamma principles, Buddhist history, moral conduct, and Abhidhamma philosophy."
    },
    {
      time: "10:30 AM - 11:30 AM",
      title: "Sutta Recitations & Guidance",
      description: "Interactive storytelling, ethical discussions, and practical guidelines for daily life. Concludes with a blessing and prayer service for peace and wellbeing."
    }
  ];

  // Timeline Container Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  // Slower vertical line draw variant (duration 2.0s)
  const lineVariants = {
    hidden: { height: "0%" },
    visible: {
      height: "100%",
      transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Slower card slide-in variants (duration 1.5s)
  const leftCardVariants = {
    hidden: { opacity: 0, x: -35, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 35, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="py-12 relative max-w-3xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        className="relative pl-8 md:pl-0"
      >
        {/* Extremely thin vertical axis line (Option A) */}
        <motion.div
          variants={lineVariants}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[0.5px] bg-[#6B1D3A]/20 origin-top"
        />

        {/* Timeline items */}
        <div className="space-y-16">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                {/* Minimalist node line intercept dot */}
                <div className="absolute left-[13px] md:left-1/2 top-1.5 md:top-auto w-[6px] h-[6px] bg-[#FFF8F0] border border-[#6B1D3A] -translate-x-[0px] md:-translate-x-[3px] z-10 rounded-full" />

                {/* Left/Right Asymmetrical layout alignment */}
                <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:order-last md:text-left"}`}>
                  <motion.div
                    variants={isEven ? leftCardVariants : rightCardVariants}
                    className="p-6 bg-[#FFF8F0]/80 border border-[#E6DDD0] hover:border-[#6B1D3A] hover:bg-[#FFF8F0] transition-all duration-500 relative rounded-none flex flex-col text-left"
                  >
                    {/* Classic serif timeline index number (Option A) */}
                    <span className="font-serif text-3xl font-light italic text-[#6B1D3A]/30 leading-none mb-2">
                      0{idx + 1}
                    </span>
                    
                    <span className="block text-[9px] font-semibold tracking-[0.2em] text-[#8B5A2B] uppercase">
                      {item.time}
                    </span>
                    <h4 className="text-lg font-normal font-serif text-[#6B1D3A] mt-2 italic">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#1C1C1E]/70 mt-2 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
                
                {/* Spacer block for desktop alignment symmetry */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
