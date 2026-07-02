import { db } from "@/lib/db";
import EnrollmentStepper from "@/components/enrollment-stepper";
import ScrollReveal from "@/components/scroll-reveal";

export const metadata = {
  title: "Student Enrollment | Susilodaya English Medium Dhamma School",
  description: "Enroll your child for weekly Buddhist Dhamma classes at Susilodaya Viharaya.",
};

export default async function EnrollmentPage() {
  // Fallback defaults
  let feeAmount = 1000;
  let isEnrollmentOpen = false;

  try {
    const cmsRecords = await db.query.cmsContent.findMany();
    const settingsRecord = cmsRecords.find((r) => r.sectionKey === "enrollment_setting");
    
    if (settingsRecord && settingsRecord.contentData) {
      const data = settingsRecord.contentData as { enrollmentFee?: number; isEnrollmentOpen?: boolean };
      if (typeof data.enrollmentFee === "number") feeAmount = data.enrollmentFee;
      if (typeof data.isEnrollmentOpen === "boolean") isEnrollmentOpen = data.isEnrollmentOpen;
    }
  } catch (error) {
    console.error("Failed to load enrollment settings on page:", error);
  }

  return (
    <div className="relative min-h-[90vh]">
      {/* Cinematic Film Grain Texture */}
      <div className="noise-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative z-10">
        {/* Title Header (Hidden during print) */}
        <div className="text-center max-w-xl mx-auto space-y-3 print:hidden">
          <ScrollReveal>
            <span className="text-[#6B1D3A] font-bold text-xs uppercase tracking-widest bg-[#F0E6D6]/50 px-3 py-1.5 rounded-none border border-[#E8A317]/20">
              Admission & Pre-Registration
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl font-normal font-serif text-[#6B1D3A] italic">Student Pre-Registration</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-sm text-[#1C1C1E] leading-relaxed">
              Register your child online to initiate the enrollment journey. Once submitted, download and print the pre-enrollment voucher to complete the physical payment at the temple office.
            </p>
          </ScrollReveal>
        </div>

        {/* Stepper Form */}
        <ScrollReveal delay={0.3}>
          <EnrollmentStepper feeAmount={feeAmount} isEnrollmentOpen={isEnrollmentOpen} />
        </ScrollReveal>
      </div>
    </div>
  );
}
