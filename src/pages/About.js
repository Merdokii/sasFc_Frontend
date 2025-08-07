import React from 'react';

export const About = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-28 md:py-36">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/team-action.jpg')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-[#f9fd06] font-bold mb-4 tracking-wider uppercase text-sm">
              Who We Are
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#f9fd06] to-[#f9fd06]">
                Our Story
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto text-white/90 leading-relaxed">
              From local pitches to regional glory - the journey of Saris Addis Sefer FC
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* History & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {/* History */}
          <div className="relative">
            <div className="absolute -left-8 top-0 h-full w-1 bg-gradient-to-b from-[#339c0c] to-[#f9fd06] rounded-full hidden md:block"></div>
            <div className="pl-0 md:pl-10">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <span className="w-10 h-10 bg-[#339c0c] rounded-full flex items-center justify-center text-white mr-4 text-lg">
                  1
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#339c0c] to-[#2a850a]">
                  Our History
                </span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p className="leading-relaxed">
                  Founded in 2010, <span className="font-semibold text-[#339c0c]">Saris Addis Sefer Football Club</span> emerged from 
                  the dusty pitches of our neighborhood, born from a shared passion for the beautiful game.
                </p>
                <p className="leading-relaxed">
                  What began as a group of friends kicking a ball after work has blossomed into a regional 
                  powerhouse, while never losing sight of our community roots.
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#f9fd06] shadow-sm mt-8">
                  <p className="italic text-lg">
                    "We don't just build footballers, we build character. The pitch is our classroom."
                  </p>
                  <p className="mt-3 font-medium text-gray-600 flex items-center">
                    <span className="w-8 h-8 bg-[#339c0c]/10 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-[#339c0c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    Coach Alemayehu, Founding Member
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <span className="w-10 h-10 bg-[#f9fd06] rounded-full flex items-center justify-center text-gray-900 mr-4 text-lg">
                2
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f9fd06] to-[#e6c905]">
                Our Mission
              </span>
            </h2>
            <ul className="space-y-6">
              {[
                "Develop world-class talent from local communities",
                "Promote health, discipline and teamwork through sport",
                "Be a beacon of hope and opportunity for youth",
                "Elevate Ethiopian football standards",
                "Maintain our community values at all levels",
                "Compete with integrity and sportsmanship"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-7 h-7 bg-[#339c0c] rounded-full flex items-center justify-center text-white mr-4 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700 flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#339c0c] to-[#2a850a]">
              Club Milestones
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: "2015",
                title: "Regional Division Champions",
                description: "First major trophy marking our arrival on the competitive scene",
                icon: "🏆",
                color: "bg-[#339c0c]"
              },
              {
                year: "2018",
                title: "Community Club of the Year",
                description: "Recognized for outstanding youth development programs",
                icon: "👨‍👩‍👧‍👦",
                color: "bg-[#f9fd06] text-gray-900"
              },
              {
                year: "2022",
                title: "Youth Development Award",
                description: "National recognition for our academy's success",
                icon: "⭐",
                color: "bg-gray-800"
              }
            ].map((achievement, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className={`h-2 ${achievement.color.split(' ')[0]}/80`}></div>
                <div className="p-8">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">
                    {achievement.icon}
                  </div>
                  <div className="flex items-center mb-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold ${achievement.color} shadow-md`}>
                      {achievement.year}
                    </div>
                    <h3 className="text-xl font-bold ml-4 text-gray-800">{achievement.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Photo Section */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl mb-24 group">
          <div className="relative h-64 md:h-96">
            <img 
              src="/images/team-photo.jpg" 
              alt="SAS FC Team" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Our 2023 Family</h3>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">
                The squad carrying the dreams of Saris Addis Sefer
              </p>
              <button className="mt-6 px-6 py-3 bg-[#f9fd06] text-gray-900 font-bold rounded-full hover:bg-white transition-colors duration-300 inline-flex items-center">
                Meet the Team
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#339c0c]/10 to-[#f9fd06]/10 rounded-2xl p-8 md:p-12 border border-[#f9fd06]/20">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to Join Our Journey?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
              Whether as a player, supporter, or partner - be part of something special
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/join" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#339c0c] to-[#2a850a] text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 group"
              >
                Get Involved
                <svg 
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-8 py-4 bg-white text-gray-800 font-bold rounded-full border-2 border-[#339c0c] hover:bg-[#339c0c]/10 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};