"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  user: any | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setIsScrolled(currentScroll > 50);
      if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
      } else {
        setScrollDirection("up");
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Exams", href: "/exams" },
    { name: "Events", href: "/events" },
    { name: "Enrollment", href: "/enrollment" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-6xl px-4 transition-all duration-500"
      style={{
        left: "50%",
        transform: `translate(-50%, ${scrollDirection === "down" ? "-150%" : "0"})`,
      }}
    >
      <header
        className={`glass-nav px-6 sm:px-8 py-3 transition-all duration-500 ${
          isScrolled ? "scale-[0.98]" : "scale-100"
        } ${isOpen ? "nav-expanded" : ""}`}
      >
        <div className="flex justify-between items-center w-full" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          {/* Logo & School Name */}
          <div className="flex-shrink-0 flex items-center pr-4 border-r border-[#E6DDD0]/80 h-full" style={{ display: "flex", alignItems: "center" }}>
            <Link href="/" className="flex items-center space-x-3 group" style={{ display: "flex", alignItems: "center" }}>
              <div className="relative w-12 h-12 overflow-hidden flex items-center justify-center" style={{ width: "48px", height: "48px", minWidth: "48px" }}>
                <img
                  src="/assets/logo.png"
                  alt="Susilodaya Logo"
                  className="w-full h-full object-contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="flex flex-col text-left" style={{ display: "flex", flexDirection: "column" }}>
                <span className="font-serif text-xl font-normal tracking-tight text-[#6B1D3A] italic leading-none group-hover:text-[#E8A317] transition-colors">
                  Susilodaya
                </span>
                <span className="text-[7px] font-bold tracking-[0.15em] text-[#8B5A2B] uppercase mt-1 leading-none">
                  English Medium Dhamma School
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-200 hover:text-[#E8A317] ${
                  isActive(link.href) ? "text-[#E8A317]" : "text-[#1C1C1E]/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Action CTA Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <Link
                href={`/${user.user_metadata?.role || "student"}`}
                className="bg-[#E8A317] text-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-[#6B1D3A] transition-all duration-300 rounded-cta"
              >
                Workspace ↗
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-[#E8A317] text-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-[#6B1D3A] transition-all duration-300 rounded-cta"
              >
                Portal Login ↗
              </Link>
            )}
          </div>

          {/* Mobile Menu Burger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-[#1C1C1E] hover:text-[#E8A317] focus:outline-none transition-all"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer (Inside floating glass nav) */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[#E6DDD0]/60 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase transition-all rounded-full ${
                  isActive(link.href)
                    ? "bg-[#6B1D3A]/10 text-[#6B1D3A]"
                    : "text-[#1C1C1E] hover:bg-[#E6DDD0]/30 hover:text-[#E8A317]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#E6DDD0]/60 px-4">
              {user ? (
                <Link
                  href={`/${user.user_metadata?.role || "student"}`}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-[#E8A317] text-white text-[11px] font-bold tracking-widest uppercase rounded-full hover:bg-[#6B1D3A] transition-all rounded-cta"
                >
                  Workspace ↗
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-[#6B1D3A] text-white text-[11px] font-bold tracking-widest uppercase rounded-full hover:bg-[#E8A317] transition-all rounded-cta"
                >
                  Portal Login ↗
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
