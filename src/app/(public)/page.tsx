import { db } from "@/lib/db";

export default async function Home() {
  let cmsItems: any[] = [];
  try {
    cmsItems = await db.query.cmsContent.findMany();
  } catch (error) {
    console.error("Database query failed:", error);
  }

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-[#7A1F1D]">Susilodaya Dhamma School</h1>
      <p className="max-w-md text-lg text-[#5C4B47] mb-8">
        Welcome to the Susilodaya Dhamma School Platform. Our database connection is active and seeded successfully.
      </p>
      <div className="bg-white border border-[#F0E6D6] p-6 rounded-2xl shadow-sm max-w-lg w-full text-left">
        <h2 className="text-xl font-bold mb-3 text-[#7A1F1D] border-b border-[#F0E6D6] pb-2 font-serif">Seeded CMS Sections</h2>
        {cmsItems.length > 0 ? (
          <ul className="space-y-2">
            {cmsItems.map((item: any) => (
              <li key={item.id} className="text-sm text-[#5C4B47]">
                <strong className="text-[#8B5A2B]">{item.sectionKey}:</strong> {JSON.stringify(item.contentData).substring(0, 80)}...
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
