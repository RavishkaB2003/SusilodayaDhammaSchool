"use client";

import DashboardLayoutTabs from "@/components/dashboard-layout-tabs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCmsData, updateCmsTexts, uploadGalleryImage, updateGalleryConfig, updateGallerySelections, addCmsEvent, deleteCmsEvent } from "@/app/actions/cms";
import { parseGalleryImages } from "@/lib/gallery-helpers";

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
    { name: "Kavindu Perera", class: "Grade 05", phone: "+94 77 123 4567", status: "Active" },
    { name: "Amara Jayasekara", class: "Grade 05", phone: "+94 77 789 1234", status: "Active" },
    { name: "Devinda Silva", class: "Grade 05", phone: "+94 77 456 7890", status: "Pending" },
  ];

  // CMS States
  const [heroTitle, setHeroTitle] = useState("Nurturing Wisdom & Virtue");
  const [heroSubtext, setHeroSubtext] = useState("For over 20 years, Susilodaya English Medium Dhamma School has guided generations of students in the path of the Dhamma, cultivating compassionate hearts and clear minds. Join us every Saturday morning.");
  const [brandText, setBrandText] = useState("Susilodaya");
  const [footerText, setFooterText] = useState("May all beings be well and happy.");
  const [isUpdatingCms, setIsUpdatingCms] = useState(false);
  const [cmsUpdateStatus, setCmsUpdateStatus] = useState<string | null>(null);

  // Gallery States
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryFileName, setGalleryFileName] = useState("");
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [galleryUploadStatus, setGalleryUploadStatus] = useState<string | null>(null);
  const [desaturate, setDesaturate] = useState(true);
  const [galleryTag, setGalleryTag] = useState("Viharaya");
  const [galleryImagesList, setGalleryImagesList] = useState<any[]>([]);

  // Events States
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("Temple Grounds");
  const [eventDescription, setEventDescription] = useState("");
  const [eventFile, setEventFile] = useState<File | null>(null);
  const [eventFileName, setEventFileName] = useState("");
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [eventStatus, setEventStatus] = useState<string | null>(null);

  useEffect(() => {
    async function loadCMS() {
      const res = await getCmsData();
      if (res.success && res.cms) {
        if (res.cms.hero) {
          setHeroTitle(res.cms.hero.title || "");
          setHeroSubtext(res.cms.hero.subtext || "");
        }
        if (res.cms.config) {
          setBrandText(res.cms.config.brandText || "");
          setFooterText(res.cms.config.footerText || "");
        }
        if (res.cms.gallery_config) {
          setDesaturate(res.cms.gallery_config.desaturate !== false);
        }
        if (res.cms.collage_gallery) {
          setGalleryImagesList(parseGalleryImages(res.cms.collage_gallery));
        }
        if (res.cms.events && res.cms.events.events) {
          setEventsList(res.cms.events.events);
        }
      }
    }
    loadCMS();
  }, []);

  const handleToggleDesaturate = async (val: boolean) => {
    setDesaturate(val);
    const res = await updateGalleryConfig(val);
    if (!res.success) {
      console.error("Failed to save gallery toggle:", res.error);
    }
  };

  const handleToggleSelection = async (url: string, checked: boolean) => {
    let selectedUrls = galleryImagesList.filter(img => img.isSelected).map(img => img.url);
    
    if (checked) {
      if (!selectedUrls.includes(url)) {
        selectedUrls.push(url);
      }
    } else {
      selectedUrls = selectedUrls.filter(u => u !== url);
    }
    
    const res = await updateGallerySelections(selectedUrls);
    if (res.success && res.updatedImages) {
      setGalleryImagesList(res.updatedImages);
    } else {
      console.error("Failed to update selections:", res.error);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate || !eventTime) {
      setEventStatus("Error: Title, Date and Time are required.");
      return;
    }

    setIsSubmittingEvent(true);
    setEventStatus(null);

    const formData = new FormData();
    formData.append("title", eventTitle);
    formData.append("date", eventDate);
    formData.append("time", eventTime);
    formData.append("location", eventLocation);
    formData.append("description", eventDescription);
    if (eventFile) {
      formData.append("file", eventFile);
    }

    const res = await addCmsEvent(formData);
    setIsSubmittingEvent(false);

    if (res.success) {
      setEventStatus("Event added successfully!");
      setEventTitle("");
      setEventDate("");
      setEventTime("");
      setEventLocation("Temple Grounds");
      setEventDescription("");
      setEventFile(null);
      setEventFileName("");

      // Reload events list
      const cmsRes = await getCmsData();
      if (cmsRes.success && cmsRes.cms && cmsRes.cms.events && cmsRes.cms.events.events) {
        setEventsList(cmsRes.cms.events.events);
      }
      setTimeout(() => setEventStatus(null), 5000);
    } else {
      setEventStatus(`Error: ${res.error}`);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    
    const res = await deleteCmsEvent(id);
    if (res.success) {
      // Reload events list
      const cmsRes = await getCmsData();
      if (cmsRes.success && cmsRes.cms && cmsRes.cms.events && cmsRes.cms.events.events) {
        setEventsList(cmsRes.cms.events.events);
      } else if (cmsRes.success) {
        setEventsList([]);
      }
    } else {
      alert(`Delete failed: ${res.error}`);
    }
  };

  const handleSaveTexts = async () => {
    setIsUpdatingCms(true);
    setCmsUpdateStatus(null);
    const res = await updateCmsTexts({ heroTitle, heroSubtext, brandText, footerText });
    setIsUpdatingCms(false);
    if (res.success) {
      setCmsUpdateStatus("Successfully published website text updates!");
      setTimeout(() => setCmsUpdateStatus(null), 5000);
    } else {
      setCmsUpdateStatus(`Error: ${res.error}`);
    }
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFile) {
      setGalleryUploadStatus("Please attach an image first.");
      return;
    }
    setIsUploadingGallery(true);
    setGalleryUploadStatus(null);

    const formData = new FormData();
    formData.append("file", galleryFile);
    formData.append("tag", galleryTag);

    const res = await uploadGalleryImage(formData);
    setIsUploadingGallery(false);
    if (res.success) {
      setGalleryUploadStatus(desaturate ? "Image uploaded and automatically desaturated to black & white!" : "Image uploaded successfully in original color!");
      setGalleryFile(null);
      setGalleryFileName("");
      setGalleryTag("Viharaya");

      // Reload gallery list
      const cmsRes = await getCmsData();
      if (cmsRes.success && cmsRes.cms && cmsRes.cms.collage_gallery) {
        setGalleryImagesList(parseGalleryImages(cmsRes.cms.collage_gallery));
      }

      setTimeout(() => setGalleryUploadStatus(null), 5000);
    } else {
      setGalleryUploadStatus(`Upload failed: ${res.error}`);
    }
  };

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
              <div className="space-y-8">
                {/* 1. Website Texts Panel */}
                <div className="bg-white border border-[#E6DDD0] p-6 space-y-6">
                  <div className="border-b border-[#E6DDD0] pb-3">
                    <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Website Texts Customization</h2>
                    <p className="text-xs text-[#1C1C1E]/70 mt-1">Configure homepage content, headers, and footer details.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Public Hero Title</label>
                      <input
                        type="text"
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Public Hero Subtext</label>
                      <textarea
                        rows={3}
                        value={heroSubtext}
                        onChange={(e) => setHeroSubtext(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">School Header Brand Text</label>
                      <input
                        type="text"
                        value={brandText}
                        onChange={(e) => setBrandText(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Footer Bottom Text</label>
                      <input
                        type="text"
                        value={footerText}
                        onChange={(e) => setFooterText(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs"
                      />
                    </div>
                  </div>

                  {cmsUpdateStatus && (
                    <p className={`text-xs font-bold ${cmsUpdateStatus.startsWith("Error") ? "text-red-600" : "text-green-700"}`}>
                      {cmsUpdateStatus}
                    </p>
                  )}

                  <div className="pt-4 border-t border-[#E6DDD0] flex items-center">
                    <button
                      onClick={handleSaveTexts}
                      disabled={isUpdatingCms}
                      className="px-8 py-3.5 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-none border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon disabled:opacity-50"
                    >
                      {isUpdatingCms ? "Publishing..." : "Publish Website CMS Updates"}
                    </button>
                  </div>
                </div>

                {/* 2. Gallery Image Upload Panel */}
                <div className="bg-white border border-[#E6DDD0] p-6 space-y-6">
                  <div className="border-b border-[#E6DDD0] pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Upload Gallery Collage Image</h2>
                      <p className="text-xs text-[#1C1C1E]/70 mt-1">Upload an image to the homepage gallery.</p>
                    </div>
                    
                    {/* Toggle Switch */}
                    <div className="flex items-center space-x-3 bg-[#FFF8F0] border border-[#E6DDD0] px-4 py-2">
                      <label className="text-[10px] font-bold text-[#6B1D3A] uppercase tracking-wider cursor-pointer select-none" htmlFor="grayscale-toggle">
                        Grayscale Conversion
                      </label>
                      <input
                        id="grayscale-toggle"
                        type="checkbox"
                        checked={desaturate}
                        onChange={(e) => handleToggleDesaturate(e.target.checked)}
                        className="w-4 h-4 accent-[#6B1D3A] cursor-pointer"
                      />
                    </div>
                  </div>

                  <form onSubmit={handleGalleryUpload} className="space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Attach Gallery Photo</label>
                      <div className="border border-dashed border-[#837561] bg-[#FFF8F0]/30 p-8 text-center rounded-none relative cursor-pointer hover:bg-[#FFF8F0]/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setGalleryFile(e.target.files[0]);
                              setGalleryFileName(e.target.files[0].name);
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="space-y-2">
                          <svg className="w-8 h-8 text-[#8B5A2B] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="font-bold uppercase tracking-wider text-[10px] text-[#6B1D3A]">
                            {galleryFileName ? `Selected: ${galleryFileName}` : "Drag & Drop Image Attachment Here"}
                          </p>
                          <p className="text-[9px] text-[#837561]">Supports JPG, PNG, WEBP files up to 5MB</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Category Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. Assemblies, Sil Program, Classrooms"
                        value={galleryTag}
                        onChange={(e) => setGalleryTag(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs"
                      />
                    </div>

                    {galleryUploadStatus && (
                      <p className={`text-xs font-bold ${galleryUploadStatus.startsWith("Upload failed") ? "text-red-600" : "text-green-700"}`}>
                        {galleryUploadStatus}
                      </p>
                    )}

                    <div className="pt-4 border-t border-[#E6DDD0]">
                      <button
                        type="submit"
                        disabled={isUploadingGallery || !galleryFile}
                        className="px-8 py-3.5 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-none border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon disabled:opacity-50"
                      >
                        {isUploadingGallery ? "Processing..." : desaturate ? "Upload & Convert to Grayscale" : "Upload Image"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* 3. Gallery Image Manager & Selector */}
                <div className="bg-white border border-[#E6DDD0] p-6 space-y-6">
                  <div className="border-b border-[#E6DDD0] pb-3">
                    <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Manage Homepage Gallery Collage (Select 6)</h2>
                    <p className="text-xs text-[#1C1C1E]/70 mt-1">Select exactly up to 6 images to highlight on the homepage background scroll gallery. Selecting a 7th will automatically deselect the oldest selection.</p>
                  </div>

                  {galleryImagesList.length === 0 ? (
                    <p className="text-xs text-[#837561] italic">No uploaded gallery images found. Upload a photo above to start.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {galleryImagesList.map((img, idx) => (
                        <div key={idx} className="border border-[#E6DDD0] bg-[#FFF8F0]/30 p-2 flex flex-col justify-between space-y-2 relative group">
                          
                          {/* Selected Status Overlay tag */}
                          {img.isSelected && (
                            <span className="absolute top-4 right-4 bg-[#E8A317] text-white text-[8px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm uppercase tracking-wider">
                              On Home
                            </span>
                          )}

                          <div className="relative w-full aspect-square overflow-hidden bg-black/5 border border-[#E6DDD0]">
                            <img src={img.url} alt={img.tag} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-[#8B5A2B] truncate">{img.tag}</p>
                          </div>

                          <label className="flex items-center space-x-2 cursor-pointer border border-[#E6DDD0] hover:bg-[#FFF8F0] p-1.5 justify-center transition-colors">
                            <input
                              type="checkbox"
                              checked={img.isSelected}
                              onChange={(e) => handleToggleSelection(img.url, e.target.checked)}
                              className="w-3.5 h-3.5 accent-[#6B1D3A]"
                            />
                            <span className="text-[10px] font-semibold text-[#1C1C1E]">
                              {img.isSelected ? "Selected" : "Select"}
                            </span>
                          </label>

                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Events Manager Panel */}
                <div className="bg-white border border-[#E6DDD0] p-6 space-y-6">
                  <div className="border-b border-[#E6DDD0] pb-3">
                    <h2 className="text-xl font-normal font-serif text-[#6B1D3A] italic">Events Manager</h2>
                    <p className="text-xs text-[#1C1C1E]/70 mt-1">Publish, schedule, and remove upcoming school events displayed on the public bulletin board.</p>
                  </div>

                  <form onSubmit={handleAddEvent} className="space-y-4 max-w-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Event Title *</label>
                        <input
                          type="text"
                          required
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          placeholder="e.g. Saturday Special Dhamma Program"
                          className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Location</label>
                        <input
                          type="text"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          placeholder="e.g. Viharaya Main Hall"
                          className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Date *</label>
                        <input
                          type="date"
                          required
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Time *</label>
                        <input
                          type="text"
                          required
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          placeholder="e.g. 08:30 AM - 11:30 AM"
                          className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Event Description</label>
                      <textarea
                        rows={3}
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        placeholder="Provide details about activities, dress code, or requirements..."
                        className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] text-[#1C1C1E] focus:outline-none focus:border-[#6B1D3A] rounded-none text-xs resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2">Attach Event Cover Photo</label>
                      <div className="border border-dashed border-[#837561] bg-[#FFF8F0]/30 p-6 text-center rounded-none relative cursor-pointer hover:bg-[#FFF8F0]/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setEventFile(e.target.files[0]);
                              setEventFileName(e.target.files[0].name);
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="space-y-1">
                          <svg className="w-6 h-6 text-[#8B5A2B] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="font-bold uppercase tracking-wider text-[9px] text-[#6B1D3A]">
                            {eventFileName ? `Selected: ${eventFileName}` : "Drag & Drop Image Attachment Here"}
                          </p>
                          <p className="text-[8px] text-[#837561]">Supports JPG, PNG, WEBP files up to 5MB</p>
                        </div>
                      </div>
                    </div>

                    {eventStatus && (
                      <p className={`text-xs font-bold ${eventStatus.startsWith("Error") ? "text-red-600" : "text-green-700"}`}>
                        {eventStatus}
                      </p>
                    )}

                    <div className="pt-4 border-t border-[#E6DDD0]">
                      <button
                        type="submit"
                        disabled={isSubmittingEvent}
                        className="px-8 py-3.5 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-none border border-[#6B1D3A] transition-all btn-wipe btn-wipe-maroon disabled:opacity-50"
                      >
                        {isSubmittingEvent ? "Saving..." : "Add Event to Bulletin"}
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 border-t border-[#E6DDD0] pt-6 space-y-4">
                    <h3 className="text-sm font-bold text-[#6B1D3A] uppercase tracking-wider">Scheduled Bulletin Events</h3>
                    
                    {eventsList.length === 0 ? (
                      <p className="text-xs text-[#837561] italic">No upcoming events scheduled on the bulletin board.</p>
                    ) : (
                      <div className="space-y-3">
                        {eventsList.map((ev) => (
                          <div key={ev.id} className="border border-[#E6DDD0] bg-[#FFF8F0]/30 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex gap-4 items-center">
                              {ev.imageUrl && (
                                <img src={ev.imageUrl} alt={ev.title} className="w-12 h-12 object-cover border border-[#E6DDD0] grayscale" />
                              )}
                              <div className="text-left">
                                <h4 className="font-serif text-sm font-semibold text-[#6B1D3A]">{ev.title}</h4>
                                <p className="text-[11px] text-[#1C1C1E]/70 font-medium">
                                  {ev.date} | {ev.time} | {ev.location}
                                </p>
                                {ev.description && (
                                  <p className="text-xs text-[#1C1C1E]/80 mt-1 italic line-clamp-1">{ev.description}</p>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteEvent(ev.id)}
                              className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-[10px] uppercase font-bold tracking-wider transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </DashboardLayoutTabs>
    </div>
  );
}
