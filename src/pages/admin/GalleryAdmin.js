import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getGalleryImages,
  deleteGalleryImage,
  getImagesByCategory,
} from '../../services/galleryService';

const categories = ['all', 'matches', 'training', 'events'];

export const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        let data;
        if (filter === 'all') {
          data = await getGalleryImages();
        } else {
          data = await getImagesByCategory(filter);
        }
        setGallery(data);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [filter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteGalleryImage(id);
        setGallery(gallery.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting gallery item:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <div className="flex space-x-4 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 shadow-sm focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <Link
            to="/admin/gallery/new"
            className="bg-sas-green-600 hover:bg-sas-green-700 text-white px-4 py-2 rounded shadow"
          >
            Add Photo
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6 text-gray-600">Loading gallery...</div>
      ) : gallery.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No gallery items found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <img
                src={item.thumbnailUrl || item.url}
                alt={item.caption}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-1">
                <p className="text-gray-800 font-medium text-sm">{item.caption}</p>
                <p className="text-xs text-gray-500 italic">Category: {item.category}</p>
                <p className="text-xs text-gray-400">Uploaded by: {item.uploaderName}</p>
                <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="mt-2 self-start text-red-600 hover:text-white hover:bg-red-600 px-3 py-1 rounded border border-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};