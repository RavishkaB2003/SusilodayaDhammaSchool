"use client";

import { useState } from "react";
import { submitEnrollment } from "@/app/actions/enrollment";

interface EnrollmentStepperProps {
  feeAmount: number;
  isEnrollmentOpen: boolean;
}

export default function EnrollmentStepper({ feeAmount, isEnrollmentOpen }: EnrollmentStepperProps) {
  const [step, setStep] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "Male",
    email: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    targetGrade: "Grade 1",
    notes: "",
    lateException: false
  });

  // Success result returned from Server Action
  const [result, setResult] = useState<any | null>(null);

  // Date Check: Is it January?
  const currentMonth = new Date().getMonth();
  const isJanuary = currentMonth === 0;
  const showExceptionGate = !isJanuary && !isEnrollmentOpen;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName.trim() || !formData.dob) {
        setError("Please enter student name and date of birth.");
        return;
      }
      if (showExceptionGate && !formData.lateException) {
        setError("Late exception approval required outside the January cycle.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.parentName.trim() || !formData.parentPhone.trim()) {
        setError("Please enter parent name and contact phone number.");
        return;
      }
    }
    setError(null);
    setStep(step + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsPending(true);
    setError(null);

    const submissionNotes = showExceptionGate 
      ? `[Late Exception Request] ${formData.notes}` 
      : formData.notes;

    const res = await submitEnrollment({
      fullName: formData.fullName,
      dob: formData.dob,
      gender: formData.gender,
      email: formData.email || null,
      phone: formData.phone || null,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      targetGrade: formData.targetGrade,
      notes: submissionNotes || null
    });

    setIsPending(false);

    if (res.error) {
      setError(res.error);
    } else {
      setResult(res);
      setStep(4);
    }
  };

  const triggerPrint = () => {
    window.print();
  };

  const grades = [
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
    "Diploma Class"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Dynamic CSS Print Overlay Helper */}
      <style jsx global>{`
        @media print {
          /* Hide everything in layout (navbar, footer, stepper buttons) */
          body * {
            visibility: hidden;
          }
          /* Show only the target voucher layout card */
          #print-voucher, #print-voucher * {
            visibility: visible;
          }
          #print-voucher {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 24px;
            border: 2px solid #8B5A2B;
            border-radius: 12px;
            box-shadow: none;
            background-color: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Stepper Progress bar (Hidden during print) */}
      {step < 4 && (
        <div className="flex items-center justify-between mb-8 px-4 print:hidden">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center flex-1 last:flex-initial">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border transition-colors ${
                step === num 
                  ? "bg-[#7A1F1D] text-white border-[#7A1F1D]" 
                  : step > num 
                  ? "bg-[#E89E5F]/20 text-[#7A1F1D] border-[#E89E5F]" 
                  : "bg-white text-[#9C8A87] border-[#F0E6D6]"
              }`}>
                {num}
              </div>
              {num < 3 && (
                <div className={`h-1.5 flex-grow mx-4 rounded ${
                  step > num ? "bg-[#7A1F1D]" : "bg-[#F0E6D6]"
                }`}></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form Error Banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl mb-6 flex items-center space-x-2 text-sm print:hidden">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: STUDENT DETAILS */}
      {step === 1 && (
        <div className="bg-white border border-[#F0E6D6] p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="border-b border-[#F0E6D6] pb-4">
            <h3 className="text-xl font-bold font-serif text-[#7A1F1D]">Step 1: Student Information</h3>
            <p className="text-xs text-[#5C4B47] mt-1">Please enter the personal details of the student to enroll.</p>
          </div>

          {/* Exception Cycle Banner */}
          {showExceptionGate && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl space-y-3">
              <div className="flex items-center space-x-2.5">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h5 className="font-bold text-sm">Late Exception Request Required</h5>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Regular enrollment is currently closed. To submit a request, you must check the late exception authorization box below. Late admissions are subject to office review.
              </p>
              <label className="flex items-center space-x-3.5 pt-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="lateException"
                  checked={formData.lateException}
                  onChange={handleInputChange}
                  className="w-4.5 h-4.5 accent-[#7A1F1D] rounded border-[#F0E6D6] focus:ring-0"
                />
                <span className="text-xs font-bold text-[#7A1F1D] select-none">I request a Late Enrollment Exception</span>
              </label>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#5C4B47] mb-2" htmlFor="fullName">
                Student Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Kavindu Perera"
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#2C1B18] placeholder-[#9C8A87] focus:outline-none focus:ring-2 focus:ring-[#7A1F1D] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#5C4B47] mb-2" htmlFor="dob">
                Date of Birth *
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#2C1B18] focus:outline-none focus:ring-2 focus:ring-[#7A1F1D] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#5C4B47] mb-2" htmlFor="gender">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#2C1B18] focus:outline-none focus:ring-2 focus:ring-[#7A1F1D] focus:border-transparent transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#5C4B47] mb-2" htmlFor="targetGrade">
                Target Admission Grade *
              </label>
              <select
                id="targetGrade"
                name="targetGrade"
                value={formData.targetGrade}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#2C1B18] focus:outline-none focus:ring-2 focus:ring-[#7A1F1D] focus:border-transparent transition-all"
              >
                {grades.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#7A1F1D] hover:bg-[#5C1412] text-white font-semibold rounded-xl transition-all shadow-md"
            >
              Continue to Parent Details
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PARENT DETAILS */}
      {step === 2 && (
        <div className="bg-white border border-[#F0E6D6] p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="border-b border-[#F0E6D6] pb-4">
            <h3 className="text-xl font-bold font-serif text-[#7A1F1D]">Step 2: Parent / Guardian Information</h3>
            <p className="text-xs text-[#5C4B47] mt-1">Please enter parent contact details for office correspondence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#5C4B47] mb-2" htmlFor="parentName">
                Parent / Guardian Name *
              </label>
              <input
                id="parentName"
                name="parentName"
                type="text"
                required
                value={formData.parentName}
                onChange={handleInputChange}
                placeholder="e.g. Sunil Perera"
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#2C1B18] placeholder-[#9C8A87] focus:outline-none focus:ring-2 focus:ring-[#7A1F1D] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#5C4B47] mb-2" htmlFor="parentPhone">
                Contact Phone Number *
              </label>
              <input
                id="parentPhone"
                name="parentPhone"
                type="tel"
                required
                value={formData.parentPhone}
                onChange={handleInputChange}
                placeholder="e.g. +94 77 123 4567"
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#2C1B18] placeholder-[#9C8A87] focus:outline-none focus:ring-2 focus:ring-[#7A1F1D] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#5C4B47] mb-2" htmlFor="email">
                Email Address (Optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. parent@example.com"
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#2C1B18] placeholder-[#9C8A87] focus:outline-none focus:ring-2 focus:ring-[#7A1F1D] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#5C4B47] mb-2" htmlFor="phone">
                Student Alternate Contact (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. Student phone if any"
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#2C1B18] placeholder-[#9C8A87] focus:outline-none focus:ring-2 focus:ring-[#7A1F1D] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#5C4B47] mb-2" htmlFor="notes">
              Special Notes / Medical Records (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Provide details about previous Dhamma schools attended or general notes."
              className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl text-[#2C1B18] placeholder-[#9C8A87] focus:outline-none focus:ring-2 focus:ring-[#7A1F1D] focus:border-transparent transition-all"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleBack}
              className="px-5 py-3 border border-[#F0E6D6] hover:bg-[#FFF8F0] text-[#5C4B47] font-semibold rounded-xl transition-all"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#7A1F1D] hover:bg-[#5C1412] text-white font-semibold rounded-xl transition-all shadow-md"
            >
              Continue to Review
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: REVIEW DETAILS */}
      {step === 3 && (
        <div className="bg-white border border-[#F0E6D6] p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="border-b border-[#F0E6D6] pb-4">
            <h3 className="text-xl font-bold font-serif text-[#7A1F1D]">Step 3: Review Pre-Registration</h3>
            <p className="text-xs text-[#5C4B47] mt-1">Please confirm the details below before submitting to the office.</p>
          </div>

          {/* Details Summary Grid */}
          <div className="bg-[#FFF8F0] border border-[#F0E6D6] rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm border-b border-[#F0E6D6]/60 pb-3">
              <div>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase">Student Name</span>
                <span className="font-semibold text-[#2C1B18]">{formData.fullName}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase">Target Grade</span>
                <span className="font-semibold text-[#2C1B18]">{formData.targetGrade}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase">Date of Birth</span>
                <span className="font-semibold text-[#2C1B18]">{formData.dob}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase">Gender</span>
                <span className="font-semibold text-[#2C1B18]">{formData.gender}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase">Parent Name</span>
                <span className="font-semibold text-[#2C1B18]">{formData.parentName}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-[#8B5A2B] uppercase">Contact Phone</span>
                <span className="font-semibold text-[#2C1B18]">{formData.parentPhone}</span>
              </div>
            </div>
          </div>

          {/* Physical Payment Warning */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <h5 className="text-sm font-bold text-[#7A1F1D] flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#8B5A2B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Cash Payment Required</span>
            </h5>
            <p className="text-xs text-[#5C4B47] leading-relaxed">
              Registration requires a one-time enrollment fee of <strong className="text-[#7A1F1D]">LKR {feeAmount}</strong>. This fee must be paid in cash at the temple office. Your online registration will remain pending until payment is cleared.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleBack}
              disabled={isPending}
              className="px-5 py-3 border border-[#F0E6D6] hover:bg-[#FFF8F0] text-[#5C4B47] font-semibold rounded-xl transition-all disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-6 py-3 bg-[#7A1F1D] hover:bg-[#5C1412] text-white font-semibold rounded-xl transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
            >
              {isPending ? (
                <span>Submitting Request...</span>
              ) : (
                <span>Submit & Download Voucher</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SUCCESS & VOUCHER PRINT */}
      {step === 4 && result && (
        <div className="space-y-8">
          {/* Main Success message (Hidden during print) */}
          <div className="bg-white border border-[#F0E6D6] p-6 rounded-2xl shadow-sm text-center space-y-4 print:hidden">
            <div className="w-12 h-12 bg-green-50 text-green-600 border border-green-200 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold font-serif text-green-800">Pre-Registration Submitted!</h3>
            <p className="text-xs text-[#5C4B47] max-w-md mx-auto leading-relaxed">
              Your online form has been successfully saved. Please print or save the pre-enrollment voucher below and bring it along with the cash payment to the school office to complete admission.
            </p>
            <div className="pt-2 flex justify-center space-x-4">
              <button
                onClick={triggerPrint}
                className="px-6 py-2.5 bg-[#7A1F1D] hover:bg-[#5C1412] text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print Voucher Slip</span>
              </button>
            </div>
          </div>

          {/* OFFICIAL VOUCHER LAYOUT */}
          <div
            id="print-voucher"
            className="bg-white border-2 border-[#8B5A2B] p-8 rounded-2xl shadow-md relative overflow-hidden"
          >
            {/* Lotus watermark background (only visible on print or high-res) */}
            <div className="absolute right-4 bottom-4 text-black opacity-[0.02] pointer-events-none">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C11.5 5 8 8.5 5.5 8.5C3 8.5 2 9.5 2 11C2 12.5 3 13.5 5.5 13.5C8 13.5 11.5 17 12 20C12.5 17 16 13.5 18.5 13.5C21 13.5 22 12.5 22 11C22 9.5 21 8.5 18.5 8.5C16 8.5 12.5 5 12 2Z" />
              </svg>
            </div>

            {/* Official Header */}
            <div className="text-center border-b-2 border-[#8B5A2B]/40 pb-6 mb-6">
              <span className="font-serif text-2xl font-bold text-[#7A1F1D]">Susilodaya Dhamma School</span>
              <p className="text-xs font-bold text-[#8B5A2B] uppercase tracking-widest mt-1">Pre-Enrollment Voucher</p>
            </div>

            {/* Ref / Date Row */}
            <div className="flex justify-between text-xs text-[#5C4B47] mb-6 font-semibold bg-[#FFF8F0] border border-[#F0E6D6] p-3 rounded-lg">
              <span>Voucher Ref: <strong className="text-[#7A1F1D]">{result.refCode}</strong></span>
              <span>Date: {new Date(result.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
            </div>

            {/* Details Box */}
            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] border-b border-[#F0E6D6] pb-1.5">
                Registration Details
              </h5>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <span className="block text-xs font-bold text-[#9C8A87] uppercase">Student Name</span>
                  <span className="font-semibold text-[#2C1B18]">{result.studentName}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#9C8A87] uppercase">Target Class Grade</span>
                  <span className="font-semibold text-[#2C1B18]">{result.targetGrade}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#9C8A87] uppercase">Parent / Guardian</span>
                  <span className="font-semibold text-[#2C1B18]">{result.parentName}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#9C8A87] uppercase">Parent Phone</span>
                  <span className="font-semibold text-[#2C1B18]">{result.parentPhone}</span>
                </div>
              </div>
            </div>

            {/* Cash Voucher Terms Box */}
            <div className="mt-8 p-4 bg-[#FFF8F0] border border-[#F0E6D6] rounded-xl space-y-2">
              <div className="flex justify-between items-center text-sm font-bold border-b border-[#F0E6D6]/60 pb-2">
                <span className="text-[#8B5A2B] uppercase tracking-wider text-xs">Required Enrollment Fee</span>
                <span className="text-base text-[#7A1F1D]">LKR {feeAmount}.00</span>
              </div>
              <p className="text-[11px] text-[#5C4B47] leading-relaxed pt-1">
                Please present this voucher slip along with the fee payment to the temple Dhamma School office on Saturday morning. Upon payment validation, the office will activate the student account and issue credentials.
              </p>
            </div>

            {/* Signature Blocks */}
            <div className="grid grid-cols-2 gap-12 mt-12 pt-8 border-t border-[#F0E6D6]/60 text-center text-xs text-[#5C4B47]">
              <div>
                <div className="h-10 border-b border-[#9C8A87] w-4/5 mx-auto"></div>
                <span className="block font-semibold mt-2">Parent Signature</span>
              </div>
              <div>
                <div className="h-10 border-b border-[#9C8A87] w-4/5 mx-auto"></div>
                <span className="block font-semibold mt-2">Office Stamp & Signature</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
