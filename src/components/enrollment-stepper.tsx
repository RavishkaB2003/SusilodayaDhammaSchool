"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    lateException: false,
    paymentMethod: "Cash", // "Cash" or "Bank"
    receiptFile: ""
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
        setError("Late exception approval request is required outside the January cycle.");
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
      ? `[Late Exception Request] [Payment: ${formData.paymentMethod}] ${formData.notes}` 
      : `[Payment: ${formData.paymentMethod}] ${formData.notes}`;

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
            border: 2px solid #6B1D3A;
            border-radius: 0px !important;
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif border transition-colors ${
                step === num 
                  ? "bg-[#6B1D3A] text-white border-[#6B1D3A]" 
                  : step > num 
                  ? "bg-[#E8A317]/20 text-[#6B1D3A] border-[#E8A317]" 
                  : "bg-white text-[#837561] border-[#E6DDD0]"
              }`}>
                {num}
              </div>
              {num < 3 && (
                <div className={`h-[1px] flex-grow mx-4 ${
                  step > num ? "bg-[#6B1D3A]" : "bg-[#E6DDD0]"
                }`}></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form Error Banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-none mb-6 flex items-center space-x-2 text-sm print:hidden">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: STUDENT DETAILS */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="step-content-active bg-white border border-[#E6DDD0] p-6 md:p-8 rounded-none shadow-none space-y-6"
          >
          <div className="border-b border-[#E6DDD0] pb-4">
            <h3 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Step 1: Student Information</h3>
            <p className="text-xs text-[#1C1C1E]/70 mt-1">Please enter the personal details of the student to enroll.</p>
          </div>

          {/* Exception Cycle Checkbox Gate */}
          {showExceptionGate && (
            <div className="p-4 bg-[#FFF8F0] border border-[#E8A317]/30 space-y-4">
              <label className="flex items-center space-x-3.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="lateException"
                  checked={formData.lateException}
                  onChange={handleInputChange}
                  className="w-4.5 h-4.5 accent-[#6B1D3A] rounded-none border-[#E6DDD0] focus:ring-0"
                />
                <span className="text-xs font-bold text-[#6B1D3A] uppercase tracking-wider select-none">I request a Late Enrollment Exception</span>
              </label>

              {/* Accordion dropdown alert banner */}
              <div className={`late-warning-alert ${formData.lateException ? "active" : ""} bg-[#E8A317]/10 p-4 border border-[#E8A317]/30 text-[#1C1C1E] text-xs leading-relaxed space-y-2`}>
                <div className="flex items-center space-x-2 text-[#6B1D3A]">
                  <svg className="w-4.5 h-4.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-bold uppercase tracking-wider">Late Intake Out-Of-Season Alert</span>
                </div>
                <p>
                  Admissions outside the regular January cycle are heavily restricted to maintain syllabus schedules. Registration requests submitted in July require formal school administration approval before class rosters are assigned.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="fullName">
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
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] placeholder-[#837561] focus:outline-none focus:border-[#6B1D3A] rounded-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="dob">
                Date of Birth *
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="gender">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="targetGrade">
                Target Admission Grade *
              </label>
              <select
                id="targetGrade"
                name="targetGrade"
                value={formData.targetGrade}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none transition-all"
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
              className="px-6 py-3 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-cta border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon"
            >
              Continue to Parent Details
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: PARENT DETAILS */}
      {step === 2 && (
        <motion.div
          key="step-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="step-content-active bg-white border border-[#E6DDD0] p-6 md:p-8 rounded-none shadow-none space-y-6"
        >
          <div className="border-b border-[#E6DDD0] pb-4">
            <h3 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Step 2: Parent / Guardian Information</h3>
            <p className="text-xs text-[#1C1C1E]/70 mt-1">Please enter parent contact details for office correspondence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="parentName">
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
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] placeholder-[#837561] focus:outline-none focus:border-[#6B1D3A] rounded-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="parentPhone">
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
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] placeholder-[#837561] focus:outline-none focus:border-[#6B1D3A] rounded-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="email">
                Email Address (Optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. parent@example.com"
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] placeholder-[#837561] focus:outline-none focus:border-[#6B1D3A] rounded-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="phone">
                Student Alternate Contact (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. Student phone if any"
                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] placeholder-[#837561] focus:outline-none focus:border-[#6B1D3A] rounded-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="notes">
              Special Notes / Medical Records (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Provide details about previous Dhamma schools attended or general notes."
              className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] placeholder-[#837561] focus:outline-none focus:border-[#6B1D3A] rounded-none transition-all"
            />
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E6DDD0]">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-[#E6DDD0] hover:text-[#1C1C1E] text-[#1C1C1E] text-[11px] font-bold tracking-widest uppercase rounded-cta transition-all btn-wipe"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-cta border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon"
            >
              Continue to Review & Pay
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: REVIEW DETAILS & PAYMENT SELECTOR */}
      {step === 3 && (
        <motion.div
          key="step-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="step-content-active bg-white border border-[#E6DDD0] p-6 md:p-8 rounded-none shadow-none space-y-6"
        >
          <div className="border-b border-[#E6DDD0] pb-4">
            <h3 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Step 3: Review & Payment</h3>
            <p className="text-xs text-[#1C1C1E]/70 mt-1">Please confirm details and select your registration payment method.</p>
          </div>

          {/* Details Summary Grid */}
          <div className="bg-[#F0E6D6]/30 border border-[#E6DDD0] rounded-none p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm border-b border-[#E6DDD0] pb-4">
              <div>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wider">Student Name</span>
                <span className="font-semibold text-[#1C1C1E]">{formData.fullName}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wider">Target Grade</span>
                <span className="font-semibold text-[#1C1C1E]">{formData.targetGrade}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wider">Date of Birth</span>
                <span className="font-semibold text-[#1C1C1E]">{formData.dob}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wider">Gender</span>
                <span className="font-semibold text-[#1C1C1E]">{formData.gender}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wider">Parent Name</span>
                <span className="font-semibold text-[#1C1C1E]">{formData.parentName}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wider">Contact Phone</span>
                <span className="font-semibold text-[#1C1C1E]">{formData.parentPhone}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-4">
            <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider">Select Payment Method</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`border p-4 flex items-center space-x-3 cursor-pointer rounded-none transition-all ${
                formData.paymentMethod === "Cash" 
                  ? "border-2 border-[#E8A317] bg-[#E8A317]/5" 
                  : "border-[#E6DDD0] bg-[#FFF8F0]"
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash"
                  checked={formData.paymentMethod === "Cash"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#6B1D3A] focus:ring-0 rounded-none border-[#E6DDD0]"
                />
                <div>
                  <span className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider">Cash Voucher</span>
                  <span className="block text-[11px] text-[#1C1C1E]/70 mt-0.5">Pay LKR {feeAmount} at School Office</span>
                </div>
              </label>

              <label className={`border p-4 flex items-center space-x-3 cursor-pointer rounded-none transition-all ${
                formData.paymentMethod === "Bank" 
                  ? "border-2 border-[#E8A317] bg-[#E8A317]/5" 
                  : "border-[#E6DDD0] bg-[#FFF8F0]"
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Bank"
                  checked={formData.paymentMethod === "Bank"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#6B1D3A] focus:ring-0 rounded-none border-[#E6DDD0]"
                />
                <div>
                  <span className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider">Receipt File Upload</span>
                  <span className="block text-[11px] text-[#1C1C1E]/70 mt-0.5">Upload Bank Transfer slip PDF/Image</span>
                </div>
              </label>
            </div>

            {/* Bank Transfer Details & Upload Box */}
            {formData.paymentMethod === "Bank" && (
              <div className="p-4 bg-[#F0E6D6]/30 border border-[#E6DDD0] text-xs text-[#1C1C1E] space-y-3">
                <p className="font-semibold text-[#6B1D3A]">Bank Account: Susilodaya English Medium Dhamma School — BOC A/C 789456123</p>
                <div className="border border-dashed border-[#837561] bg-white p-4 text-center rounded-none relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData((prev) => ({ ...prev, receiptFile: e.target.files![0].name }));
                      }
                    }}
                  />
                  <div className="space-y-1">
                    <svg className="w-6 h-6 text-[#8B5A2B] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="font-semibold uppercase tracking-wider text-[10px]">
                      {formData.receiptFile ? `File: ${formData.receiptFile}` : "Drag & Drop Bank Receipt File Here"}
                    </p>
                    <p className="text-[9px] text-[#837561]">Supports PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E6DDD0]">
            <button
              onClick={handleBack}
              disabled={isPending}
              className="px-6 py-3 border border-[#E6DDD0] hover:text-[#1C1C1E] text-[#1C1C1E] text-[11px] font-bold tracking-widest uppercase rounded-cta transition-all disabled:opacity-50 btn-wipe"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-6 py-3 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-cta border border-[#6B1D3A] transition-all disabled:opacity-50 btn-wipe btn-wipe-maroon"
            >
              {isPending ? (
                <span>Submitting Request...</span>
              ) : (
                <span>Submit & Download Voucher</span>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 4: SUCCESS & VOUCHER PRINT */}
      {step === 4 && result && (
        <motion.div
          key="step-4"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="step-content-active space-y-8"
        >
          {/* Main Success message (Hidden during print) */}
          <div className="bg-white border border-[#E6DDD0] p-6 rounded-none shadow-none text-center space-y-4 print:hidden">
            <div className="w-12 h-12 bg-green-50 text-green-600 border border-green-200 rounded-none flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-normal font-serif text-green-800 italic">Pre-Registration Submitted!</h3>
            <p className="text-xs text-[#1C1C1E]/80 max-w-md mx-auto leading-relaxed">
              Your online form has been successfully saved. Please print or save the pre-enrollment voucher below and bring it along with the payment receipt/cash to the school office to complete admission.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={triggerPrint}
                className="px-6 py-3 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-cta shadow-none transition-all flex items-center space-x-2 border border-[#6B1D3A] btn-wipe btn-wipe-maroon"
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
            className="bg-white border-2 border-[#6B1D3A] p-8 rounded-none shadow-none relative overflow-hidden"
          >
            {/* Lotus watermark background */}
            <div className="absolute right-4 bottom-4 text-black opacity-[0.02] pointer-events-none">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C11.5 5 8 8.5 5.5 8.5C3 8.5 2 9.5 2 11C2 12.5 3 13.5 5.5 13.5C8 13.5 11.5 17 12 20C12.5 17 16 13.5 18.5 13.5C21 13.5 22 12.5 22 11C22 9.5 21 8.5 18.5 8.5C16 8.5 12.5 5 12 2Z" />
              </svg>
            </div>

            {/* Official Header */}
            <div className="flex flex-col items-center text-center border-b border-[#E6DDD0] pb-6 mb-6">
              <div className="relative w-16 h-16 overflow-hidden flex items-center justify-center bg-white border border-[#E6DDD0]/60 p-1 mb-3">
                <img
                  src="/assets/logo.png"
                  alt="Susilodaya Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-2xl font-normal italic text-[#6B1D3A]">Susilodaya English Medium Dhamma School</span>
              <p className="text-[10px] font-bold text-[#8B5A2B] uppercase tracking-widest mt-1.5">Pre-Enrollment Voucher</p>
            </div>

            {/* Ref / Date Row */}
            <div className="flex justify-between text-xs text-[#1C1C1E] mb-6 font-semibold bg-[#FFF8F0] border border-[#E6DDD0] p-3 rounded-none">
              <span>Voucher Ref: <strong className="text-[#6B1D3A]">{result.refCode}</strong></span>
              <span>Date: {new Date(result.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
            </div>

            {/* Details Box */}
            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#6B1D3A] border-b border-[#E6DDD0] pb-1.5">
                Registration Details
              </h5>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <span className="block text-[10px] font-bold text-[#837561] uppercase">Student Name</span>
                  <span className="font-semibold text-[#1C1C1E]">{result.studentName}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#837561] uppercase">Target Class Grade</span>
                  <span className="font-semibold text-[#1C1C1E]">{result.targetGrade}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#837561] uppercase">Parent / Guardian</span>
                  <span className="font-semibold text-[#1C1C1E]">{result.parentName}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#837561] uppercase">Parent Phone</span>
                  <span className="font-semibold text-[#1C1C1E]">{result.parentPhone}</span>
                </div>
              </div>
            </div>

            {/* Cash Voucher Terms Box */}
            <div className="mt-8 p-4 bg-[#FFF8F0] border border-[#E6DDD0] rounded-none space-y-2">
              <div className="flex justify-between items-center text-sm font-bold border-b border-[#E6DDD0] pb-2">
                <span className="text-[#8B5A2B] uppercase tracking-wider text-[10px]">Enrollment Registration Fee</span>
                <span className="text-base text-[#6B1D3A]">LKR {feeAmount}.00 ({formData.paymentMethod === "Bank" ? "Paid Online" : "Paid Cash"})</span>
              </div>
              <p className="text-[11px] text-[#1C1C1E]/70 leading-relaxed pt-1">
                Please present this voucher slip along with the fee payment to the temple Dhamma School office on Saturday morning. Upon payment validation, the office will activate the student account and issue credentials.
              </p>
            </div>

            {/* Signature Blocks */}
            <div className="grid grid-cols-2 gap-12 mt-12 pt-8 border-t border-[#E6DDD0] text-center text-xs text-[#1C1C1E]">
              <div>
                <div className="h-10 border-b border-[#837561] w-4/5 mx-auto"></div>
                <span className="block font-semibold mt-2">Parent Signature</span>
              </div>
              <div>
                <div className="h-10 border-b border-[#837561] w-4/5 mx-auto"></div>
                <span className="block font-semibold mt-2">Office Stamp & Signature</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
