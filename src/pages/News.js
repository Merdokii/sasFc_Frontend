import { NewsCard } from '../components/common/NewsCard';
import { useEffect, useState } from 'react';
import { getLatestNews } from '../services/newsService';
import { FaNewspaper, FaArrowRight } from 'react-icons/fa';

export const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
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

  const categories = ['all', 'matches', 'transfers', 'community', 'interviews'];
  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  const loadMore = () => setVisibleItems(prev => prev + 6);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center text-[#339c0c] font-bold mb-3 tracking-wider uppercase text-sm">
            <FaNewspaper className="mr-2" />
            Latest Updates
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Club News
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest from SAS FC
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleItems(6);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#339c0c] text-white shadow-md'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 rounded-xl h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.slice(0, visibleItems).map(item => (
                <NewsCard key={item.id} newsItem={item} />
              ))}
            </div>

            {visibleItems < filteredNews.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center px-6 py-3 bg-[#339c0c] hover:bg-[#2a850a] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Load More News
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="text-gray-400 mb-3">No news articles found</div>
            <p className="text-gray-500 max-w-md mx-auto">
              {activeCategory === 'all' 
                ? 'Check back later for updates' 
                : `No ${activeCategory} news available`}
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#339c0c]/20 to-[#f9fd06]/20 rounded-xl p-8 border border-[#f9fd06]/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Never Miss an Update</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for exclusive news and offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-[#f9fd06] focus:outline-none"
              />
              <button className="px-6 py-3 bg-[#f9fd06] hover:bg-[#e6e500] text-gray-900 font-bold rounded-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};