export interface GalleryImage {
  url: string;
  tag: string;
  isSelected: boolean;
  selectedAt?: number;
}

export function parseGalleryImages(data: any): GalleryImage[] {
  if (!data) return [];
  
  // Format 1: Direct images array inside config
  let rawImages = data.images;
  if (!rawImages && Array.isArray(data)) {
    rawImages = data;
  }
  
  if (Array.isArray(rawImages)) {
    return rawImages.map((img: any, idx: number) => {
      if (typeof img === "string") {
        // Fallback mapping for older format based on filename keywords
        let tag = "Viharaya";
        if (img.includes("sil_program")) tag = "Sil Program";
        if (img.includes("prize_giving")) tag = "Prize Giving";
        if (img.includes("classroom")) tag = "Classrooms";
        return {
          url: img,
          tag,
          isSelected: idx < 6,
          selectedAt: Date.now() - (6 - idx) * 1000
        };
      }
      return {
        url: img.url || "",
        tag: img.tag || "Viharaya",
        isSelected: !!img.isSelected,
        selectedAt: img.selectedAt || undefined
      };
    });
  }
  
  return [];
}
