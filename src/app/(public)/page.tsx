import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import CollageGallery from "@/components/collage-gallery";
import CanvasMap from "@/components/canvas-map";
import ScrollReveal from "@/components/scroll-reveal";

export default async function HomePage() {
  // 1. Fetch CMS Content dynamically from DB
  let heroData = {
    title: "Nurturing Wisdom & Virtue",
    subtext: "For over 20 years, Susilodaya Dhamma School has guided generations of students in the path of the Dhamma, cultivating compassionate hearts and clear minds. Join us every Saturday morning.",
    buttonText: "Enroll Journey",
    imageUrl: "/assets/coverPage/Cover Photo.jpg"
  };

  let aboutData = {
    title: "Our Heritage & Vision",
    historyText: "Established in 2006, Susilodaya Dhamma School stands as a pillar of Buddhist education, conducting weekly lessons in Dhamma, Sutta, and Abhidhamma. Over the past two decades, we have guided more than 2,000 alumni. Today, we continue this noble mission with a dedicated staff of 10 teachers nurturing over 100 active students.",
    scheduleText: "Weekly lessons are held every Saturday morning from 8:30 AM to 11:30 AM.",
    milestones: [
      { year: "2006", event: "Dhamma School founded with 30 students." },
      { year: "2016", event: "Completed 10 years of service, reaching 1,000 cumulative alumni." },
      { year: "2026", event: "Celebrating 20 years of Dhamma education with 10 teachers and 100+ active students." }
    ]
  };

  let galleryImages: string[] = [];

  try {
    const cmsRecords = await db.query.cmsContent.findMany();
    
    const heroRecord = cmsRecords.find((r) => r.sectionKey === "hero");
    if (heroRecord) heroData = heroRecord.contentData as typeof heroData;

    const aboutRecord = cmsRecords.find((r) => r.sectionKey === "about_us");
    if (aboutRecord) aboutData = aboutRecord.contentData as typeof aboutData;

    const galleryRecord = cmsRecords.find((r) => r.sectionKey === "collage_gallery");
    if (galleryRecord && galleryRecord.contentData) {
      const data = galleryRecord.contentData as { images?: string[] };
      if (data.images) galleryImages = data.images;
    }
  } catch (error) {
    console.error("Failed to load CMS content on home page:", error);
  }

  return (
    <div className="bg-parchment min-h-screen relative">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 border-b border-[#E6DDD0]">
        
        {/* Frame lines inspired by primer.com */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E6DDD0]/60 pointer-events-none hidden lg:block"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 py-12">
          
          {/* Hero Copywriting Info */}
          <div className="lg:col-span-6 space-y-8 pr-0 lg:pr-8">
            <ScrollReveal direction="right">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#8B5A2B] uppercase border border-[#8B5A2B]/20 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm">
                Venerable Heritage · Since 2006
              </span>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal font-serif text-[#7A1F1D] leading-[0.95] tracking-tight italic">
                {heroData.title}
              </h1>
            </ScrollReveal>

            {/* Double-line gold thread divider framing the paragraph */}
            <div className="border-y border-[#8B5A2B]/15 py-6">
              <ScrollReveal direction="right" delay={0.2}>
                <p className="text-base text-[#5C4B47] leading-relaxed max-w-xl">
                  {heroData.subtext}
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right" delay={0.3}>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/enrollment"
                  className="px-8 py-3.5 bg-[#7A1F1D] hover:bg-[#5C1412] text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-full shadow-md transition-all duration-300 flex items-center space-x-2"
                >
                  <span>{heroData.buttonText}</span>
                  <span>↗</span>
                </Link>
                <Link
                  href="/#about"
                  className="px-8 py-3.5 bg-white/60 border border-[#E6DDD0] hover:bg-[#FFF8F0] text-[#5C4B47] text-[11px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300"
                >
                  Learn History
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Hero Visual Mockup Image (Framed layout) */}
          <div className="lg:col-span-6 pl-0 lg:pl-8 flex justify-center">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative w-full aspect-[4/3] max-w-[540px] rounded-[32px] overflow-hidden border border-[#E6DDD0] p-4 bg-white/40 shadow-xl">
                <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                  <Image
                    src={heroData.imageUrl}
                    alt="Dhamma School Cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2C1B18]/10 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US & KEY STATS (Asymmetric Layout) */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 border-b border-[#E6DDD0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Milestone & History */}
          <div className="lg:col-span-7 space-y-10">
            <ScrollReveal>
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#8B5A2B] uppercase">01 / Our Story</span>
                <h2 className="text-4xl md:text-5xl font-normal font-serif text-[#7A1F1D] italic">
                  {aboutData.title}
                </h2>
              </div>
            </ScrollReveal>

            {/* History paragraph with Drop Cap */}
            <ScrollReveal delay={0.1}>
              <p className="text-base text-[#5C4B47] leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:text-[#7A1F1D] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                {aboutData.historyText}
              </p>
            </ScrollReveal>

            {/* Weekly Schedule Info Block */}
            <ScrollReveal delay={0.15}>
              <div className="p-6 bg-white/60 border border-[#E6DDD0] rounded-2xl flex items-start space-x-5">
                <div className="p-3 bg-[#FFF8F0] border border-[#E6DDD0] rounded-xl text-[#7A1F1D] flex-shrink-0">
                  <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#7A1F1D] font-serif italic">Class Schedule</h4>
                  <p className="text-xs text-[#5C4B47] mt-1 leading-relaxed">{aboutData.scheduleText}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Milestones Timeline */}
            <div className="space-y-6 pt-8 border-t border-[#E6DDD0]">
              <h4 className="text-[10px] font-bold tracking-[0.25em] text-[#8B5A2B] uppercase">Historical Milestones</h4>
              <div className="space-y-8 relative border-l border-[#E6DDD0] ml-2.5 pl-6">
                {aboutData.milestones.map((milestone, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[32px] top-1 w-3 h-3 rounded-full bg-[#E6DDD0] border-2 border-white group-hover:bg-[#7A1F1D] transition-colors duration-300"></div>
                    <span className="text-[11px] font-bold tracking-wider text-[#8B5A2B]">{milestone.year}</span>
                    <p className="text-sm font-semibold text-[#2C1B18] mt-0.5">{milestone.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Bento Stat Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-5 lg:sticky lg:top-36">
            
            {/* Stat Card 1 */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-white/60 border border-[#E6DDD0] p-8 rounded-[28px] text-center hover:shadow-md transition-all duration-300">
                <span className="block text-5xl font-normal font-serif text-[#7A1F1D] italic">20</span>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-[0.2em] mt-3">Years Active</span>
              </div>
            </ScrollReveal>

            {/* Stat Card 2 */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="bg-white/60 border border-[#E6DDD0] p-8 rounded-[28px] text-center hover:shadow-md transition-all duration-300">
                <span className="block text-5xl font-normal font-serif text-[#7A1F1D] italic">100+</span>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-[0.2em] mt-3">Students</span>
              </div>
            </ScrollReveal>

            {/* Stat Card 3 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-white/60 border border-[#E6DDD0] p-8 rounded-[28px] text-center hover:shadow-md transition-all duration-300">
                <span className="block text-5xl font-normal font-serif text-[#7A1F1D] italic">10</span>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-[0.2em] mt-3">Dhamma Teachers</span>
              </div>
            </ScrollReveal>

            {/* Stat Card 4 */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="bg-white/60 border border-[#E6DDD0] p-8 rounded-[28px] text-center hover:shadow-md transition-all duration-300">
                <span className="block text-5xl font-normal font-serif text-[#7A1F1D] italic">2,000+</span>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-[0.2em] mt-3">Alumni Guided</span>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3. GALLERY COLLAGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 border-b border-[#E6DDD0]">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#8B5A2B] uppercase">02 / Gallery</span>
            <h2 className="text-4xl md:text-5xl font-normal font-serif text-[#7A1F1D] mt-2 italic">Captured Moments</h2>
            <p className="text-xs text-[#5C4B47] mt-3 leading-relaxed">
              Explore snapshots of our cultural events, annual prize givings, and religious observances.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <CollageGallery images={galleryImages} />
        </ScrollReveal>
      </section>

      {/* 4. FIND US / CANVAS MAP LOCATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Map details */}
          <div className="lg:col-span-5 space-y-8 pr-0 lg:pr-6">
            <ScrollReveal>
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#8B5A2B] uppercase">03 / Directions</span>
                <h2 className="text-4xl md:text-5xl font-normal font-serif text-[#7A1F1D] italic">Locate Viharaya</h2>
              </div>
              <p className="text-xs text-[#5C4B47] mt-3 leading-relaxed">
                We are situated at the peaceful compounds of the Susilodaya Temple. Visit us on Saturday mornings.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="text-[#7A1F1D] mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs tracking-wider uppercase text-[#8B5A2B]">School Address</h5>
                    <p className="text-xs text-[#5C4B47] mt-1">Susilodaya Viharaya, Temple Road, Colombo, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[#7A1F1D] mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs tracking-wider uppercase text-[#8B5A2B]">Telephone</h5>
                    <p className="text-xs text-[#5C4B47] mt-1">+94 11 234 5678</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Block: Custom Canvas Map */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={0.2}>
              <CanvasMap />
            </ScrollReveal>
          </div>

        </div>
      </section>

    </div>
  );
}
