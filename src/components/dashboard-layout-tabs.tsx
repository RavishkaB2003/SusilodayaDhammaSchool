"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

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
      <aside className="w-full lg:w-64 flex-shrink-0 relative">
        <div className="bg-white border border-[#E6DDD0] rounded-none p-4 shadow-none sticky top-28">
          <h3 className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#837561] border-b border-[#E6DDD0] pb-2">
            {title}
          </h3>
          <div className="mt-4 space-y-1 relative">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-sm font-semibold transition-all relative rounded-none z-10 ${
                    isSelected
                      ? "text-white"
                      : "text-[#1C1C1E]/80 hover:bg-[#F0E6D6]/20 hover:text-[#6B1D3A]"
                  }`}
                >
                  {/* Saffron block indicator slide using framer-motion */}
                  {isSelected && (
                    <motion.div
                      layoutId="activePortalTabIndicator"
                      className="absolute inset-0 bg-[#E8A317] -z-10 rounded-none"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  
                  <span className={`w-5 h-5 flex-shrink-0 ${isSelected ? "text-white" : "text-[#6B1D3A]"}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content Area - slides 15px and fades in */}
      <section className="flex-1 min-w-0">
        <div className={`bg-white border border-[#E6DDD0] rounded-none p-6 md:p-8 shadow-none transition-opacity duration-200 ${isPending ? "opacity-60" : "opacity-100"}`}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {children(activeTab)}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
