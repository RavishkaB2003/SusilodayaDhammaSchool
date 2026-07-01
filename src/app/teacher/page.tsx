import DashboardLayoutTabs from "@/components/dashboard-layout-tabs";

export default function TeacherPage() {
  const tabs = [
    {
      id: "attendance",
      name: "Mark Attendance",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "grades",
      name: "Exam Grades",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: "resources",
      name: "Upload Resources",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#F0E6D6]">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#7A1F1D]">Teacher Workspace</h1>
          <p className="text-sm text-[#5C4B47] mt-1">Record attendance, enter grades, and share lesson guides.</p>
        </div>
      </div>

      <DashboardLayoutTabs title="Teacher Menu" tabs={tabs}>
        {(activeTab) => (
          <div className="transition-all duration-200">
            {activeTab === "attendance" && (
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#7A1F1D] mb-4">Daily Attendance</h2>
                <p className="text-[#5C4B47] leading-relaxed">
                  Placeholder for check-in toggles (Present / Absent / Late) for all students registered in your assigned class.
                </p>
              </div>
            )}
            {activeTab === "grades" && (
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#7A1F1D] mb-4">Exam Marks Entry</h2>
                <p className="text-[#5C4B47] leading-relaxed">
                  Placeholder for grades input sheet, class results averages, and individual student progress timeline lookup.
                </p>
              </div>
            )}
            {activeTab === "resources" && (
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#7A1F1D] mb-4">Study Resource Uploads</h2>
                <p className="text-[#5C4B47] leading-relaxed">
                  Placeholder for PDF files upload drop-zone linked directly to your active classroom level.
                </p>
              </div>
            )}
          </div>
        )}
      </DashboardLayoutTabs>
    </div>
  );
}
