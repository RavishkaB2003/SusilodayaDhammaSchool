"use client";

import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  style?: any;
}

export default function AnimatedHeading({ text, className = "", style }: AnimatedHeadingProps) {
  // Split title by words
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const childVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.h1
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={style}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-3 py-1">
          <motion.span
            variants={childVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
