import { checkRole } from "@/lib/auth-guard";
import { signOut } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await checkRole("admin");

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1C1C1E] font-sans flex flex-col relative">
      {/* Cinematic Film Grain Texture */}
      <div className="noise-overlay" />

      <header className="px-6 py-4 flex items-center justify-between shadow-none relative z-20 border-b border-[#E6DDD0]/50 bg-white/45 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="relative w-8 h-8 overflow-hidden flex items-center justify-center bg-white border border-[#E6DDD0]/60 p-0.5">
            <img
              src="/assets/logo.png"
              alt="Susilodaya Logo"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-normal font-serif text-[#6B1D3A] italic leading-none">Susilodaya Admin</span>
            <span className="text-[6.5px] font-bold tracking-[0.1em] text-[#8B5A2B] uppercase mt-1 leading-none">English Medium Dhamma School</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-[#1C1C1E]/80">{profile.fullName}</span>
          <form action={signOut}>
            <button className="text-xs px-4 py-2 rounded-none border border-[#E6DDD0] hover:text-white text-[#6B1D3A] font-bold tracking-wider uppercase transition-all btn-wipe btn-wipe-maroon">
              Sign Out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto relative z-10">{children}</main>
    </div>
  );
}
