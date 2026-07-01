import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2C1B18] text-[#FFF8F0] border-t-2 border-[#8B5A2B]/40 pt-16 pb-12 font-sans relative overflow-hidden">
      <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none">
        {/* Visual Watermark: Large Lotus Emblem */}
        <svg className="w-80 h-80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C11.5 5 8 8.5 5.5 8.5C3 8.5 2 9.5 2 11C2 12.5 3 13.5 5.5 13.5C8 13.5 11.5 17 12 20C12.5 17 16 13.5 18.5 13.5C21 13.5 22 12.5 22 11C22 9.5 21 8.5 18.5 8.5C16 8.5 12.5 5 12 2Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Logo & Vision */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#E89E5F]">Susilodaya</span>
            </div>
            <p className="text-sm text-[#F0E6D6]/80 leading-relaxed max-w-sm">
              Dedicated to cultivating spiritual wisdom, moral integrity, and deep understanding of the Dhamma among the younger generation since 1998.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-[#E89E5F] uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-[#F0E6D6]/80 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-[#F0E6D6]/80 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/exams" className="text-sm text-[#F0E6D6]/80 hover:text-white transition-colors">Upcoming Exams</Link>
              </li>
              <li>
                <Link href="/enrollment" className="text-sm text-[#F0E6D6]/80 hover:text-white transition-colors">Enrollment Portal</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-[#E89E5F] uppercase mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-[#F0E6D6]/80">
              <li className="flex items-start space-x-2.5">
                <svg className="w-5 h-5 text-[#E89E5F] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Susilodaya Viharaya, Temple Road, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <svg className="w-5 h-5 text-[#E89E5F] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+94 11 234 5678</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-[#F0E6D6]/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#F0E6D6]/50">
          <p>© {new Date().getFullYear()} Susilodaya Dhamma School. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>May all beings be well and happy.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
