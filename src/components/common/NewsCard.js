import { format } from 'date-fns';

export const NewsCard = ({ newsItem }) => {
  const date = new Date(newsItem.date);
  const formattedDate = !isNaN(date) ? format(date, 'MMMM d, yyyy') : 'Unknown date';

  return (
    <div className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(249,253,6,0.2)] transition-all duration-500 transform hover:-translate-y-2">
      {/* IMAGE WITH GRADIENT OVERLAY */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={newsItem.imageUrl || '/images/news-default.jpg'} 
          alt={newsItem.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* DATE & CATEGORY OVERLAY */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="text-sm text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            {formattedDate}
          </span>
          <span className="text-xs font-bold bg-[#339c0c] text-white px-3 py-1 rounded-full shadow-md">
            {newsItem.category}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-[#f9fd06] transition-colors line-clamp-2">
          {newsItem.title}
        </h3>
        <p className="text-gray-300 mb-5 line-clamp-3">
          {newsItem.excerpt}
        </p>
        
        {/* READ MORE LINK */}
        <div className="flex items-center">
          <a 
            href={`/news/${newsItem.id}`} 
            className="text-[#f9fd06] font-medium flex items-center group-hover:underline"
          >
            Read Full Story
            <svg 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <div className="ml-auto text-xs text-gray-500">
            {newsItem.readTime || '3 min'} read
          </div>
        </div>
      </div>

      {/* HOVER EFFECTS */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#f9fd06]/20 rounded-xl transition-all duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#339c0c] to-[#f9fd06] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};