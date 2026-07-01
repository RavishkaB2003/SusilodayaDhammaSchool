import { db } from "@/lib/db";

export default async function Home() {
  // Simple check to show DB works
  let cmsItems: any[] = [];
  try {
    cmsItems = await db.query.cmsContent.findMany();
  } catch (error) {
    console.error("Database query failed:", error);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#FFF8F0]">
      <h1 className="text-4xl font-bold font-serif mb-4 text-[#7A1F1D]">Susilodaya Dhamma School</h1>
      <p className="max-w-md text-lg text-[#5C4B47] mb-8">
        Welcome to the Susilodaya Dhamma School Platform. Our database connection is active and seeded successfully.
      </p>
      <div className="bg-[#F0E6D6] p-6 rounded-lg shadow-sm max-w-lg w-full text-left">
        <h2 className="text-xl font-bold mb-3 text-[#7A1F1D] border-b pb-2">Seeded CMS Sections</h2>
        {cmsItems.length > 0 ? (
          <ul className="space-y-2">
            {cmsItems.map((item: any) => (
              <li key={item.id} className="text-sm">
                <strong className="text-[#8B5A2B]">{item.sectionKey}:</strong> {JSON.stringify(item.contentData).substring(0, 100)}...
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-red-500">No CMS items found. Seed the database first.</p>
        )}
      </div>
    </main>
  );
}
