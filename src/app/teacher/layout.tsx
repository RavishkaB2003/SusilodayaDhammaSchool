import { checkRole } from "@/lib/auth-guard";
import { signOut } from "@/app/actions/auth";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await checkRole("teacher");

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#2C1B18] font-sans flex flex-col">
      <header className="border-b border-[#F0E6D6] px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold font-serif text-[#7A1F1D]">Susilodaya Teacher</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-[#5C4B47]">{profile.fullName}</span>
          <form action={signOut}>
            <button className="text-sm px-3 py-1.5 rounded-md border border-[#F0E6D6] hover:bg-[#F9F5EF] text-[#7A1F1D] font-medium transition-colors">
              Sign Out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
    </div>
  );
}
