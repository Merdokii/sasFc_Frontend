export const Sponsors = () => {
  const sponsors = [
    {
      name: "Addis Brewery",
      logo: "/sponsors/addis-brewery.png",
      url: "https://addisbrewery.com",
      tier: "platinum"
    },
    {
      name: "Saris Motors",
      logo: "/sponsors/saris-motors.png",
      url: "https://sarismotors.com",
      tier: "gold"
    },
    {
      name: "Abyssinia Bank",
      logo: "/sponsors/abyssinia-bank.png",
      url: "https://abyssiniabank.com",
      tier: "gold"
    },
    {
      name: "Local Community Partners",
      logo: "/sponsors/community.png",
      url: "#",
      tier: "silver"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#339c0c] font-bold mb-3 tracking-wider">STRATEGIC PARTNERSHIPS</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
            Our Valued Sponsors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proudly supported by industry leaders who share our vision for excellence
          </p>
        </div>

        {/* PLATINUM SPONSOR */}
        <div className="mb-20 text-center">
          <div className="inline-block bg-gradient-to-r from-gray-200 to-white px-6 py-2 rounded-full shadow-sm mb-8">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
              Platinum Partner
            </h3>
          </div>
          <div className="flex justify-center">
            {sponsors.filter(s => s.tier === 'platinum').map(sponsor => (
              <a 
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mx-6 transition-all duration-500 hover:scale-105"
              >
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-gray-100 to-white shadow-xl border border-gray-200">
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#f9fd06]/50 transition-all duration-300"></div>
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="h-32 object-contain p-4"
                  />
                </div>
                <p className="mt-4 text-gray-700 font-medium group-hover:text-[#339c0c] transition-colors">
                  {sponsor.name}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* GOLD SPONSORS */}
        <div className="mb-16">
          <div className="inline-block bg-gradient-to-r from-gray-200 to-white px-6 py-2 rounded-full shadow-sm mb-8 mx-auto">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest text-center">
              Gold Partners
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {sponsors.filter(s => s.tier === 'gold').map(sponsor => (
              <a 
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-center transition-all duration-500 hover:scale-[1.03]"
              >
                <div className="relative p-1 rounded-xl bg-gradient-to-br from-gray-100 to-white shadow-lg border border-gray-200">
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#f9fd06]/30 transition-all duration-300"></div>
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="h-24 object-contain p-3 mx-auto"
                  />
                </div>
                <p className="mt-3 text-gray-600 text-sm font-medium group-hover:text-[#339c0c] transition-colors">
                  {sponsor.name}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* SILVER SPONSORS */}
        <div className="mb-12">
          <div className="inline-block bg-gradient-to-r from-gray-200 to-white px-6 py-2 rounded-full shadow-sm mb-8 mx-auto">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest text-center">
              Community Partners
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {sponsors.filter(s => s.tier === 'silver').map(sponsor => (
              <a 
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-center transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="relative p-1 rounded-lg bg-gray-50 shadow-md border border-gray-200">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="h-16 object-contain p-2 mx-auto"
                  />
                </div>
                <p className="mt-2 text-gray-500 text-xs font-medium group-hover:text-[#339c0c] transition-colors">
                  {sponsor.name}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a 
            href="/sponsorship" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#339c0c] to-[#2a850a] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 group"
          >
            Become a Sponsor
            <svg 
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};