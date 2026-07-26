"use client";

import DashboardLayoutTabs from "@/components/dashboard-layout-tabs";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TeacherPage() {
  const tabs = [
    {
      id: "attendance",
      name: "Daily Attendance",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "grades",
      name: "Exam Grades Entry",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: "resources",
      name: "Upload Notes & Papers",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
  ];

  // Roster states
  const [attendance, setAttendance] = useState<Record<string, string>>({
    "1": "Present",
    "2": "Present",
    "3": "Absent",
    "4": "Late"
  });

  const students = [
    { id: "1", name: "Kavindu Perera", idCode: "S-2026-0042" },
    { id: "2", name: "Amara Jayasekara", idCode: "S-2026-0043" },
    { id: "3", name: "Devinda Silva", idCode: "S-2026-0044" },
    { id: "4", name: "Thisuri Wijesinghe", idCode: "S-2026-0045" },
  ];

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const [uploadedFileName, setUploadedFileName] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E6DDD0]">
        <div>
          <h1 className="text-3xl font-normal font-serif text-[#6B1D3A] italic">Teacher Workspace</h1>
          <p className="text-xs text-[#1C1C1E]/70 mt-1.5">Record attendance, enter grades, and share lesson guides.</p>
        </div>
      </div>

      <DashboardLayoutTabs title="Teacher Menu" tabs={tabs}>
        {(activeTab) => (
          <div className="space-y-6">
            {activeTab === "attendance" && (
              <div className="space-y-6">
                <div className="border-b border-[#E6DDD0] pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Daily Attendance Tracker</h2>
                    <p className="text-xs text-[#1C1C1E]/70 mt-1">Class Grade 08 · Saturday Session: {new Date().toLocaleDateString("en-US", { dateStyle: "full" })}</p>
                  </div>
                  <span className="bg-[#E8A317] text-white text-[9px] font-bold tracking-wider px-3 py-1.5 uppercase">Saturday Session</span>
                </div>

                {/* Ledger Roster Table */}
                <div className="border border-[#E6DDD0] overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FFF8F0] border-b border-[#E6DDD0] text-[#6B1D3A] font-bold uppercase tracking-wider">
                        <th className="p-4">Student Info</th>
                        <th className="p-4 text-center">Status Check</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6DDD0]">
                      {students.map((student, idx) => (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.08 }}
                          className="hover:bg-[#FFF8F0] transition-colors"
                        >
                          <td className="p-4">
                            <div className="font-serif text-base text-[#1C1C1E]">{student.name}</div>
                            <div className="text-[10px] text-[#837561] font-bold tracking-wider uppercase mt-0.5">{student.idCode}</div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-2">
                              {["Present", "Late", "Absent"].map((status) => {
                                const isSelected = attendance[student.id] === status;
                                return (
                                  <button
                                    key={status}
                                    onClick={() => handleStatusChange(student.id, status)}
                                    className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-all rounded-none border ${
                                      isSelected
                                        ? "bg-[#6B1D3A] text-white border-[#6B1D3A]"
                                        : "bg-white text-[#1C1C1E]/60 border-[#E6DDD0] hover:bg-[#FFF8F0]"
                                    }`}
                                  >
                                    {status}
                                  </button>
                                );
                              })}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 border-t border-[#E6DDD0]">
                  <button className="px-8 py-3.5 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-none border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon">
                    Submit Attendance Roster
                  </button>
                </div>
              </div>
            )}

            {activeTab === "grades" && (
              <div className="space-y-6">
                <div className="border-b border-[#E6DDD0] pb-3">
                  <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Student Grades</h2>
                  <p className="text-xs text-[#1C1C1E]/70 mt-1">Enter mid-term and final assessment marks for Grade 08 class.</p>
                </div>

                {/* Ledger Roster Table */}
                <div className="border border-[#E6DDD0] overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FFF8F0] border-b border-[#E6DDD0] text-[#6B1D3A] font-bold uppercase tracking-wider">
                        <th className="p-4">Student Info</th>
                        <th className="p-4 text-center">Mid-Term Marks (40)</th>
                        <th className="p-4 text-center">Final Marks (60)</th>
                        <th className="p-4 text-right">Aggregate Total (100)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6DDD0]">
                      {students.map((student, idx) => (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.08 }}
                          className="hover:bg-[#FFF8F0] transition-colors"
                        >
                          <td className="p-4">
                            <div className="font-serif text-base text-[#1C1C1E]">{student.name}</div>
                            <div className="text-[10px] text-[#837561] font-bold tracking-wider uppercase mt-0.5">{student.idCode}</div>
                          </td>
                          <td className="p-4 text-center">
                            <input
                              type="number"
                              defaultValue={32 + idx}
                              className="w-20 px-2 py-1.5 bg-[#FFF8F0] border border-[#E6DDD0] text-center focus:outline-none focus:border-[#6B1D3A] rounded-none"
                            />
                          </td>
                          <td className="p-4 text-center">
                            <input
                              type="number"
                              defaultValue={50 - idx * 2}
                              className="w-20 px-2 py-1.5 bg-[#FFF8F0] border border-[#E6DDD0] text-center focus:outline-none focus:border-[#6B1D3A] rounded-none"
                            />
                          </td>
                          <td className="p-4 text-right font-bold text-[#6B1D3A] pr-6 text-sm">
                            {82 - idx} / 100
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 border-t border-[#E6DDD0]">
                  <button className="px-8 py-3.5 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-none border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon">
                    Save Assessment Marks
                  </button>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-6">
                <div className="border-b border-[#E6DDD0] pb-3">
                  <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Upload Study Notes & Past Papers</h2>
                  <p className="text-xs text-[#1C1C1E]/70 mt-1">Publish downloadable study materials directly to student workspaces.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Target Grade Class</label>
                    <select className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none">
                      <option>Grade 08 (Weekly Saturday)</option>
                      <option>Grade 07</option>
                      <option>Grade 06</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Material Category</label>
                    <select className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none">
                      <option>Study Note</option>
                      <option>Past Paper</option>
                      <option>Syllabus Outline</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Resource Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Theravada History - Part II"
                      className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Attach PDF Document</label>
                    <div className="border border-dashed border-[#837561] bg-[#FFF8F0]/30 p-8 text-center rounded-none relative cursor-pointer">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadedFileName(e.target.files[0].name);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="space-y-2">
                        <svg className="w-8 h-8 text-[#8B5A2B] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="font-bold uppercase tracking-wider text-[10px] text-[#6B1D3A]">
                          {uploadedFileName ? `Attached: ${uploadedFileName}` : "Drag & Drop PDF Attachment Here"}
                        </p>
                        <p className="text-[9px] text-[#837561]">Syllabus guides must be PDF files up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6DDD0]">
                  <button className="px-8 py-3.5 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-none border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon">
                    Publish Study Resource
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </DashboardLayoutTabs>
    </div>
  );
}
