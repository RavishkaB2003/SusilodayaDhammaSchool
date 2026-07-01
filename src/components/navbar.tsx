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
    <nav className="sticky top-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#F0E6D6] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5">
              <svg className="w-8 h-8 text-[#7A1F1D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C11.5 5 8 8.5 5.5 8.5C3 8.5 2 9.5 2 11C2 12.5 3 13.5 5.5 13.5C8 13.5 11.5 17 12 20C12.5 17 16 13.5 18.5 13.5C21 13.5 22 12.5 22 11C22 9.5 21 8.5 18.5 8.5C16 8.5 12.5 5 12 2Z" fill="currentColor" fillOpacity="0.15" />
              </svg>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#7A1F1D]">Susilodaya</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-[#7A1F1D] ${
                  isActive(link.href) ? "text-[#7A1F1D]" : "text-[#5C4B47]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <Link
                href={`/${user.user_metadata?.role || "student"}`}
                className="px-5 py-2.5 bg-[#8B5A2B] hover:bg-[#6F441E] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 bg-[#7A1F1D] hover:bg-[#5C1412] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm"
              >
                Enter Portal
              </Link>
            )}
          </div>

          {/* Mobile Menu Burger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-[#5C4B47] hover:text-[#7A1F1D] hover:bg-[#F0E6D6] focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#F0E6D6]" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive(link.href)
                    ? "bg-[#FFF8F0] text-[#7A1F1D]"
                    : "text-[#5C4B47] hover:bg-[#F9F5EF] hover:text-[#7A1F1D]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-[#F0E6D6] px-4">
              {user ? (
                <Link
                  href={`/${user.user_metadata?.role || "student"}`}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-[#8B5A2B] text-white font-semibold rounded-xl transition-all shadow-sm"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-[#7A1F1D] text-white font-semibold rounded-xl transition-all shadow-sm"
                >
                  Enter Portal
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
