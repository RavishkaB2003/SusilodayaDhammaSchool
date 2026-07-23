"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  url: string;
  tag: string;
  isSelected: boolean;
}

interface MagazineGalleryProps {
  initialImages: GalleryImage[];
}

export default function MagazineGallery({ initialImages = [] }: MagazineGalleryProps) {
  const [selectedTag, setSelectedTag] = useState("All");

  // Local fallback images if no images are uploaded/parsed
  const fallbackList: GalleryImage[] = [
    { url: "/assets/gallery/sil_program.jpg", tag: "Sil Program", isSelected: true },
    { url: "/assets/gallery/prize_giving.jpg", tag: "Prize Giving", isSelected: true },
    { url: "/assets/gallery/classroom.jpg", tag: "Classrooms", isSelected: true },
    { url: "/assets/gallery/temple_entrance.jpg", tag: "Viharaya", isSelected: true },
    { url: "/assets/gallery/sil_program_2.jpg", tag: "Sil Program", isSelected: false },
    { url: "/assets/gallery/prize_giving_2.jpg", tag: "Prize Giving", isSelected: false }
  ];

  const activeList = initialImages.length > 0 ? initialImages : fallbackList;

  // Extract unique tags and sort them
  const tags = ["All", ...Array.from(new Set(activeList.map((img) => img.tag).filter(Boolean)))];

  // Filter images based on selection
  const filteredImages = selectedTag === "All"
    ? activeList
    : activeList.filter((img) => img.tag === selectedTag);

  // Asymmetrical magazine layout grid mapping patterns
  // We alternate height and column layouts dynamically based on indices to create a high-fashion look
  const getLayoutClasses = (idx: number) => {
    const pattern = idx % 6;
    switch (pattern) {
      case 0:
        return "col-span-12 md:col-span-6 lg:col-span-4 aspect-[4/5]"; // Tall vertical card
      case 1:
        return "col-span-12 md:col-span-6 lg:col-span-8 aspect-[16/9] lg:translate-y-8"; // Large wide card
      case 2:
        return "col-span-12 md:col-span-6 lg:col-span-4 aspect-[4/3] lg:-translate-y-4"; // Small horizontal card
      case 3:
        return "col-span-12 md:col-span-6 lg:col-span-4 aspect-square lg:translate-y-12"; // Square card offset
      case 4:
        return "col-span-12 md:col-span-6 lg:col-span-8 aspect-[16/10]"; // Wide card
      case 5:
        return "col-span-12 md:col-span-6 lg:col-span-4 aspect-[4/5] lg:-translate-y-16"; // Offset tall card
      default:
        return "col-span-12 md:col-span-6 lg:col-span-4 aspect-square";
    }
  };

  return (
    <div className="space-y-12">
      
      {/* Category Filter bar */}
      <div className="flex flex-wrap gap-2 md:gap-3 border-b border-[#E6DDD0] pb-6 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border rounded-cta ${
              selectedTag === tag
                ? "bg-[#6B1D3A] text-white border-[#6B1D3A] shadow-sm"
                : "bg-white text-[#1C1C1E] border-[#E6DDD0] hover:bg-[#FFF8F0] hover:border-[#6B1D3A]/20"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Asymmetric Magazine Gallery Grid */}
      <div className="grid grid-cols-12 gap-y-16 gap-x-8 pb-20">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, idx) => {
            const sizeClass = getLayoutClasses(idx);
            
            return (
              <motion.div
                key={img.url}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group bg-[#FFF8F0] border border-[#E6DDD0] p-4 flex flex-col justify-between overflow-hidden shadow-none hover:shadow-[0_24px_48px_rgba(107,29,58,0.04)] hover:border-[#6B1D3A]/25 transition-all duration-500 ${sizeClass}`}
              >
                {/* Photo container with zoom & color reveals */}
                <div className="relative w-full flex-grow overflow-hidden bg-black/5 border border-[#E6DDD0]/75">
                  <img
                    src={img.url}
                    alt={img.tag}
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />
                  {/* Subtle tint mask */}
                  <div className="absolute inset-0 bg-[#6B1D3A]/5 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Vertical offset typography caption details */}
                <div className="flex justify-between items-center pt-4 mt-2">
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-[#E8A317] tracking-[0.2em] uppercase">
                      {img.tag}
                    </span>
                    <h3 className="font-serif text-sm font-normal text-[#6B1D3A] italic leading-tight mt-0.5 group-hover:text-[#E8A317] transition-colors duration-300">
                      Archive Specimen {idx + 1}
                    </h3>
                  </div>
                  <span className="text-xs font-serif text-[#8B5A2B]/40 group-hover:text-[#6B1D3A] group-hover:translate-x-0.5 transition-all duration-300">
                    →
                  </span>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
