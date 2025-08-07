import { Link } from 'react-router-dom';

export const PlayerCard = ({ player }) => {
  return (
    <Link to={`/players/${player.id}`} className="group">
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_-15px_rgba(249,253,6,0.3)] transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
        {/* PLAYER IMAGE WITH GRADIENT OVERLAY */}
        <div className="relative h-72 overflow-hidden">
          <img 
            src={player.imageUrl || '/images/player-default.jpg'} 
            alt={player.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* DYNAMIC GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
          
          {/* POSITION BADGE */}
          <div className="absolute top-4 right-4 bg-[#339c0c] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            {player.position}
          </div>
          
          {/* JERSEY NUMBER */}
          <div className="absolute bottom-4 left-4 text-[#f9fd06] text-5xl font-black opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            #{player.jerseyNumber}
          </div>
        </div>
        
        {/* PLAYER INFO */}
        <div className="p-6 relative z-10">
          {/* NAME & NATIONALITY */}
          <div className="mb-4">
            <h3 className="text-2xl font-extrabold text-white group-hover:text-[#f9fd06] transition-colors">
              {player.name}
            </h3>
            <div className="flex items-center mt-1">
              <span className="text-[#f9fd06] text-sm font-medium">{player.nationality}</span>
            </div>
          </div>
          
          {/* STATS GRID */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/50 rounded-lg p-2 group-hover:bg-gray-800 transition-colors">
              <div className="text-xs text-gray-400">Age</div>
              <div className="text-lg font-bold text-white">{player.age}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-2 group-hover:bg-gray-800 transition-colors">
              <div className="text-xs text-gray-400">Height</div>
              <div className="text-lg font-bold text-white">{player.height || '1.82m'}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-2 group-hover:bg-gray-800 transition-colors">
              <div className="text-xs text-gray-400">Weight</div>
              <div className="text-lg font-bold text-white">{player.weight || '75kg'}</div>
            </div>
          </div>
          
          {/* SKILL METER (OPTIONAL) */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Skill</span>
              <span>{player.skillRating || '82'}/100</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-[#339c0c] to-[#f9fd06] h-1.5 rounded-full" 
                style={{ width: `${player.skillRating || 82}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* HOVER EFFECT ELEMENTS */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#f9fd06]/30 rounded-2xl transition-all duration-500 pointer-events-none" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#f9fd06] rounded-tr-2xl" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#f9fd06] rounded-bl-2xl" />
        </div>
      </div>
    </Link>
  );
};