import { db } from "@/lib/db";
import ExamCalendarWidget from "@/components/exam-calendar-widget";
import ScrollReveal from "@/components/scroll-reveal";

export const metadata = {
  title: "Upcoming Exams | Susilodaya Dhamma School",
  description:
    "Check scheduled exam calendars, spot tests, and terminal evaluations at Susilodaya Dhamma School.",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <ScrollReveal>
          <span className="text-[#8B5A2B] font-bold text-xs uppercase tracking-widest bg-[#F0E6D6]/50 px-3 py-1.5 rounded-full">
            Evaluations & Spot Tests
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl font-extrabold font-serif text-[#7A1F1D]">Upcoming Exams</h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-sm text-[#5C4B47] leading-relaxed">
            Keep track of scheduled term finals and spot tests. Click on highlighted dates containing indicators to review specific classrooms, affected grades, and testing times.
          </p>
        </ScrollReveal>
      </div>

      {/* Interactive Calendar Widget */}
      <ScrollReveal delay={0.3}>
        <ExamCalendarWidget exams={formattedExams} />
      </ScrollReveal>
    </div>
  );
}
