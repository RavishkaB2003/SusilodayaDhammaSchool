"use client";

export default function GoogleMap() {
  return (
    <div className="relative w-full h-[450px] bg-[#FFF8F0] p-2 border border-[#E6DDD0] rounded-none shadow-none group">
      {/* Editorial offset frame backing */}
      <div className="absolute inset-0 border border-[#6B1D3A]/20 pointer-events-none z-10 m-3" />
      
      {/* Map Inner Container */}
      <div className="w-full h-full relative overflow-hidden bg-white/40 border border-[#E6DDD0]">
        {/* Title Overlay Info Box */}
        <div className="absolute top-4 left-4 z-20 max-w-[260px] bg-[#FFF8F0]/95 border border-[#E6DDD0] p-4 rounded-none shadow-none backdrop-blur-sm text-left">
          <h4 className="text-sm font-normal font-serif text-[#6B1D3A] italic leading-tight">Temple Junction, Negombo</h4>
          <p className="text-[10px] text-[#1C1C1E]/80 mt-1.5 leading-relaxed">
            We are located at the Susilodaya Viharaya compound on Temple Road near Temple Junction, Negombo.
          </p>
        </div>

        <iframe
          title="Google Map Location"
          src="https://maps.google.com/maps?q=Temple%20Junction,%20Negombo,%20Sri%20Lanka&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
