export const Hero = () => {
  const galleryImages = [
    "/stadium.jpg",
    "/team-celebration.jpg",
    "/fans.jpg",
    "/training.jpg",
  ];

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-screen flex items-center overflow-hidden bg-gray-900 pt-16 md:pt-0">
      {/* === MOBILE-OPTIMIZED SLIDING GALLERY === */}
      <div className="absolute inset-0 flex overflow-hidden opacity-80">
        <div className="flex animate-infinite-scroll items-center h-full">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <div key={i} className="relative h-full w-screen flex-shrink-0">
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-gray-900/20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* === CONTENT CONTAINER (MOBILE PADDING) === */}
      <div className="container mx-auto px-6 relative z-10 py-12 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">
          {/* LEFT COLUMN */}
          <div className="lg:order-1 text-center lg:text-left">
            {/* LOGO (SMALLER ON MOBILE) */}
            <img 
              src="/logo.png" 
              alt="SAS FC Logo" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto lg:mx-0 mb-6 md:mb-8"
            />

            {/* HEADLINE (STACKED ON MOBILE) */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight">
              <span className="block text-white">Saris</span>
              <span className="block text-[#f9fd06]">Addis Sefer FC</span>
            </h1>

            {/* SUBTITLE WITH ACCENT BAR */}
            <div className="flex flex-col md:flex-row items-center mb-8 md:mb-10">
              <div className="w-16 h-1 bg-[#f9fd06] mb-3 md:mb-0 md:mr-4"></div>
              <p className="text-lg md:text-2xl text-white/80 italic">
                The pride of our community
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN (BUTTONS) */}
          <div className="lg:order-2 lg:pl-12">
            <div className="flex flex-col space-y-4 md:space-y-6 max-w-md mx-auto lg:mx-0">
              <button className="relative overflow-hidden group text-left p-4 md:p-6 bg-[#f9fd06]/90 hover:bg-[#f9fd06] text-gray-900 font-bold rounded-lg md:rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl">
                <span className="relative z-10 flex items-center justify-center md:justify-start">
                  <span className="text-xl md:text-2xl">Latest Results</span>
                  <svg className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </button>

              <button className="relative overflow-hidden group text-left p-4 md:p-6 bg-white/5 hover:bg-white/10 text-white font-bold border border-white/20 rounded-lg md:rounded-xl transition-all duration-500 backdrop-blur-sm">
                <span className="relative z-10 flex items-center justify-center md:justify-start">
                  <span className="text-xl md:text-2xl">Join Our Club</span>
                  <svg className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY ANIMATION */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
          width: calc(200%);
        }
      `}</style>
    </section>
  );
};