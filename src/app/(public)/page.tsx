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
    historyText: "Established in 2006, Susilodaya Dhamma School stands as a pillar of Buddhist education, conducting weekly lessons in Dhamma, Sutta, and Abhidhamma. Today, we continue this noble mission with a dedicated staff of 10 teachers nurturing over 100 active students.",
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
    <div className="space-y-24 md:space-y-32 pb-24 selection:bg-[#F0E6D6] relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 md:pt-16 px-4 overflow-hidden bg-[radial-gradient(#F0E6D6_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-90">
        <div className="absolute inset-0 bg-[#FFF8F0]/30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Copywriting Info */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <ScrollReveal direction="right">
              <span className="text-[#8B5A2B] font-bold text-xs uppercase tracking-widest bg-[#F0E6D6]/50 px-3 py-1.5 rounded-full">
                Susilodaya Dhamma School
              </span>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif text-[#7A1F1D] leading-[1.1] tracking-tight">
                {heroData.title}
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <p className="text-base sm:text-lg text-[#5C4B47] leading-relaxed max-w-xl">
                {heroData.subtext}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.3}>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/enrollment"
                  className="px-8 py-3.5 bg-[#7A1F1D] hover:bg-[#5C1412] text-white font-semibold rounded-xl shadow-md transition-all duration-200"
                >
                  {heroData.buttonText}
                </Link>
                <Link
                  href="/#about"
                  className="px-8 py-3.5 bg-white border border-[#F0E6D6] hover:bg-[#F9F5EF] text-[#5C4B47] font-semibold rounded-xl transition-all duration-200"
                >
                  Learn History
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Hero Visual Mockup Image */}
          <div className="lg:col-span-6 relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-square rounded-3xl overflow-hidden shadow-xl border border-[#F0E6D6]">
            <ScrollReveal direction="left" delay={0.2}>
              <Image
                src={heroData.imageUrl}
                alt="Dhamma School Cover"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                unoptimized
              />
              {/* Serenely blended overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2C1B18]/15 to-transparent pointer-events-none"></div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US & KEY STATS */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Milestone & History */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-[#7A1F1D]">
                {aboutData.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-[#5C4B47] leading-relaxed">
                {aboutData.historyText}
              </p>
            </ScrollReveal>

            {/* Weekly Schedule Info Block */}
            <ScrollReveal delay={0.15}>
              <div className="p-6 bg-white border border-[#F0E6D6] rounded-2xl shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#7A1F1D] flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#7A1F1D] font-serif">Class Schedule</h4>
                  <p className="text-sm text-[#5C4B47] mt-1 leading-relaxed">{aboutData.scheduleText}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Milestones Timeline */}
            <div className="space-y-6 pt-4 border-t border-[#F0E6D6]">
              <h4 className="text-sm font-bold tracking-wider text-[#8B5A2B] uppercase">Our Journey Timeline</h4>
              <div className="space-y-6 relative border-l border-[#F0E6D6] ml-2.5 pl-6">
                {aboutData.milestones.map((milestone, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#7A1F1D] border border-white"></div>
                    <span className="text-xs font-bold text-[#8B5A2B]">{milestone.year}</span>
                    <p className="text-sm font-semibold text-[#2C1B18] mt-0.5">{milestone.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Bento Stat Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Stat Card 1: Years */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-white border border-[#F0E6D6] p-6 rounded-2xl shadow-sm text-center">
                <span className="block text-4xl md:text-5xl font-extrabold font-serif text-[#7A1F1D]">20</span>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase tracking-wider mt-2">Years Active</span>
              </div>
            </ScrollReveal>

            {/* Stat Card 2: Current Students */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="bg-[#FFF8F0] border border-[#F0E6D6] p-6 rounded-2xl shadow-sm text-center">
                <span className="block text-4xl md:text-5xl font-extrabold font-serif text-[#7A1F1D]">100+</span>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase tracking-wider mt-2">Students</span>
              </div>
            </ScrollReveal>

            {/* Stat Card 3: Dedicated Teachers */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-[#FFF8F0] border border-[#F0E6D6] p-6 rounded-2xl shadow-sm text-center">
                <span className="block text-4xl md:text-5xl font-extrabold font-serif text-[#7A1F1D]">10</span>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase tracking-wider mt-2">Teachers</span>
              </div>
            </ScrollReveal>

            {/* Stat Card 4: Alumni */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="bg-white border border-[#F0E6D6] p-6 rounded-2xl shadow-sm text-center">
                <span className="block text-4xl md:text-5xl font-extrabold font-serif text-[#7A1F1D]">2,000+</span>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase tracking-wider mt-2">Alumni Guided</span>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3. GALLERY COLLAGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-[#7A1F1D]">School Gallery</h2>
            <p className="text-sm text-[#5C4B47] mt-2">
              Explore snapshots of our cultural events, annual prize givings, and religious observances.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <CollageGallery images={galleryImages} />
        </ScrollReveal>
      </section>

      {/* 4. FIND US / CANVAS MAP LOCATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Map details */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-[#7A1F1D]">Find Us</h2>
              <p className="text-sm text-[#5C4B47] mt-2">
                We are situated at the peaceful compounds of the Susilodaya Temple. Visit us on Saturday mornings.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="text-[#7A1F1D] mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-[#2C1B18]">School Address</h5>
                    <p className="text-xs text-[#5C4B47] mt-0.5">Susilodaya Viharaya, Temple Road, Colombo, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="text-[#7A1F1D] mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-[#2C1B18]">Telephone</h5>
                    <p className="text-xs text-[#5C4B47] mt-0.5">+94 11 234 5678</p>
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
