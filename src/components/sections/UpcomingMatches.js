import { useEffect, useState } from 'react';
import { MatchCard } from '../common/MatchCard';
import { getUpcomingMatches } from '../../services/matchService';

export const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getUpcomingMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#339c0c] font-bold mb-3 tracking-wider">FIXTURES</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
            Upcoming Matches
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mark your calendar for our next thrilling encounters
          </p>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden h-96 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : matches.length > 0 ? (
          <>
            {/* MATCHES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matches.map(match => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  variant="upcoming"
                />
              ))}
            </div>

            {/* COUNTDOWN BANNER (OPTIONAL) */}
            {matches[0] && (
              <div className="mt-12 bg-gradient-to-r from-[#339c0c] to-[#2a850a] rounded-2xl p-6 text-white text-center">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold mb-2">Next Match Countdown</h3>
                  <div className="flex justify-center space-x-4">
                    <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                      <div className="text-2xl font-bold">07</div>
                      <div className="text-xs">Days</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                      <div className="text-2xl font-bold">14</div>
                      <div className="text-xs">Hours</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 min-w-[70px]">
                      <div className="text-2xl font-bold">32</div>
                      <div className="text-xs">Minutes</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm opacity-90">
                    {matches[0].homeTeam.name} vs {matches[0].awayTeam.name} at {matches[0].venue}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-gray-500 mb-4">No upcoming matches scheduled</div>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Check back later for updates on our next fixtures
            </p>
            <a 
              href="/matches" 
              className="inline-block bg-[#339c0c] hover:bg-[#2a850a] text-white font-medium py-2 px-6 rounded-full transition"
            >
              View Past Matches
            </a>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <a 
            href="/matches" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#339c0c] to-[#2a850a] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 group"
          >
            Full Match Schedule
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