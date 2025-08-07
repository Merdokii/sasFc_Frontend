import { format } from 'date-fns';

export const MatchCard = ({ match }) => {
  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';
  const isFinished = match.status === 'finished';

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(249,253,6,0.2)] transition-all duration-500 group">
      {/* LIVE MATCH RIBBON */}
      {isLive && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            LIVE NOW
          </div>
        </div>
      )}

      {/* MATCH DATE HEADER */}
      <div className={`p-4 ${isLive ? 'bg-red-900/30' : 'bg-[#339c0c]/20'} backdrop-blur-sm`}>
        <p className="text-center font-bold text-white/90">
          {format(new Date(match.date), 'EEEE, MMMM do')}
        </p>
        <div className="flex justify-center items-center mt-1 space-x-4">
          <span className="text-sm font-medium text-[#f9fd06]">
            {match.time}
          </span>
          <span className="text-white/60 text-sm">•</span>
          <span className="text-sm text-white/70">
            {match.competition}
          </span>
        </div>
      </div>
      
      {/* TEAMS & SCORE */}
      <div className="p-6 relative">
        {/* VENUE BADGE */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border-2 border-[#f9fd06]/50 rounded-full px-4 py-1 text-xs font-bold text-white shadow-lg">
          {match.venue}
        </div>

        <div className="flex items-center justify-between pt-4">
          {/* HOME TEAM */}
          <div className="text-center w-2/5">
            <div className="h-20 w-20 mx-auto mb-3 bg-gray-800 p-1 rounded-full border-2 border-[#339c0c]/30 group-hover:border-[#f9fd06]/50 transition-all">
              <img 
                src={match.homeTeam.logo || '/images/team-default.png'} 
                alt={match.homeTeam.name} 
                className="h-full w-full object-contain p-1"
              />
            </div>
            <h3 className="font-bold text-white truncate px-2">{match.homeTeam.name}</h3>
            {isFinished && (
              <div className="text-3xl font-black mt-2 text-white">
                {match.homeTeam.score}
              </div>
            )}
          </div>
          
          {/* MATCH STATUS */}
          <div className="text-center w-1/5 flex flex-col items-center justify-center">
            {isUpcoming ? (
              <div className="text-xl font-extrabold bg-gray-800 text-white/60 rounded-full w-14 h-14 flex items-center justify-center border border-gray-700">
                VS
              </div>
            ) : (
              <>
                <div className={`text-3xl font-black mb-1 ${isLive ? 'text-[#f9fd06] animate-pulse' : 'text-white'}`}>
                  {match.homeTeam.score} - {match.awayTeam.score}
                </div>
                {isLive && (
                  <div className="text-xs font-medium bg-gray-800 text-[#f9fd06] px-2 py-0.5 rounded-full">
                    {match.minute}' minute
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* AWAY TEAM */}
          <div className="text-center w-2/5">
            <div className="h-20 w-20 mx-auto mb-3 bg-gray-800 p-1 rounded-full border-2 border-[#339c0c]/30 group-hover:border-[#f9fd06]/50 transition-all">
              <img 
                src={match.awayTeam.logo || '/images/team-default.png'} 
                alt={match.awayTeam.name} 
                className="h-full w-full object-contain p-1"
              />
            </div>
            <h3 className="font-bold text-white truncate px-2">{match.awayTeam.name}</h3>
            {isFinished && (
              <div className="text-3xl font-black mt-2 text-white">
                {match.awayTeam.score}
              </div>
            )}
          </div>
        </div>

        {/* MATCH PROGRESS BAR (FOR LIVE MATCHES) */}
        {isLive && (
          <div className="mt-6 bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#339c0c] to-[#f9fd06] h-full rounded-full" 
              style={{ width: `${(match.minute / 90) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {/* ACTION BUTTON */}
      <div className="px-6 pb-6 pt-2 text-center">
        <a 
          href={`/matches/${match.id}`} 
          className={`inline-block px-6 py-2 rounded-full font-bold transition-all duration-300 ${
            isLive 
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-[#339c0c] hover:bg-[#2a850a] text-white shadow-md hover:shadow-lg'
          }`}
        >
          {isLive ? 'Watch Live' : isUpcoming ? 'Match Preview' : 'Match Report'}
        </a>
      </div>

      {/* HOVER EFFECT ELEMENTS */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#f9fd06]/20 rounded-xl transition-all duration-500 pointer-events-none" />
    </div>
  );
};