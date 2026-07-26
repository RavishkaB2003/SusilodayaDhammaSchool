import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user || null;
  } catch (error) {
    // Suppress unauthenticated/missing environment variables errors in builds
    console.warn("Public layout auth status failed:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F0]">
      <Navbar user={user} />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
