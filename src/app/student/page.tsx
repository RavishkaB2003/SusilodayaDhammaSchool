"use client";

import DashboardLayoutTabs from "@/components/dashboard-layout-tabs";
import { motion } from "framer-motion";

export default function StudentPage() {
  const tabs = [
    {
      id: "overview",
      name: "Notes & Downloads",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      id: "grades",
      name: "Grades & Progress",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: "settings",
      name: "Profile Settings",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const notesList = [
    { title: "Theravada History - Part I", type: "Study Note", grade: "Grade 08", date: "2026-06-25" },
    { title: "Abhidhamma Mula Vibhanga", type: "Study Note", grade: "Grade 08", date: "2026-06-18" },
    { title: "Sutta Pitaka - Mangala Sutta", type: "Study Note", grade: "Grade 08", date: "2026-06-10" },
    { title: "Term 1 Final Evaluation paper", type: "Past Paper", grade: "Grade 08", date: "2025-11-30" },
  ];

  const gradesList = [
    { subject: "Dhamma Studies", marks: 88, grade: "A", status: "Pass" },
    { subject: "Sutta Recitations", marks: 92, grade: "A", status: "Pass" },
    { subject: "Buddhist History", marks: 74, grade: "B", status: "Pass" },
    { subject: "Abhidhamma Studies", marks: 81, grade: "A", status: "Pass" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E6DDD0]">
        <div>
          <h1 className="text-3xl font-normal font-serif text-[#6B1D3A] italic">Student Workspace</h1>
          <p className="text-xs text-[#1C1C1E]/70 mt-1.5">Check grades, configure your profile, and download study guides.</p>
        </div>
      </div>

      <DashboardLayoutTabs title="Student Menu" tabs={tabs}>
        {(activeTab) => (
          <div className="space-y-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="border-b border-[#E6DDD0] pb-3">
                  <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Notes & Past Papers Downloads</h2>
                  <p className="text-xs text-[#1C1C1E]/70 mt-1">Access resources uploaded by Dhamma school teachers.</p>
                </div>
                
                {/* Search / Filter Placeholder bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-[#FFF8F0] p-4 border border-[#E6DDD0]">
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="px-3 py-2 bg-white border border-[#E6DDD0] text-xs focus:outline-none focus:border-[#6B1D3A] w-full sm:w-64"
                  />
                  <div className="flex gap-2">
                    <span className="bg-[#E8A317] text-white text-[10px] font-bold tracking-wider px-3 py-1.5 uppercase">All Grades</span>
                    <span className="bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] text-[10px] font-bold tracking-wider px-3 py-1.5 uppercase">Grade 8</span>
                  </div>
                </div>

                {/* Staggered Rows Roster */}
                <div className="border border-[#E6DDD0] divide-y divide-[#E6DDD0]">
                  {notesList.map((note, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="p-4 bg-white hover:bg-[#FFF8F0] transition-colors flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-normal text-[#6B1D3A]">{note.title}</h4>
                        <div className="flex space-x-3 text-[10px] font-bold text-[#837561] uppercase tracking-wider">
                          <span className="bg-[#E8A317]/10 text-[#6B1D3A] px-2 py-0.5">{note.type}</span>
                          <span>{note.grade}</span>
                          <span>Uploaded: {note.date}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-[#6B1D3A] hover:text-white text-[#6B1D3A] text-[10px] font-bold tracking-widest uppercase transition-all btn-wipe btn-wipe-maroon">
                        Download
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "grades" && (
              <div className="space-y-6">
                <div className="border-b border-[#E6DDD0] pb-3">
                  <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Grades & Performance</h2>
                  <p className="text-xs text-[#1C1C1E]/70 mt-1">Review your results and letter evaluations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* GPA/Summary Cards */}
                  <div className="bg-[#FFF8F0] border border-[#E6DDD0] p-6 text-center">
                    <span className="block text-[10px] font-bold tracking-widest text-[#837561] uppercase">Term 1 Average</span>
                    <span className="block text-4xl font-serif text-[#6B1D3A] mt-2 italic">83.7%</span>
                  </div>
                  <div className="bg-[#FFF8F0] border border-[#E6DDD0] p-6 text-center">
                    <span className="block text-[10px] font-bold tracking-widest text-[#837561] uppercase">Overall Rank</span>
                    <span className="block text-4xl font-serif text-[#6B1D3A] mt-2 italic">#04 / 32</span>
                  </div>
                  <div className="bg-[#FFF8F0] border border-[#E6DDD0] p-6 text-center">
                    <span className="block text-[10px] font-bold tracking-widest text-[#837561] uppercase">Conduct Evaluation</span>
                    <span className="block text-4xl font-serif text-[#6B1D3A] mt-2 italic">Excellent</span>
                  </div>
                </div>

                {/* Ledger Roster Table */}
                <div className="border border-[#E6DDD0] overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FFF8F0] border-b border-[#E6DDD0] text-[#6B1D3A] font-bold uppercase tracking-wider">
                        <th className="p-4">Subject Name</th>
                        <th className="p-4 text-center">Marks</th>
                        <th className="p-4 text-center">Grade</th>
                        <th className="p-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6DDD0]">
                      {gradesList.map((row, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.08 }}
                          className="hover:bg-[#FFF8F0] transition-colors"
                        >
                          <td className="p-4 font-serif text-base text-[#1C1C1E]">{row.subject}</td>
                          <td className="p-4 text-center font-semibold text-[#1C1C1E]">{row.marks} / 100</td>
                          <td className="p-4 text-center font-bold text-[#6B1D3A]">{row.grade}</td>
                          <td className="p-4 text-right font-semibold text-green-700">{row.status}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="border-b border-[#E6DDD0] pb-3">
                  <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Profile Settings</h2>
                  <p className="text-xs text-[#1C1C1E]/70 mt-1">Manage display name and contact credentials.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Student ID (Read Only)</label>
                    <input
                      type="text"
                      disabled
                      value="S-2026-0042"
                      className="w-full px-4 py-3 bg-[#F0E6D6]/40 border border-[#E6DDD0] text-[#837561] rounded-none focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Academic Classroom</label>
                    <input
                      type="text"
                      disabled
                      value="Grade 08 (Saturdays)"
                      className="w-full px-4 py-3 bg-[#F0E6D6]/40 border border-[#E6DDD0] text-[#837561] rounded-none focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Kavindu Perera"
                      className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Contact Number</label>
                    <input
                      type="text"
                      defaultValue="+94 77 123 4567"
                      className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="kavindu@gmail.com"
                      className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6DDD0]">
                  <button className="px-8 py-3.5 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-none border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon">
                    Save Profile Changes
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
