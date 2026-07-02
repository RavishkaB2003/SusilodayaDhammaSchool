"use client";

import { useState } from "react";
import Image from "next/image";

interface CollageGalleryProps {
  images?: string[];
}

export default function CollageGallery({ images = [] }: CollageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fallback default gallery images if none are passed
  const galleryImages = images.length > 0 ? images : [
    "/assets/gallery/sil_program.jpg",
    "/assets/gallery/prize_giving.jpg",
    "/assets/gallery/classroom.jpg",
    "/assets/gallery/temple_entrance.jpg"
  ];

  // Map images to unique grid shapes and classes for an asymmetrical mosaic
  const gridClasses = [
    "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto rounded-none overflow-hidden relative border border-[#E6DDD0] shadow-none cursor-pointer group",
    "md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto rounded-none overflow-hidden relative border border-[#E6DDD0] shadow-none cursor-pointer group",
    "md:col-span-1 md:row-span-1 aspect-square rounded-none overflow-hidden relative border border-[#E6DDD0] shadow-none cursor-pointer group",
    "md:col-span-1 md:row-span-1 aspect-square rounded-none overflow-hidden relative border border-[#E6DDD0] shadow-none cursor-pointer group"
  ];

  return (
    <div className="space-y-6">
      {/* Asymmetrical Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[220px]">
        {galleryImages.slice(0, 4).map((src, index) => (
          <div
            key={src + index}
            onClick={() => setSelectedImage(src)}
            className={`${gridClasses[index] || "rounded-none overflow-hidden relative border border-[#E6DDD0] cursor-pointer group"}`}
          >
            {/* Image Wrapper */}
            <div className="w-full h-full relative overflow-hidden bg-[#F9F5EF]">
              <Image
                src={src}
                alt={`Susilodaya Gallery ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized // In case local mock paths are used
              />
              {/* Saffron Gradient Mask Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#6B1D3A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-sm font-semibold tracking-wide font-serif">View Full Image</span>
              </div>

              {/* Watermark Lotus Icon overlay (3% opacity) */}
              <div className="absolute top-4 right-4 text-black opacity-[0.03] pointer-events-none transition-transform duration-500 group-hover:rotate-45">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C11.5 5 8 8.5 5.5 8.5C3 8.5 2 9.5 2 11C2 12.5 3 13.5 5.5 13.5C8 13.5 11.5 17 12 20C12.5 17 16 13.5 18.5 13.5C21 13.5 22 12.5 22 11C22 9.5 21 8.5 18.5 8.5C16 8.5 12.5 5 12 2Z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out animate-fadeIn"
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
