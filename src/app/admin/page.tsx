"use client";

import DashboardLayoutTabs from "@/components/dashboard-layout-tabs";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const tabs = [
    {
      id: "overview",
      name: "Dashboard Overview",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: "users",
      name: "User Directory",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: "cms",
      name: "Website CMS Manager",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  const [activeDirectory, setActiveDirectory] = useState<"Teachers" | "Students">("Teachers");
  const [searchQuery, setSearchQuery] = useState("");

  const teachers = [
    { name: "Ven. Soratha Thero", role: "Head Principal", phone: "+94 77 111 2222", status: "Active" },
    { name: "Sunil Jayasekara", role: "Abhidhamma Teacher", phone: "+94 77 333 4444", status: "Active" },
    { name: "Manel Wijesinghe", role: "Dhamma Teacher", phone: "+94 77 555 6666", status: "Active" },
  ];

  const students = [
    { name: "Kavindu Perera", class: "Grade 08", phone: "+94 77 123 4567", status: "Active" },
    { name: "Amara Jayasekara", class: "Grade 08", phone: "+94 77 789 1234", status: "Active" },
    { name: "Devinda Silva", class: "Grade 08", phone: "+94 77 456 7890", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E6DDD0]">
        <div>
          <h1 className="text-3xl font-normal font-serif text-[#6B1D3A] italic">Admin Workspace</h1>
          <p className="text-xs text-[#1C1C1E]/70 mt-1.5">Manage users, school metrics, and public pages.</p>
        </div>
      </div>

      <DashboardLayoutTabs title="Admin Menu" tabs={tabs}>
        {(activeTab) => (
          <div className="space-y-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="border-b border-[#E6DDD0] pb-3">
                  <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Overview Dashboard</h2>
                  <p className="text-xs text-[#1C1C1E]/70 mt-1">Key administrative statistics and operational panels.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-[#FFF8F0] border border-[#E6DDD0] p-6">
                    <span className="block text-[10px] font-bold tracking-widest text-[#837561] uppercase">Total Students</span>
                    <span className="block text-4xl font-serif text-[#6B1D3A] mt-2 italic">104</span>
                  </div>
                  <div className="bg-[#FFF8F0] border border-[#E6DDD0] p-6">
                    <span className="block text-[10px] font-bold tracking-widest text-[#837561] uppercase">Active Teachers</span>
                    <span className="block text-4xl font-serif text-[#6B1D3A] mt-2 italic">10</span>
                  </div>
                  <div className="bg-[#FFF8F0] border border-[#E6DDD0] p-6">
                    <span className="block text-[10px] font-bold tracking-widest text-[#837561] uppercase">Open Registrations</span>
                    <span className="block text-4xl font-serif text-[#6B1D3A] mt-2 italic">08</span>
                  </div>
                  <div className="bg-[#FFF8F0] border border-[#E6DDD0] p-6">
                    <span className="block text-[10px] font-bold tracking-widest text-[#837561] uppercase">Late Approvals</span>
                    <span className="block text-4xl font-serif text-[#6B1D3A] mt-2 italic">02</span>
                  </div>
                </div>

                {/* Settings Configuration Card */}
                <div className="bg-white border border-[#E6DDD0] p-6 space-y-4">
                  <h4 className="text-xs font-bold text-[#6B1D3A] uppercase tracking-wider border-b border-[#E6DDD0] pb-2">Saturday Class Registration Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-[#837561] uppercase mb-2">Registration Cycle</label>
                      <select className="w-full px-3 py-2 bg-[#FFF8F0] border border-[#E6DDD0] text-xs focus:outline-none rounded-none">
                        <option>Open (All Cycles)</option>
                        <option>January Cycle Only</option>
                        <option>Closed (July Exceptions)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#837561] uppercase mb-2">Registration Fee (LKR)</label>
                      <input
                        type="number"
                        defaultValue={1000}
                        className="w-full px-3 py-2 bg-[#FFF8F0] border border-[#E6DDD0] text-xs focus:outline-none focus:border-[#6B1D3A] rounded-none"
                      />
                    </div>
                    <div className="flex items-end">
                      <button className="w-full px-4 py-2 bg-[#6B1D3A] hover:text-white text-white text-[10px] font-bold tracking-widest uppercase rounded-none border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon">
                        Update Global Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="border-b border-[#E6DDD0] pb-3">
                  <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">User Directory</h2>
                  <p className="text-xs text-[#1C1C1E]/70 mt-1">Review profiles, status flags, and roles.</p>
                </div>

                {/* Directory filter toggle tabs */}
                <div className="flex justify-between items-center bg-[#FFF8F0] p-4 border border-[#E6DDD0]">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveDirectory("Teachers")}
                      className={`px-4 py-2 text-[10px] font-bold tracking-wider uppercase rounded-none border transition-all ${
                        activeDirectory === "Teachers"
                          ? "bg-[#6B1D3A] text-white border-[#6B1D3A]"
                          : "bg-white text-[#1C1C1E] border-[#E6DDD0]"
                      }`}
                    >
                      Teachers
                    </button>
                    <button
                      onClick={() => setActiveDirectory("Students")}
                      className={`px-4 py-2 text-[10px] font-bold tracking-wider uppercase rounded-none border transition-all ${
                        activeDirectory === "Students"
                          ? "bg-[#6B1D3A] text-white border-[#6B1D3A]"
                          : "bg-white text-[#1C1C1E] border-[#E6DDD0]"
                      }`}
                    >
                      Students
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder={`Search ${activeDirectory.toLowerCase()}...`}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#E6DDD0] text-xs focus:outline-none focus:border-[#6B1D3A] w-64 rounded-none"
                  />
                </div>

                {/* Ledger Roster Table */}
                <div className="border border-[#E6DDD0] overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FFF8F0] border-b border-[#E6DDD0] text-[#6B1D3A] font-bold uppercase tracking-wider">
                        <th className="p-4">Name</th>
                        <th className="p-4">{activeDirectory === "Teachers" ? "Assigned Role" : "Class Room"}</th>
                        <th className="p-4">Contact Phone</th>
                        <th className="p-4 text-right">Status Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6DDD0]">
                      {activeDirectory === "Teachers" ? (
                        teachers
                          .filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((teacher, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.08 }}
                              className="hover:bg-[#FFF8F0] transition-colors font-sans"
                            >
                              <td className="p-4 font-serif text-base text-[#1C1C1E]">{teacher.name}</td>
                              <td className="p-4 text-[#1C1C1E] font-medium">{teacher.role}</td>
                              <td className="p-4 text-[#837561]">{teacher.phone}</td>
                              <td className="p-4 text-right pr-6 font-bold text-green-700">{teacher.status}</td>
                            </motion.tr>
                          ))
                      ) : (
                        students
                          .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((student, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.08 }}
                              className="hover:bg-[#FFF8F0] transition-colors font-sans"
                            >
                              <td className="p-4 font-serif text-base text-[#1C1C1E]">{student.name}</td>
                              <td className="p-4 text-[#1C1C1E] font-medium">{student.class}</td>
                              <td className="p-4 text-[#837561]">{student.phone}</td>
                              <td className={`p-4 text-right pr-6 font-bold ${
                                student.status === "Active" ? "text-green-700" : "text-[#E8A317]"
                              }`}>
                                {student.status}
                              </td>
                            </motion.tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "cms" && (
              <div className="space-y-6">
                <div className="border-b border-[#E6DDD0] pb-3">
                  <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Website CMS Customization</h2>
                  <p className="text-xs text-[#1C1C1E]/70 mt-1">Configure public header, footer, homepage titles, and descriptions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Public Hero Title</label>
                    <input
                      type="text"
                      defaultValue="Nurturing Wisdom & Virtue"
                      className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Public Hero Subtext</label>
                    <textarea
                      rows={3}
                      defaultValue="For over 20 years, Susilodaya English Medium Dhamma School has guided generations of students in the path of the Dhamma, cultivating compassionate hearts and clear minds. Join us every Saturday morning."
                      className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">School Header Brand Text</label>
                    <input
                      type="text"
                      defaultValue="Susilodaya"
                      className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Footer Bottom Text</label>
                    <input
                      type="text"
                      defaultValue="May all beings be well and happy."
                      className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6DDD0]">
                  <button className="px-8 py-3.5 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-none border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon">
                    Publish Website CMS Updates
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
