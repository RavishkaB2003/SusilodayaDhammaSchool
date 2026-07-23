import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { cmsContent } from "@/lib/db/schema";
import { parseGalleryImages } from "@/lib/gallery-helpers";
import MagazineGallery from "@/components/magazine-gallery";

export default async function GalleryArchivePage() {
  let parsedImages: any[] = [];

  try {
    const galleryRecord = await db.query.cmsContent.findFirst({
      where: eq(cmsContent.sectionKey, "collage_gallery")
    });
    if (galleryRecord) {
      parsedImages = parseGalleryImages(galleryRecord.contentData);
    }
  } catch (error) {
    console.error("Failed to load CMS gallery images:", error);
  }

  return (
    <div className="bg-parchment min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Cinematic Film Grain Texture */}
      <div className="noise-overlay" />
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="border-b border-[#E6DDD0] pb-6">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8B5A2B] uppercase">Gallery Archive</span>
          <h1 className="text-4xl md:text-5xl font-normal font-serif text-[#6B1D3A] mt-2 italic leading-tight">
            Captured Moments & Rites
          </h1>
          <p className="text-xs text-[#1C1C1E]/70 mt-2 max-w-xl">
            A comprehensive visual archive of the Susilodaya Dhamma School community, documenting student assemblies, meritorious Sil programs, and annual prize givings.
          </p>
        </div>

        <MagazineGallery initialImages={parsedImages} />
      </div>
    </div>
  );
}
