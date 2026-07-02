import { db } from "@/lib/db";
import ExamCalendarWidget from "@/components/exam-calendar-widget";
import ScrollReveal from "@/components/scroll-reveal";

export const metadata = {
  title: "Upcoming Exams | Susilodaya English Medium Dhamma School",
  description:
    "Check scheduled exam calendars, spot tests, and terminal evaluations at Susilodaya English Medium Dhamma School.",
};

export default async function ExamsPage() {
  let examRecords: any[] = [];
  try {
    examRecords = await db.query.exams.findMany({
      orderBy: (exams, { asc }) => [asc(exams.date)],
    });
  } catch (error) {
    console.error("Failed to fetch exams from database:", error);
  }

  // Map database dates safely for client-side evaluation
  const formattedExams = examRecords.map((exam) => ({
    id: String(exam.id),
    name: exam.name,
    date: exam.date, // "YYYY-MM-DD"
    startTime: exam.startTime,
    endTime: exam.endTime,
    description: exam.description,
  }));

  return (
    <div className="relative min-h-[90vh]">
      {/* Cinematic Film Grain Texture */}
      <div className="noise-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative z-10">
        {/* Title Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <ScrollReveal>
            <span className="text-[#6B1D3A] font-bold text-xs uppercase tracking-widest bg-[#F0E6D6]/50 px-3 py-1.5 rounded-none border border-[#E8A317]/20">
              Evaluations & Spot Tests
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl font-normal font-serif text-[#6B1D3A] italic">Upcoming Exams</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-sm text-[#1C1C1E] leading-relaxed">
              Keep track of scheduled term finals and spot tests. Click on highlighted dates containing indicators to review specific classrooms, affected grades, and testing times.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Calendar Widget */}
        <ScrollReveal delay={0.3}>
          <ExamCalendarWidget exams={formattedExams} />
        </ScrollReveal>
      </div>
    </div>
  );
}
