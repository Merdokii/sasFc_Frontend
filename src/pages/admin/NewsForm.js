import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsItem, createNews, updateNews } from '../../services/newsService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: '', // Renamed from 'image' to 'imageUrl' for clarity
    imageFile: null, // To store the actual file object
    featured: false
  });

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const newsData = await getNewsItem(id);
          setFormData({
            title: newsData.title,
            excerpt: newsData.excerpt,
            content: newsData.content,
            category: newsData.category,
            date:newsData.date ? newsData.date.split('T')[0] : new Date().toISOString().split('T')[0],
            imageUrl: newsData.image, // Backend sends 'image', map to 'imageUrl'
            imageFile: null, // No file on initial load
            featured: newsData.featured
          });
        } catch (error) {
          console.error('Error fetching news:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchNews();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { imageFile, imageUrl, ...dataToSend } = formData; // Separate imageFile and imageUrl

    try {
      if (id) {
        await updateNews(id, dataToSend, imageFile);
      } else {
        await createNews(dataToSend, imageFile);
      }
      navigate('/admin/news');
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit News Article' : 'Create New Article'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="CLUB">Club News</option>
              <option value="MATCH">Match Report</option>
              <option value="TRANSFER">Transfers</option>
              <option value="YOUTH">Youth Academy</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            accept="image/*"
          />
          {formData.imageUrl && !formData.imageFile && (
            <p className="text-sm text-gray-500 mt-1">Current image: <a href={formData.imageUrl} target="_blank" rel="noopener noreferrer">{formData.imageUrl.split('/').pop()}</a></p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['link', 'image'],
                ['clean']
              ]
            }}
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 text-sas-green-700 focus:ring-sas-green-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
            Featured Article
          </label>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/news')}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-sas-green-700 text-white rounded hover:bg-sas-green-800"
          >
            {id ? 'Update Article' : 'Publish Article'}
          </button>
        </div>
      </form>
    </div>
  );
};
