import { useEffect, useState } from 'react';
import { getClubStats } from '../../services/statsService';
import CountUp from 'react-countup'; // Install with: npm install react-countup

export const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getClubStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-[#339c0c] to-[#2a850a] overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium">
            Loading club achievements...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#339c0c] to-[#2a850a] overflow-hidden">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f9fd06] via-white to-[#f9fd06]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#f9fd06] font-bold mb-3 tracking-wider">CLUB ACHIEVEMENTS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            By The Numbers
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Quantifying our journey of excellence and community impact
          </p>
        </div>

        {/* PRIMARY STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Players Stat */}
          <StatCard 
            value={stats?.players || 0}
            label="Players"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          
          {/* Matches Stat */}
          <StatCard 
            value={stats?.matches || 0}
            label="Matches Played"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          
          {/* Trophies Stat */}
          <StatCard 
            value={stats?.trophies || 0}
            label="Trophies Won"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8V7a3 3 0 00-3-3H7a3 3 0 00-3 3v1m6 4h.01M12 16h.01" />
              </svg>
            }
            highlight
          />
          
          {/* Youth Stat */}
          <StatCard 
            value={stats?.youthPlayers || 0}
            label="Youth Graduates"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </div>

        {/* SECONDARY STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <MiniStatCard 
            value={stats?.goals || 0}
            label="Goals Scored"
            icon="⚽"
          />
          <MiniStatCard 
            value={stats?.cleanSheets || 0}
            label="Clean Sheets"
            icon="🧤"
          />
          <MiniStatCard 
            value={stats?.years || 0}
            label="Years Established"
            icon="🏛️"
          />
        </div>
      </div>
    </section>
  );
};

// Reusable Stat Card Component
const StatCard = ({ value, label, icon, highlight = false }) => (
  <div className={`relative p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 ${highlight ? 'bg-gradient-to-br from-[#f9fd06]/90 to-[#f9fd06] text-gray-900' : 'bg-white/10 backdrop-blur-sm text-white'}`}>
    <div className="absolute top-4 right-4 opacity-20">
      {icon}
    </div>
    <div className="text-center">
      <div className={`text-5xl font-extrabold mb-3 ${highlight ? '' : 'text-white'}`}>
        <CountUp end={value} duration={2.5} separator="," />
      </div>
      <div className={`text-sm uppercase tracking-wider font-medium ${highlight ? 'text-gray-700' : 'text-white/80'}`}>
        {label}
      </div>
    </div>
  </div>
);

// Reusable Mini Stat Card Component
const MiniStatCard = ({ value, label, icon }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-[#f9fd06]/30 transition-all">
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-2xl font-bold text-white mb-1">
      <CountUp end={value} duration={2} separator="," />
    </div>
    <div className="text-xs uppercase tracking-wider text-white/70">
      {label}
    </div>
  </div>
);