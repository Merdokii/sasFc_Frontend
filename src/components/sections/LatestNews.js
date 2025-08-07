import { useEffect, useState } from 'react';
import { NewsCard } from '../common/NewsCard';
import { getLatestNews } from '../../services/newsService';

export const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getLatestNews();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Optional: Filter news by category if your data supports it
  const filteredNews = activeFilter === 'all' 
    ? news 
    : news.filter(item => item.category === activeFilter);

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* SECTION HEADER WITH FILTERS */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#339c0c] font-bold mb-2">MEDIA CENTER</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
            Latest Club News
          </h2>
          
          {/* CATEGORY FILTERS (OPTIONAL) */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['all', 'matches', 'transfers', 'community', 'interviews'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  activeFilter === filter
                    ? 'bg-[#339c0c] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* NEWS GRID */}
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
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => (
              <NewsCard 
                key={item.id} 
                newsItem={item} 
                variant={activeFilter === 'all' ? item.category : activeFilter}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No news found in this category</div>
            <button 
              onClick={() => setActiveFilter('all')}
              className="px-6 py-2 bg-[#339c0c] text-white rounded-full font-medium hover:bg-[#2a850a] transition"
            >
              Show All News
            </button>
          </div>
        )}

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-16">
          <a 
            href="/news" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#339c0c] to-[#2a850a] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 group"
          >
            Explore All News
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