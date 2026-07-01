import DashboardLayoutTabs from "@/components/dashboard-layout-tabs";

export default function StudentPage() {
  const tabs = [
    {
      id: "overview",
      name: "Overview",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
    {
      id: "progress",
      name: "Progress Path",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#F0E6D6]">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#7A1F1D]">Student Workspace</h1>
          <p className="text-sm text-[#5C4B47] mt-1">Check grades, configure your profile, and download study guides.</p>
        </div>
      </div>

      <DashboardLayoutTabs title="Student Menu" tabs={tabs}>
        {(activeTab) => (
          <div className="transition-all duration-200">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#7A1F1D] mb-4">Dashboard Overview</h2>
                <p className="text-[#5C4B47] leading-relaxed">
                  Placeholder for attendance rate stats ring, term report cards, and active download material guides lists.
                </p>
              </div>
            )}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#7A1F1D] mb-4">Profile Settings</h2>
                <p className="text-[#5C4B47] leading-relaxed">
                  Placeholder for inputs to customize display profile name and upload avatar images.
                </p>
              </div>
            )}
            {activeTab === "progress" && (
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#7A1F1D] mb-4">Academic Journey Path</h2>
                <p className="text-[#5C4B47] leading-relaxed">
                  Placeholder for continuous visual progress timeline showing grades history and teacher comments across past academic years.
                </p>
              </div>
            )}
          </div>
        )}
      </DashboardLayoutTabs>
    </div>
  );
}
