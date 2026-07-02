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
        staggerChildren: 0.3
      }
    }
  };

  // Vertical line draw variant
  const lineVariants = {
    hidden: { height: "0%" },
    visible: {
      height: "100%",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Card slide-in variant
  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="py-12 relative max-w-3xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative pl-8 md:pl-0"
      >
        {/* Vertical timeline axis line (drawn on scroll) */}
        <motion.div
          variants={lineVariants}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#1C1C1E] origin-top"
        />

        {/* Timeline items */}
        <div className="space-y-16">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                {/* Timeline node node */}
                <div className="absolute left-[11px] md:left-1/2 top-1.5 md:top-auto w-[10px] h-[10px] bg-[#FFF8F0] border-2 border-[#1C1C1E] -translate-x-[2px] md:-translate-x-[5px] z-10" />

                {/* Left/Right Asymmetrical layout alignment */}
                <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:order-last md:text-left"}`}>
                  <motion.div
                    variants={cardVariants}
                    className="p-6 bg-[#F0E6D6] border border-black/10 hover:border-[#E8A317] transition-all duration-300 relative group overflow-hidden"
                  >
                    {/* Hover saffron fill-wipe effect */}
                    <div className="absolute inset-0 bg-[#E8A317] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] -z-10" />
                    
                    <span className="block text-[10px] font-bold tracking-widest text-[#6B1D3A] uppercase group-hover:text-white transition-colors duration-300">
                      {item.time}
                    </span>
                    <h4 className="text-xl font-normal font-serif text-[#1C1C1E] mt-2 italic group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#1C1C1E]/70 mt-2 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
                
                {/* Placeholder spacer for desktop symmetry */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
