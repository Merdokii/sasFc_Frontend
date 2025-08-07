export const Lightbox = ({ image, onClose, onPrev, onNext, currentIndex, totalImages }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-[#f9fd06] transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button 
        onClick={onPrev}
        className="absolute left-4 md:left-8 text-white hover:text-[#f9fd06] transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="relative max-w-4xl w-full">
        <img 
          src={image.url} 
          alt={image.caption || 'Gallery image'} 
          className="max-h-[80vh] w-full object-contain"
        />
        {image.caption && (
          <div className="mt-4 text-center text-white">
            <p className="text-lg font-medium">{image.caption}</p>
          </div>
        )}
        <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm">
          {currentIndex} of {totalImages}
        </div>
      </div>

      <button 
        onClick={onNext}
        className="absolute right-4 md:right-8 text-white hover:text-[#f9fd06] transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};