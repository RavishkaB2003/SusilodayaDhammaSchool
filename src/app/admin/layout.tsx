import { checkRole } from "@/lib/auth-guard";
import { signOut } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await checkRole("admin");

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1C1C1E] font-sans flex flex-col">
      <header className="border-b border-[#E6DDD0] px-6 py-4 flex items-center justify-between bg-white shadow-none">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-normal font-serif text-[#6B1D3A] italic">Susilodaya Admin</span>
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
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
    </div>
  );
}
