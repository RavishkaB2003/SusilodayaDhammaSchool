"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Exam {
  id: string;
  name: string;
  date: string; // "YYYY-MM-DD"
  startTime: string;
  endTime: string;
  description: string | null;
}

interface ExamCalendarWidgetProps {
  exams: Exam[];
}

export default function ExamCalendarWidget({ exams }: ExamCalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Month names
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Days of week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper to format Date object into YYYY-MM-DD
  const formatDateStr = (y: number, m: number, d: number): string => {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  };

  // Get total days in month and starting day index
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDateStr(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDateStr(null);
  };

  // Find exams on a specific date
  const getExamsForDate = (dateStr: string): Exam[] => {
    return exams.filter((exam) => exam.date === dateStr);
  };

  // Selected date exams
  const selectedExams = selectedDateStr ? getExamsForDate(selectedDateStr) : [];

  // Generate calendar days
  const calendarCells = [];
  
  // Padded empty cells at start
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push({
      key: `empty-${i}`,
      element: (
        <div key={`empty-${i}`} className="h-12 md:h-16 border border-[#E6DDD0] bg-[#FFF8F0]/30 rounded-none"></div>
      )
    });
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const cellDateStr = formatDateStr(year, month, day);
    const dayExams = getExamsForDate(cellDateStr);
    const hasExams = dayExams.length > 0;
    const isSelected = selectedDateStr === cellDateStr;

    calendarCells.push({
      key: `day-${day}`,
      element: (
        <button
          key={`day-${day}`}
          onClick={() => setSelectedDateStr(cellDateStr)}
          className={`h-12 md:h-16 border flex flex-col items-center justify-between p-1.5 md:p-2 text-sm font-semibold transition-all relative rounded-none ${
            isSelected
              ? "border-2 border-[#E8A317] bg-[#6B1D3A] text-white"
              : hasExams
              ? "border-[#E6DDD0] bg-[#E8A317]/10 text-[#6B1D3A] hover:bg-[#E8A317]/25"
              : "border-[#E6DDD0] bg-white text-[#1C1C1E] hover:bg-[#FFF8F0]"
          }`}
        >
          <span className="self-start text-xs md:text-sm">{day}</span>
          
          {/* Exam indicator dot */}
          {hasExams && !isSelected && (
            <span className="w-1.5 h-1.5 bg-[#6B1D3A]"></span>
          )}
          {hasExams && isSelected && (
            <span className="w-1.5 h-1.5 bg-white animate-pulse"></span>
          )}
        </button>
      )
    });
  }

  // Next month padding to keep 6-row grid clean
  const totalCellsCount = calendarCells.length;
  const remainingCells = 42 - totalCellsCount;
  for (let i = 0; i < remainingCells; i++) {
    calendarCells.push({
      key: `empty-end-${i}`,
      element: (
        <div key={`empty-end-${i}`} className="h-12 md:h-16 border border-[#E6DDD0] bg-[#FFF8F0]/30 rounded-none"></div>
      )
    });
  }

  // Grid container Framer Motion variants
  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015
      }
    }
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Sidebar list item container variants
  const listContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Calendar Grid Box */}
      <div className="lg:col-span-8 bg-white border border-[#E6DDD0] p-6 rounded-none shadow-none space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-normal font-serif text-[#6B1D3A] tracking-tight italic">
            {months[month]} {year}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-none border border-[#E6DDD0] hover:bg-[#FFF8F0] text-[#6B1D3A] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-none border border-[#E6DDD0] hover:bg-[#FFF8F0] text-[#6B1D3A] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center pb-2 border-b border-[#E6DDD0]">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-xs font-bold uppercase tracking-wider text-[#6B1D3A]">
                {day}
              </span>
            ))}
          </div>
          
          {/* Calendar grid cells with staggered entrances */}
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            key={`${year}-${month}`} // Re-trigger entry animation when changing months
            className="grid grid-cols-7 mt-2 border border-[#E6DDD0] rounded-none"
          >
            {calendarCells.map((cell) => (
              <motion.div variants={cellVariants} key={cell.key} className="rounded-none">
                {cell.element}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Selected Day Details Panel - Slides in with clean crop reveal */}
      <div className="lg:col-span-4 bg-white border border-[#E6DDD0] p-6 rounded-none shadow-none min-h-[300px] flex flex-col overflow-hidden">
        <h4 className="text-xs font-bold tracking-wider text-[#6B1D3A] uppercase border-b border-[#E6DDD0] pb-3 mb-4">
          Exam Schedule Details
        </h4>

        <AnimatePresence mode="wait">
          {selectedDateStr ? (
            <motion.div
              key={selectedDateStr}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-grow flex flex-col justify-between"
            >
              {selectedExams.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#6B1D3A] bg-[#FFF8F0] border border-[#E6DDD0] px-2.5 py-1 rounded-none inline-block">
                    Date: {new Date(selectedDateStr).toLocaleDateString("en-US", { dateStyle: "long" })}
                  </div>
                  
                  {/* Staggered detailed list items */}
                  <motion.div
                    variants={listContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {selectedExams.map((exam) => (
                      <motion.div
                        variants={listItemVariants}
                        key={exam.id}
                        className="p-4 bg-[#FFF8F0] border border-[#E6DDD0] rounded-none space-y-2"
                      >
                        <h5 className="font-serif text-lg font-normal italic text-[#6B1D3A]">{exam.name}</h5>
                        <div className="flex items-center space-x-2 text-xs text-[#1C1C1E] font-semibold">
                          <svg className="w-4 h-4 text-[#E8A317]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{exam.startTime} - {exam.endTime}</span>
                        </div>
                        {exam.description && (
                          <p className="text-xs text-[#1C1C1E]/80 leading-relaxed pt-2 border-t border-[#E6DDD0]/60">
                            {exam.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-8 my-auto space-y-3">
                  <div className="inline-block p-3 rounded-none bg-[#FFF8F0] text-[#6B1D3A] border border-[#E6DDD0]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h5 className="font-serif font-normal italic text-[#6B1D3A] text-lg">No Exams Scheduled</h5>
                  <p className="text-xs text-[#1C1C1E]/70 leading-relaxed max-w-[220px] mx-auto">
                    Weekly Dhamma school classes held Saturdays from 8:30 AM to 11:30 AM will proceed as normal.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-8 my-auto space-y-3 flex-grow flex flex-col justify-center">
              <div className="inline-block p-3 rounded-none bg-[#FFF8F0] text-[#6B1D3A] border border-[#E6DDD0] mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h5 className="font-serif font-normal italic text-[#6B1D3A] text-lg">Select a Date</h5>
              <p className="text-xs text-[#1C1C1E]/70 leading-relaxed max-w-[200px] mx-auto">
                Click on any highlighted calendar cell to review scheduled exam details and times.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
