"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Tab {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface DashboardLayoutTabsProps {
  title: string;
  tabs: Tab[];
  children: (activeTab: string) => React.ReactNode;
}

export default function DashboardLayoutTabs({ title, tabs, children }: DashboardLayoutTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeTab = searchParams.get("tab") || tabs[0].id;

  const setActiveTab = (tabId: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tabId);
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[70vh]">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white border border-[#F0E6D6] rounded-2xl p-4 shadow-sm sticky top-28">
          <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
            {title}
          </h3>
          <div className="mt-4 space-y-1">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-[#FFF8F0] text-[#7A1F1D] border-l-4 border-[#7A1F1D]"
                      : "text-[#5C4B47] hover:bg-[#F9F5EF] hover:text-[#7A1F1D]"
                  }`}
                >
                  <span className={`w-5 h-5 flex-shrink-0 ${isSelected ? "text-[#7A1F1D]" : "text-[#8B5A2B]"}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 min-w-0">
        <div className={`bg-white border border-[#F0E6D6] rounded-2xl p-6 md:p-8 shadow-sm transition-opacity duration-200 ${isPending ? "opacity-60" : "opacity-100"}`}>
          {children(activeTab)}
        </div>
      </section>
    </div>
  );
}
