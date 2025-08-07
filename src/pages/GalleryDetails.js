import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaArrowLeft, FaTimes, FaExpand } from 'react-icons/fa';

export const GalleryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data fetch - replace with your API call
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // const data = await getGalleryById(id);
        const mockData = {
          id,
          title: "Team Training Session",
          date: "2023-11-15",
          images: Array(12).fill().map((_, i) => ({
            id: i,
            url: `https://source.unsplash.com/random/800x600/?soccer,training,${i}`,
            caption: i % 2 === 0 ? `Training drill #${i+1}` : null
          })),
          category: "Training"
        };
        setGallery(mockData);
      } catch (error) {
        console.error("Failed to load gallery:", error);
        navigate('/gallery');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [id]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + gallery.images.length) % gallery.images.length
      : (currentIndex + 1) % gallery.images.length;
    setCurrentIndex(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse text-[#f9fd06] text-lg">Loading gallery...</div>
    </div>
  );

  return (
    <div className="relative bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-[#339c0c]/10 to-[#f9fd06]/10 border-b border-[#f9fd06]/20">
        <div className="container mx-auto px-4 py-6">
          <button 
            onClick={() => navigate('/gallery')}
            className="flex items-center text-[#f9fd06] hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back to Galleries
          </button>
          
          <div className="mt-4 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              {gallery?.title}
            </h1>
            <div className="flex justify-center items-center mt-2 space-x-4">
              <span className="text-sm text-[#f9fd06] bg-black/30 px-3 py-1 rounded-full">
                {gallery?.category}
              </span>
              <span className="text-sm text-gray-300">
                {gallery?.date ? format(new Date(gallery.date), 'MMMM d, yyyy') : ''}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Thumbnail Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery?.images?.map((image, index) => (
            <div 
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer hover:z-10"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.url}
                alt={image.caption || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                {image.caption && (
                  <p className="text-white text-sm truncate w-full">{image.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && gallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl">
            {/* Navigation Arrows */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 sm:-ml-8 bg-black/60 hover:bg-black/80 p-3 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 sm:-mr-8 bg-black/60 hover:bg-black/80 p-3 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative">
              <img
                src={gallery.images[currentIndex].url}
                alt={gallery.images[currentIndex].caption || `Gallery image ${currentIndex + 1}`}
                className="max-h-[80vh] w-full object-contain rounded-lg"
              />
              
              {/* Caption & Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex justify-between items-center">
                  <p className="text-white font-medium">
                    {gallery.images[currentIndex].caption || `Image ${currentIndex + 1} of ${gallery.images.length}`}
                  </p>
                  <div className="flex space-x-2">
                    <button className="p-2 text-white hover:text-[#f9fd06] transition-colors">
                      <FaExpand className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={closeLightbox}
                      className="p-2 text-white hover:text-[#f9fd06] transition-colors"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-4">
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#339c0c] to-[#f9fd06]"
                  style={{ width: `${((currentIndex + 1) / gallery.images.length) * 100}%` }}
                />
              </div>
              <div className="text-center text-sm text-gray-300 mt-2">
                {currentIndex + 1} / {gallery.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};