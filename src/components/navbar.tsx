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
    <nav className="sticky top-0 z-50 liquid-glass border-b border-[#E6DDD0]/60 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Section - framed by clean vertical grid line */}
          <div className="flex-shrink-0 flex items-center pr-6 border-r border-[#E6DDD0]/80 h-full">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Susilodaya Logo"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-normal tracking-tight text-[#6B1D3A] italic leading-none">
                  Susilodaya
                </span>
                <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.1em] text-[#8B5A2B] uppercase mt-1 leading-none">
                  English Medium Dhamma School
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links - uppercase and wider tracking */}
          <div className="hidden md:flex items-center space-x-10 h-full px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[#6B1D3A] ${
                  isActive(link.href) ? "text-[#6B1D3A]" : "text-[#1C1C1E]/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action CTA Button - styled as a refined sharp block with diagonal arrow */}
          <div className="hidden md:flex items-center pl-6 border-l border-[#E6DDD0]/80 h-full">
            {user ? (
              <Link
                href={`/${user.user_metadata?.role || "student"}`}
                className="px-6 py-2.5 bg-[#E8A317] hover:text-[#1C1C1E] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-none transition-all duration-300 shadow-none border border-[#E8A317] flex items-center space-x-1.5 btn-wipe"
              >
                <span>Workspace</span>
                <span className="text-xs">↗</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-none transition-all duration-300 shadow-none border border-[#6B1D3A] flex items-center space-x-1.5 btn-wipe btn-wipe-maroon"
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
              className="inline-flex items-center justify-center p-2.5 rounded-none text-[#1C1C1E] hover:text-[#6B1D3A] border border-transparent hover:border-[#E6DDD0] focus:outline-none transition-all"
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
                className={`block px-4 py-3.5 rounded-none text-xs font-bold tracking-wider uppercase transition-all ${
                  isActive(link.href)
                    ? "bg-[#E6DDD0]/30 text-[#6B1D3A]"
                    : "text-[#1C1C1E] hover:bg-[#E6DDD0]/20 hover:text-[#6B1D3A]"
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
                  className="block w-full text-center px-5 py-3.5 bg-[#E8A317] text-[#1C1C1E] text-xs font-bold tracking-widest uppercase rounded-none transition-all shadow-none"
                >
                  Workspace ↗
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3.5 bg-[#6B1D3A] text-white text-xs font-bold tracking-widest uppercase rounded-none transition-all shadow-none"
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
