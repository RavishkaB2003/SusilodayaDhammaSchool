import { db } from "@/lib/db";
import ScrollGallery from "@/components/scroll-gallery";
import GoogleMap from "@/components/google-map";
import ScrollReveal from "@/components/scroll-reveal";
import SaturdayTimeline from "@/components/saturday-timeline";
import StatsCounter from "@/components/stats-counter";
import HeroSection from "@/components/hero-section";

export default async function HomePage() {
  // Fetch CMS Content dynamically from DB
  let heroData = {
    title: "Nurturing Wisdom & Virtue",
    subtext: "For over 20 years, Susilodaya English Medium Dhamma School has guided generations of students in the path of the Dhamma, cultivating compassionate hearts and clear minds. Join us every Saturday morning.",
    buttonText: "Enroll Journey",
    imageUrl: "/assets/coverPage/cover_hero.png"
  };

  let aboutData = {
    title: "Our Heritage & Vision",
    historyText: "Established in 2006, Susilodaya English Medium Dhamma School stands as a pillar of Buddhist education, conducting weekly lessons in Dhamma, Sutta, and Abhidhamma. Over the past two decades, we have guided more than 2,000 alumni. Today, we continue this noble mission with a dedicated staff of 10 teachers nurturing over 100 active students.",
    scheduleText: "Weekly lessons are held every Saturday morning from 8:30 AM to 11:30 AM.",
    milestones: [
      { year: "2006", event: "Dhamma School founded with 30 students." },
      { year: "2016", event: "Completed 10 years of service, reaching 1,000 cumulative alumni." },
      { year: "2026", event: "Celebrating 20 years of Dhamma education with 10 teachers and 100+ active students." }
    ]
  };

  let galleryImages: any[] = [];

  try {
    const cmsRecords = await db.query.cmsContent.findMany();
    
    const heroRecord = cmsRecords.find((r) => r.sectionKey === "hero");
    if (heroRecord) heroData = heroRecord.contentData as typeof heroData;

    const aboutRecord = cmsRecords.find((r) => r.sectionKey === "about_us");
    if (aboutRecord) aboutData = aboutRecord.contentData as typeof aboutData;

    const galleryRecord = cmsRecords.find((r) => r.sectionKey === "collage_gallery");
    if (galleryRecord && galleryRecord.contentData) {
      const data = galleryRecord.contentData as { images?: any[] };
      if (data.images) galleryImages = data.images;
    }
  } catch (error) {
    console.error("Failed to load CMS content on home page:", error);
  }

  return (
    <div className="bg-parchment min-h-screen relative">
      {/* Cinematic Film Grain Texture */}
      <div className="noise-overlay" />
      
      {/* 1. DYNAMIC FULL-BLEED HERO SECTION (Fades out to cream on scroll down) */}
      <HeroSection heroData={heroData} />

      {/* 2. STATS SECTION (Full Width matching Stitch with animation counters) */}
      <section className="py-20 border-b border-[#E6DDD0] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E6DDD0] border border-[#E6DDD0]">
          <StatsCounter value={100} suffix="+" label="Active Students" />
          <StatsCounter value={20} label="Academic Years" />
          <StatsCounter value={10} suffix=":1" label="Student Ratio" />
          <StatsCounter value={10} label="Study Levels" />
        </ScrollReveal>
      </section>

      {/* 3. ABOUT US SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 border-b border-[#E6DDD0]">
        <ScrollReveal direction="up" className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-2 text-center">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#8B5A2B] uppercase">01 / Our Story</span>
            <h2 className="text-4xl md:text-5xl font-normal font-serif text-[#6B1D3A] italic">
              {aboutData.title}
            </h2>
          </div>
          <p className="text-sm font-normal text-[#1C1C1E]/80 tracking-wide leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:text-[#6B1D3A] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
            {aboutData.historyText}
          </p>
        </ScrollReveal>
      </section>

      {/* 4. TIMELINE SECTION (Full Width matching Stitch) */}
      <section className="py-32 border-b border-[#E6DDD0] overflow-hidden bg-white/20">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8B5A2B] uppercase">Saturday Scholarly Schedule</span>
          <h2 className="text-5xl md:text-6xl italic text-[#6B1D3A]">A Day of Insight</h2>
        </div>
        <SaturdayTimeline />
      </section>

      {/* 5. DYNAMIC SCROLL GALLERY SECTION */}
      <section className="border-b border-[#E6DDD0]">
        <ScrollGallery images={galleryImages} />
      </section>

      {/* 6. MAP / DIRECTIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        {/* Centered Editorial Headings aligned with Our Story */}
        <div className="text-center mb-16 space-y-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8B5A2B] uppercase">03 / Directions</span>
          <h2 className="text-4xl md:text-5xl font-normal font-serif text-[#6B1D3A] italic">Locate Viharaya</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Map details */}
          <div className="lg:col-span-5 space-y-8 pr-0 lg:pr-6 text-left">
            <ScrollReveal className="space-y-5">
              <p className="text-xs text-[#1C1C1E]/80 leading-relaxed">
                We are situated at the peaceful compounds of the Susilodaya Temple in Negombo. Visit us on Saturday mornings.
              </p>

              <div className="space-y-5 pt-4 border-t border-[#E6DDD0]/60">
                <div className="flex items-start space-x-4">
                  <div className="text-[#6B1D3A] mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#E8A317]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs tracking-wider uppercase text-[#8B5A2B]">School Address</h5>
                    <p className="text-xs text-[#1C1C1E] mt-1">Susilodaya Viharaya, Temple Junction, Negombo, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[#6B1D3A] mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#E8A317]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs tracking-wider uppercase text-[#8B5A2B]">Telephone</h5>
                    <p className="text-xs text-[#1C1C1E] mt-1">+94 31 222 3333</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Block: Google Maps iframe embed */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={0.2}>
              <GoogleMap />
            </ScrollReveal>
          </div>

        </div>
      </section>
    </div>
  );
}
