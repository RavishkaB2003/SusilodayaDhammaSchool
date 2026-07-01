import DashboardLayoutTabs from "@/components/dashboard-layout-tabs";

export default function AdminPage() {
  const tabs = [
    {
      id: "overview",
      name: "Overview",
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
      name: "Website CMS",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#F0E6D6]">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#7A1F1D]">Admin Workspace</h1>
          <p className="text-sm text-[#5C4B47] mt-1">Manage users, school metrics, and public pages.</p>
        </div>
      </div>

      <DashboardLayoutTabs title="Admin Menu" tabs={tabs}>
        {(activeTab) => (
          <div className="transition-all duration-200">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#7A1F1D] mb-4">Overview Dashboard</h2>
                <p className="text-[#5C4B47] leading-relaxed">
                  Placeholder for administrative dashboard widgets, total students count, teacher attendances summary, and dynamic statistics panels.
                </p>
              </div>
            )}
            {activeTab === "users" && (
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#7A1F1D] mb-4">User Directory</h2>
                <p className="text-[#5C4B47] leading-relaxed">
                  Placeholder for active profiles lookup, data tables of teachers and students, status toggles, and recovery password updates.
                </p>
              </div>
            )}
            {activeTab === "cms" && (
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#7A1F1D] mb-4">Website CMS Manager</h2>
                <p className="text-[#5C4B47] leading-relaxed">
                  Placeholder for homepage copy updates, events list schedule scheduler, and masonry image collage upload slots.
                </p>
              </div>
            )}
          </div>
        )}
      </DashboardLayoutTabs>
    </div>
  );
}
