// import { useEffect, useState } from 'react';
// import { PlayerCard } from '../components/common/PlayerCard';
// import { getTeamPlayers } from '../services/playerService';

// export const Team = () => {
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState('first-team');

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         setLoading(true);
//         const data = await getTeamPlayers(activeCategory);
//         setPlayers(data);
//       } catch (error) {
//         console.error('Error fetching players:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchPlayers();
//   }, [activeCategory]);

//   return (
//     <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
//       {/* Decorative elements */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
//       <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>

//       <div className="container mx-auto px-4 py-16 relative z-10">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <span className="inline-block text-[#339c0c] font-bold mb-3 tracking-wider uppercase text-sm">
//             Meet the Squad
//           </span>
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
//             Our Team
//           </h1>
//           <p className="text-lg text-gray-300 max-w-2xl mx-auto">
//             The players and staff who make it all possible
//           </p>
//         </div>

//         {/* Category Filter */}
//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {[
//             { id: 'first-team', label: 'First Team' },
//             { id: 'youth', label: 'Youth Team' },
//             { id: 'staff', label: 'Coaching Staff' }
//           ].map((category) => (
//             <button
//               key={category.id}
//               onClick={() => setActiveCategory(category.id)}
//               className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                 activeCategory === category.id
//                   ? 'bg-[#339c0c] text-white shadow-md transform scale-105'
//                   : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
//               }`}
//             >
//               {category.label}
//             </button>
//           ))}
//         </div>

//         {/* Players Grid */}
//         {loading ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//             {[...Array(8)].map((_, index) => (
//               <div 
//                 key={index}
//                 className="bg-gray-800 rounded-2xl aspect-[3/4] animate-pulse"
//               />
//             ))}
//           </div>
//         ) : players.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//             {players.map(player => (
//               <PlayerCard key={player.id} player={player} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
//             <div className="text-gray-400 mb-3">No {activeCategory.replace('-', ' ')} members found</div>
//             <p className="text-gray-500 max-w-md mx-auto">
//               Check back later for updates
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from 'react';
import { PlayerCard } from '../components/common/PlayerCard';
import { getTeamPlayers } from '../services/playerService';
import { FaSpinner, FaExclamationTriangle, FaUsersSlash } from 'react-icons/fa';

export const Team = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('first-team');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTeamPlayers(activeCategory);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        setPlayers(data.map(p => ({
          ...p,
          position: p.position?.toUpperCase() || 'OTHER'
        })));
      } catch (err) {
        setError(err.message);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [activeCategory]);

  // Group players by position
  const positionGroups = players.reduce((groups, player) => {
    const position = player.position;
    groups[position] = groups[position] || [];
    groups[position].push(player);
    return groups;
  }, {});

  const positionOrder = [
    { 
      name: 'GOALKEEPER', 
      display: 'Goalkeepers', 
      gradient: 'bg-gradient-to-br from-blue-900/30 to-blue-700/30',
      border: 'border-blue-500'
    },
    { 
      name: 'DEFENDER', 
      display: 'Defenders', 
      gradient: 'bg-gradient-to-br from-green-900/30 to-green-700/30',
      border: 'border-green-500'
    },
    { 
      name: 'MIDFIELDER', 
      display: 'Midfielders', 
      gradient: 'bg-gradient-to-br from-yellow-900/30 to-yellow-700/30',
      border: 'border-yellow-500'
    },
    { 
      name: 'FORWARD', 
      display: 'Forwards', 
      gradient: 'bg-gradient-to-br from-red-900/30 to-red-700/30',
      border: 'border-red-500'
    },
    { 
      name: 'OTHER', 
      display: 'Staff', 
      gradient: 'bg-gradient-to-br from-purple-900/30 to-purple-700/30',
      border: 'border-purple-500'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* SAS FC Brand Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#339c0c]/10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#f9fd06] text-sm font-bold tracking-widest mb-4 uppercase">
            SAS FC ROSTER
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {activeCategory === 'first-team' ? 'First Team' : 
             activeCategory === 'youth' ? 'Youth Academy' : 'Coaching Staff'}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#339c0c] to-[#f9fd06] mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Meet the players and staff who represent our club
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-gray-800 rounded-full p-1 border border-gray-700 shadow-lg">
            {['first-team', 'youth', 'staff'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#339c0c] text-white shadow-inner'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {category === 'first-team' ? 'First Team' : 
                 category === 'youth' ? 'Youth' : 'Staff'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-[#f9fd06] text-4xl mb-4" />
            <p className="text-gray-400">Loading team roster...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-900/20 rounded-xl border border-red-700/30">
            <FaExclamationTriangle className="mx-auto text-red-400 text-4xl mb-4" />
            <h3 className="text-xl font-bold text-red-400 mb-2">Loading Error</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors font-medium"
            >
              Retry Loading
            </button>
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/30 rounded-xl border border-gray-700">
            <FaUsersSlash className="mx-auto text-gray-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No Team Members Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {activeCategory === 'staff' 
                ? 'Our coaching staff information will be available soon'
                : 'The team roster is currently being updated'}
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {positionOrder.map(({name, display, gradient, border}) => (
              positionGroups[name]?.length > 0 && (
                <section key={name} className="scroll-mt-24">
                  {/* Position Header */}
                  <div className={`${gradient} p-6 rounded-xl border-l-4 ${border} mb-8 shadow-md`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-12 rounded-full ${border.replace('border-', 'bg-')} mr-4`}></div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{display}</h2>
                        <p className="text-gray-300 mt-1">
                          {name === 'GOALKEEPER' && 'Our last line of defense'}
                          {name === 'DEFENDER' && 'The backbone of our team'}
                          {name === 'MIDFIELDER' && 'The engine of our play'}
                          {name === 'FORWARD' && 'Our attacking force'}
                          {name === 'OTHER' && 'Technical staff and coaches'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Players Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {positionGroups[name].map(player => (
                      <PlayerCard 
                        key={player.id} 
                        player={player} 
                        className="transform hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                </section>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};