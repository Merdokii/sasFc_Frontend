import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsItem } from '../services/newsService';
import { 
  FaSpinner, 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaTag,
  FaShareAlt,
  FaBookReader
} from 'react-icons/fa';
import { format } from 'date-fns';

export const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNewsItem(id);
        
        if (!data) {
          throw new Error('News article not found');
        }

        setNewsItem({
          ...data,
          date: data.date || new Date().toISOString()
        });
      } catch (err) {
        console.error('Error fetching news item:', err);
        setError(err.message || 'Failed to load news article');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <FaSpinner className="animate-spin text-[#f9fd06] text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-gray-900 min-h-screen">
        <div className="max-w-md mx-auto bg-gray-800/50 p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Article Not Found</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate('/news')}
            className="px-6 py-2 bg-[#339c0c] hover:bg-[#2a850a] text-white rounded-full transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return null; // Handled by error state
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      {/* SAS FC Brand Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/news')}
          className="flex items-center text-[#f9fd06] hover:text-white mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to News
        </button>

        {/* Article Container */}
        <div className="max-w-4xl mx-auto bg-gray-800/30 rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96 w-full overflow-hidden">
            <img
              src={newsItem.imageUrl || '/images/news-default.jpg'}
              alt={newsItem.title}
              className="w-full h-full object-cover"
              onError={e => { 
                e.target.onerror = null; 
                e.target.src = '/images/news-default.jpg'; 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                {newsItem.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center text-[#f9fd06]">
                  <FaCalendarAlt className="mr-2" />
                  <span>{format(new Date(newsItem.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center bg-[#339c0c] text-white px-3 py-1 rounded-full text-sm font-bold">
                  <FaTag className="mr-2" />
                  {newsItem.category}
                </div>
                <div className="flex items-center text-gray-300">
                  <FaBookReader className="mr-2" />
                  <span>{newsItem.readTime || '5 min'} read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-8">
            <div className="prose prose-invert max-w-none prose-lg">
              <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            </div>

            {/* Share Options */}
            <div className="mt-12 pt-6 border-t border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <FaShareAlt className="text-[#f9fd06] mr-3" />
                Share This Article
              </h3>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'WhatsApp'].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Articles Suggestion */}
            <div className="mt-12 bg-gray-800/50 p-6 rounded-xl border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-4">
                More From SAS FC
              </h3>
              <p className="text-gray-300 mb-4">
                Stay updated with the latest club news and announcements.
              </p>
              <button
                onClick={() => navigate('/news')}
                className="px-6 py-2 bg-[#339c0c] hover:bg-[#2a850a] text-white rounded-full transition-colors font-medium"
              >
                View All News
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};