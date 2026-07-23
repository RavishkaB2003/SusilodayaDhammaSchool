"use server";

import { db } from "@/lib/db";
import { cmsContent } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { Jimp } from "jimp";
import { createClient } from "@/lib/supabase/server";

import { GalleryImage, parseGalleryImages } from "@/lib/gallery-helpers";

export async function uploadGalleryImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file was attached" };
    }

    const tag = (formData.get("tag") as string) || "Viharaya";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Fetch desaturate setting from gallery_config. Default to true.
    let desaturate = true;
    try {
      const configRecord = await db.query.cmsContent.findFirst({
        where: eq(cmsContent.sectionKey, "gallery_config")
      });
      if (configRecord && configRecord.contentData) {
        const data = configRecord.contentData as { desaturate?: boolean };
        if (data.desaturate !== undefined) desaturate = data.desaturate;
      }
    } catch (e) {
      console.warn("Could not load gallery_config, defaulting desaturate to true", e);
    }

    // 1. Process image on the server using Jimp (conditional desaturation)
    let processedBuffer = buffer;
    const mimeType = (file.type || "image/jpeg") as any;

    if (desaturate) {
      const image = await Jimp.read(buffer);
      image.greyscale();
      processedBuffer = (await image.getBuffer(mimeType)) as any;
    }

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    let relativeUrl = `/assets/gallery/${filename}`;

    // 2. Try uploading to Supabase Storage first, fallback to local file system
    let uploadedToSupabase = false;
    try {
      const supabase = await createClient();
      // Try to upload to "gallery" bucket
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(filename, processedBuffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from("gallery")
          .getPublicUrl(filename);
        if (publicUrlData?.publicUrl) {
          relativeUrl = publicUrlData.publicUrl;
          uploadedToSupabase = true;
        }
      }
    } catch (e) {
      console.warn("Supabase storage upload failed or unconfigured, falling back to local storage:", e);
    }

    if (!uploadedToSupabase) {
      // Save locally under public/assets/gallery/
      const uploadDir = path.join(process.cwd(), "public", "assets", "gallery");
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, processedBuffer);
    }

    // 3. Update database record for collage_gallery
    const existing = await db.query.cmsContent.findFirst({
      where: eq(cmsContent.sectionKey, "collage_gallery"),
    });

    const parsedImages = parseGalleryImages(existing ? existing.contentData : null);
    
    // Create new gallery image object
    const newImage = {
      url: relativeUrl,
      tag: tag,
      isSelected: false,
      selectedAt: undefined
    };

    // Prepend new image so it appears first in administrative lists
    parsedImages.unshift(newImage);

    if (existing) {
      await db
        .update(cmsContent)
        .set({
          contentData: { images: parsedImages },
          updatedAt: new Date(),
        })
        .where(eq(cmsContent.sectionKey, "collage_gallery"));
    } else {
      await db.insert(cmsContent).values({
        sectionKey: "collage_gallery",
        contentData: { images: parsedImages },
      });
    }

    return { success: true, imageUrl: relativeUrl };
  } catch (error: any) {
    console.error("CMS Upload Server Action error:", error);
    return { error: error.message || "Failed to upload and process image" };
  }
}

