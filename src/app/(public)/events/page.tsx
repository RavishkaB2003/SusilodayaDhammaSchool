import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { cmsContent } from "@/lib/db/schema";
import ScrollReveal from "@/components/scroll-reveal";
import { CmsEvent } from "@/app/actions/cms";
import Link from "next/link";

export const metadata = {
  title: "Upcoming Events & Bulletin | Susilodaya English Medium Dhamma School",
  description: "Explore scheduled special events, Sil programs, assemblies, and religious festivals at Susilodaya Temple.",
};

function parseDateParts(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return { month: "EVENT", day: "•", year: "" };
    }
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return {
      month: months[d.getMonth()],
      day: d.getDate().toString().padStart(2, "0"),
      year: d.getFullYear()
    };
  } catch (e) {
    return { month: "EVENT", day: "•", year: "" };
  }
}

export default async function EventsPage() {
  let eventsList: CmsEvent[] = [];

  // Fallback elegant mock events if db has none
  const mockEvents: CmsEvent[] = [
    {
      id: "mock-1",
      title: "Saturday Special Sil Program",
      date: "2026-07-18",
      time: "06:00 AM - 05:00 PM",
      location: "Bodhi Tree Pavilion",
      description: "A full-day mindfulness retreat for pupils, featuring guided meditation, Buddha Puja devotionals, and Dhamma discussions under resident monks.",
      imageUrl: "/assets/gallery/sil_program.jpg"
    },
    {
      id: "mock-2",
      title: "Vassana Katina Robe Ceremony",
      date: "2026-10-24",
      time: "08:30 AM - 12:00 PM",
      location: "Main Viharaya Grounds",
      description: "The annual sacred Katina Robe offering ceremony at Susilodaya. Participate in morning alms, chanting devotions, and robe presentation processionals.",
      imageUrl: "/assets/gallery/temple_entrance.jpg"
    },
    {
      id: "mock-3",
      title: "Annual Academic Prize Giving",
      date: "2026-12-05",
      time: "09:00 AM - 01:00 PM",
      location: "Main School Auditorium",
      description: "Honoring academic excellence, regular Saturday attendance, and exemplary conduct. Merit plaques will be distributed followed by student cultural recitals.",
      imageUrl: "/assets/gallery/prize_giving.jpg"
    }
  ];

  try {
    const record = await db.query.cmsContent.findFirst({
      where: eq(cmsContent.sectionKey, "events")
    });
    if (record && record.contentData) {
      const data = record.contentData as { events?: CmsEvent[] };
      if (Array.isArray(data.events) && data.events.length > 0) {
        eventsList = data.events;
      }
    }
  } catch (error) {
    console.error("Failed to load events from db:", error);
  }

  // Fall back to mocks if list is empty
  const activeEvents = eventsList.length > 0 ? eventsList : mockEvents;

  return (
    <div className="relative min-h-[90vh] bg-parchment py-16">
      {/* Film Grain Noise overlay */}
      <div className="noise-overlay" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 relative z-10">
        
        {/* Title Header Block */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <ScrollReveal>
            <span className="text-[#6B1D3A] font-bold text-xs uppercase tracking-widest bg-[#F0E6D6]/50 px-3 py-1.5 rounded-badge border border-[#E8A317]/20">
              Bulletin Board
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl font-normal font-serif text-[#6B1D3A] italic">Upcoming Events</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-sm text-[#1C1C1E] leading-relaxed">
              Explore scheduled assemblies, religious programs, and student gatherings. Mark your calendar and join us in our Saturday English Medium Dhamma learning path.
            </p>
          </ScrollReveal>
        </div>

        {/* Antique Bulletin Board Grid (Asymmetric Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeEvents.map((ev, idx) => {
            const dateParts = parseDateParts(ev.date);
            // Dynamic asymmetrical height adjustments for magazine-style interest
            const isTallCard = idx % 3 === 1;

            return (
              <ScrollReveal key={ev.id} delay={idx * 0.1}>
                <div className={`group bg-white border border-[#E6DDD0] hover:border-[#6B1D3A]/30 p-6 flex flex-col justify-between transition-all hover:shadow-[0_12px_24px_rgba(107,29,58,0.03)] duration-500 h-full ${
                  isTallCard ? "md:translate-y-4" : ""
                }`}>
                  
                  <div className="space-y-4">
                    {/* Event image card frame */}
                    {ev.imageUrl && (
                      <div className="w-full aspect-[16/10] overflow-hidden bg-black/5 border border-[#E6DDD0]/75 relative">
                        <img 
                          src={ev.imageUrl} 
                          alt={ev.title} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                        />
                        <div className="absolute inset-0 bg-[#6B1D3A]/5 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                      </div>
                    )}

                    <div className="flex gap-4 items-start pt-2">
                      {/* Serif Date Badge block */}
                      <div className="flex flex-col items-center justify-center bg-[#FFF8F0] border border-[#E6DDD0] p-2 min-w-[54px] text-center">
                        <span className="text-[10px] font-bold text-[#837561] tracking-wider uppercase font-sans">
                          {dateParts.month}
                        </span>
                        <span className="text-2xl font-serif text-[#6B1D3A] font-bold leading-none mt-1">
                          {dateParts.day}
                        </span>
                      </div>

                      {/* Heading info */}
                      <div className="space-y-1 text-left">
                        <h3 className="font-serif text-lg font-normal text-[#6B1D3A] leading-snug group-hover:text-[#E8A317] transition-colors duration-300">
                          {ev.title}
                        </h3>
                        <p className="text-[11px] font-bold text-[#837561] tracking-wide uppercase">
                          {ev.time}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-[#1C1C1E] leading-relaxed text-left pt-2 border-t border-[#E6DDD0]/40">
                      {ev.description}
                    </p>
                  </div>

                  {/* Card bottom metadata details */}
                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-[#E6DDD0] text-[10px] font-bold text-[#837561] uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#E8A317]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {ev.location}
                    </span>
                    <span className="text-xs font-serif text-[#6B1D3A] group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Floating Call to Action */}
        <ScrollReveal delay={0.3}>
          <div className="bg-[#FFF8F0] border border-[#E6DDD0] p-8 max-w-3xl mx-auto text-center space-y-4">
            <h3 className="font-serif text-xl italic text-[#6B1D3A]">Need more information about upcoming programs?</h3>
            <p className="text-xs text-[#1C1C1E] leading-relaxed max-w-lg mx-auto">
              For parent inquiries, special merit offerings, or holiday schedule verification, please contact the Principal’s office or visit our campus office on Saturdays.
            </p>
            <div className="pt-2">
              <Link href="/enrollment" className="inline-block px-6 py-2.5 bg-[#6B1D3A] text-white text-[11px] font-bold tracking-widest uppercase hover:bg-[#E8A317] border border-[#6B1D3A] rounded-cta transition-all">
                Enroll Today
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
