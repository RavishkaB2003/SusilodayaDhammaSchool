"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  user: any | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Exams", href: "/exams" },
    { name: "Enrollment", href: "/enrollment" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FFF8F0]/80 backdrop-blur-md border-b border-[#E6DDD0] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Section - framed by clean vertical grid line */}
          <div className="flex-shrink-0 flex items-center pr-6 border-r border-[#E6DDD0]/80 h-full">
            <Link href="/" className="flex items-center space-x-3 group">
              <svg className="w-7 h-7 text-[#7A1F1D] transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C11.5 5 8 8.5 5.5 8.5C3 8.5 2 9.5 2 11C2 12.5 3 13.5 5.5 13.5C8 13.5 11.5 17 12 20C12.5 17 16 13.5 18.5 13.5C21 13.5 22 12.5 22 11C22 9.5 21 8.5 18.5 8.5C16 8.5 12.5 5 12 2Z" fill="currentColor" fillOpacity="0.08" />
              </svg>
              <span className="font-serif text-3xl font-normal tracking-tight text-[#7A1F1D] italic">
                Susilodaya
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links - uppercase and wider tracking */}
          <div className="hidden md:flex items-center space-x-10 h-full px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[#7A1F1D] ${
                  isActive(link.href) ? "text-[#7A1F1D]" : "text-[#5C4B47]/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action CTA Button - styled as a refined pill with diagonal arrow */}
          <div className="hidden md:flex items-center pl-6 border-l border-[#E6DDD0]/80 h-full">
            {user ? (
              <Link
                href={`/${user.user_metadata?.role || "student"}`}
                className="px-6 py-2.5 bg-[#8B5A2B] hover:bg-[#724820] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-sm flex items-center space-x-1.5"
              >
                <span>Workspace</span>
                <span className="text-xs">↗</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 bg-[#7A1F1D] hover:bg-[#5C1412] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-sm flex items-center space-x-1.5"
              >
                <span>Portal Login</span>
                <span className="text-xs">↗</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Burger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-[#5C4B47] hover:text-[#7A1F1D] hover:bg-[#F0E6D6]/40 focus:outline-none transition-all"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FFF8F0] border-b border-[#E6DDD0]" id="mobile-menu">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                  isActive(link.href)
                    ? "bg-[#E6DDD0]/30 text-[#7A1F1D]"
                    : "text-[#5C4B47] hover:bg-[#E6DDD0]/20 hover:text-[#7A1F1D]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 pb-2 border-t border-[#E6DDD0] px-4">
              {user ? (
                <Link
                  href={`/${user.user_metadata?.role || "student"}`}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3.5 bg-[#8B5A2B] text-white text-xs font-bold tracking-widest uppercase rounded-full transition-all shadow-sm"
                >
                  Workspace ↗
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3.5 bg-[#7A1F1D] text-white text-xs font-bold tracking-widest uppercase rounded-full transition-all shadow-sm"
                >
                  Portal Login ↗
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