export async function updateCmsTexts(input: {
  heroTitle: string;
  heroSubtext: string;
  brandText: string;
  footerText: string;
}) {
  try {
    // Update Hero
    const heroExisting = await db.query.cmsContent.findFirst({
      where: eq(cmsContent.sectionKey, "hero"),
    });
    if (heroExisting) {
      const currentContent = heroExisting.contentData as any;
      await db
        .update(cmsContent)
        .set({
          contentData: {
            ...currentContent,
            title: input.heroTitle,
            subtext: input.heroSubtext,
          },
          updatedAt: new Date(),
        })
        .where(eq(cmsContent.sectionKey, "hero"));
    } else {
      await db.insert(cmsContent).values({
        sectionKey: "hero",
        contentData: {
          title: input.heroTitle,
          subtext: input.heroSubtext,
          buttonText: "Enroll Journey",
          imageUrl: "/assets/coverPage/Cover Photo.jpg",
        },
      });
    }

    // Update config/brand texts
    const configExisting = await db.query.cmsContent.findFirst({
      where: eq(cmsContent.sectionKey, "config"),
    });
    const configData = { brandText: input.brandText, footerText: input.footerText };
    if (configExisting) {
      await db
        .update(cmsContent)
        .set({ contentData: configData, updatedAt: new Date() })
        .where(eq(cmsContent.sectionKey, "config"));
    } else {
      await db.insert(cmsContent).values({
        sectionKey: "config",
        contentData: configData,
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error("Cms update texts error:", error);
    return { error: error.message || "Failed to update texts" };
  }
}

export async function getCmsData() {
  try {
    const cmsRecords = await db.query.cmsContent.findMany();
    const formatted: Record<string, any> = {};
    cmsRecords.forEach((r) => {
      formatted[r.sectionKey] = r.contentData;
    });
    return { success: true, cms: formatted };
  } catch (error: any) {
    console.error("getCmsData error:", error);
    return { error: error.message || "Failed to fetch CMS data" };
  }
}

export async function updateGalleryConfig(desaturate: boolean) {
  try {
    const existing = await db.query.cmsContent.findFirst({
      where: eq(cmsContent.sectionKey, "gallery_config"),
    });

    if (existing) {
      await db.update(cmsContent)
        .set({
          contentData: { desaturate },
          updatedAt: new Date(),
        })
        .where(eq(cmsContent.sectionKey, "gallery_config"));
    } else {
      await db.insert(cmsContent)
        .values({
          sectionKey: "gallery_config",
          contentData: { desaturate },
        });
    }
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update gallery config:", error);
    return { error: error.message || "Failed to update configuration" };
  }
}

export async function updateGallerySelections(selectedUrls: string[]) {
  try {
    const existing = await db.query.cmsContent.findFirst({
      where: eq(cmsContent.sectionKey, "collage_gallery")
    });

    if (!existing) {
      return { error: "No gallery records found" };
    }

    const currentImages = parseGalleryImages(existing.contentData);
    
    // Determine which ones are newly selected (to assign them a new timestamp)
    const updatedImages = currentImages.map(img => {
      const isNowSelected = selectedUrls.includes(img.url);
      const wasSelected = img.isSelected;
      
      let selectedAt = img.selectedAt;
      if (isNowSelected && !wasSelected) {
        selectedAt = Date.now(); // Newly selected
      } else if (!isNowSelected) {
        selectedAt = undefined;
      }
      
      return {
        ...img,
        isSelected: isNowSelected,
        selectedAt
      };
    });

    // Check if selected count exceeds 6
    const selectedList = updatedImages.filter(img => img.isSelected);
    if (selectedList.length > 6) {
      // Sort selected list by selectedAt (oldest first)
      selectedList.sort((a, b) => (a.selectedAt || 0) - (b.selectedAt || 0));
      
      // Get the oldest one
      const oldest = selectedList[0];
      
      // Deselect the oldest one in the main list
      const oldestInMain = updatedImages.find(img => img.url === oldest.url);
      if (oldestInMain) {
        oldestInMain.isSelected = false;
        oldestInMain.selectedAt = undefined;
      }
    }

    // Save to database
    await db.update(cmsContent)
      .set({
        contentData: { images: updatedImages },
        updatedAt: new Date()
      })
      .where(eq(cmsContent.sectionKey, "collage_gallery"));

    return { success: true, updatedImages };
  } catch (error: any) {
    console.error("updateGallerySelections error:", error);
    return { error: error.message || "Failed to update selections" };
  }
}

export interface CmsEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export async function addCmsEvent(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    if (!title || !date || !time) {
      return { error: "Title, Date and Time are required fields" };
    }

    let imageUrl = "";
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      let relativeUrl = `/assets/events/${filename}`;
      let uploadedToSupabase = false;

      // Try uploading to Supabase "events" bucket first
      try {
        const supabase = await createClient();
        const { data, error } = await supabase.storage
          .from("events")
          .upload(filename, buffer, {
            contentType: file.type || "image/jpeg",
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from("events")
            .getPublicUrl(filename);
          if (publicUrlData?.publicUrl) {
            relativeUrl = publicUrlData.publicUrl;
            uploadedToSupabase = true;
          }
        }
      } catch (e) {
        console.warn("Supabase events bucket upload failed, using local fallback", e);
      }

      if (!uploadedToSupabase) {
        const uploadDir = path.join(process.cwd(), "public", "assets", "events");
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);
      }
      imageUrl = relativeUrl;
    }

    // Update database events list
    const existing = await db.query.cmsContent.findFirst({
      where: eq(cmsContent.sectionKey, "events")
    });

    let eventsList: CmsEvent[] = [];
    if (existing && existing.contentData) {
      const data = existing.contentData as { events?: CmsEvent[] };
      if (Array.isArray(data.events)) {
        eventsList = [...data.events];
      }
    }

    const newEvent: CmsEvent = {
      id: Date.now().toString(),
      title,
      date,
      time,
      location: location || "Temple Grounds",
      description: description || "",
      imageUrl: imageUrl || undefined
    };

    eventsList.push(newEvent);

    // Sort events by date ascending
    eventsList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (existing) {
      await db.update(cmsContent)
        .set({
          contentData: { events: eventsList },
          updatedAt: new Date()
        })
        .where(eq(cmsContent.sectionKey, "events"));
    } else {
      await db.insert(cmsContent)
        .values({
          sectionKey: "events",
          contentData: { events: eventsList }
        });
    }

    return { success: true, event: newEvent };
  } catch (error: any) {
    console.error("addCmsEvent error:", error);
    return { error: error.message || "Failed to add upcoming event" };
  }
}

export async function deleteCmsEvent(eventId: string) {
  try {
    const existing = await db.query.cmsContent.findFirst({
      where: eq(cmsContent.sectionKey, "events")
    });

    if (!existing) {
      return { error: "No events found" };
    }

    let eventsList: CmsEvent[] = [];
    const data = existing.contentData as { events?: CmsEvent[] };
    if (Array.isArray(data.events)) {
      eventsList = data.events.filter(ev => ev.id !== eventId);
    }

    await db.update(cmsContent)
      .set({
        contentData: { events: eventsList },
        updatedAt: new Date()
      })
      .where(eq(cmsContent.sectionKey, "events"));

    return { success: true };
  } catch (error: any) {
    console.error("deleteCmsEvent error:", error);
    return { error: error.message || "Failed to delete event" };
  }
}
