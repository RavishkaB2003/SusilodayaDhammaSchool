"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CollageGalleryProps {
  images?: string[];
}

export default function CollageGallery({ images = [] }: CollageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Fallback default gallery images if none are passed
  const allImages = images.length > 0 ? images : [
    "/assets/gallery/sil_program.jpg",
    "/assets/gallery/prize_giving.jpg",
    "/assets/gallery/classroom.jpg",
    "/assets/gallery/temple_entrance.jpg",
    "/assets/gallery/sil_program_2.jpg",
    "/assets/gallery/prize_giving_2.jpg",
    "/assets/gallery/classroom_2.jpg",
    "/assets/gallery/temple_entrance_2.jpg",
    "/assets/gallery/sil_program_3.jpg",
    "/assets/gallery/prize_giving_3.jpg"
  ];

  // Number of images to show initially and increment by
  const [visibleCount, setVisibleCount] = useState(4);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // If we have more images to show, reveal 3 more on scroll
          setVisibleCount((prev) => Math.min(prev + 3, allImages.length));
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [allImages.length]);

  // Asymmetrical grid column configurations for mosaic effect
  const getGridSpan = (index: number) => {
    const mod = index % 4;
    if (mod === 0) return "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto";
    if (mod === 1) return "md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto";
    return "md:col-span-1 md:row-span-1 aspect-square";
  };

  const visibleImages = allImages.slice(0, visibleCount);

  return (
    <div className="space-y-12">
      {/* Asymmetrical Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[220px]">
        <AnimatePresence>
          {visibleImages.map((src, index) => (
            <motion.div
              key={src + index}
              onClick={() => setSelectedImage(src)}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-none overflow-hidden relative border border-[#E6DDD0] cursor-pointer group bg-[#F9F5EF] ${getGridSpan(
                index
              )}`}
            >
              {/* Image Wrapper */}
              <div className="w-full h-full relative overflow-hidden">
                <Image
                  src={src}
                  alt={`Susilodaya Gallery ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  unoptimized
                />
                
                {/* Saffron Gradient Mask Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6B1D3A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
                  <span className="text-white text-sm font-semibold tracking-wide font-serif">View Full Image ↗</span>
                </div>

                {/* Watermark Lotus Icon overlay (3% opacity) */}
                <div className="absolute top-4 right-4 text-black opacity-[0.03] pointer-events-none transition-transform duration-500 group-hover:rotate-45">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C11.5 5 8 8.5 5.5 8.5C3 8.5 2 9.5 2 11C2 12.5 3 13.5 5.5 13.5C8 13.5 11.5 17 12 20C12.5 17 16 13.5 18.5 13.5C21 13.5 22 12.5 22 11C22 9.5 21 8.5 18.5 8.5C16 8.5 12.5 5 12 2Z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Invisible anchor element to trigger infinite scroll load */}
      {visibleCount < allImages.length && (
        <div ref={loadMoreRef} className="py-6 flex justify-center items-center">
          <div className="w-8 h-8 border-2 border-t-[#6B1D3A] border-r-transparent border-b-[#E8A317] border-l-transparent animate-spin" />
        </div>
      )}

      {/* Lightbox Overlay Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Enlarged Gallery"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          {/* Close trigger button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-[#E8A317] transition-colors"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
