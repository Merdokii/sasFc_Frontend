import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTeam, getTeam, updateTeam } from '../../services/teamsService';

const Categories = ['FIRST_TEAM', 'YOUTH', 'STAFF'];

export const TeamsForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    logoFile: null,
    logoPreview: '',
    foundedYear: '',
    homeStadium: '',
    category: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logoFile: file,
        logoPreview: URL.createObjectURL(file),
      }));
    }
  };

  // Fetch team data if editing
  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const team = await getTeam(id);
        setFormData({
          name: team.name || '',
          shortName: team.shortName || '',
          logoFile: null,
          logoPreview: team.logoUrl || '', // adjust key based on actual backend response
          foundedYear: team.foundedYear || '',
          homeStadium: team.homeStadium || '',
          category: team.category || '',
        });
      } catch (err) {
        setError('Failed to load team data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.shortName || (!id && !formData.logoFile) || !formData.category) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('shortName', formData.shortName);
      if (formData.logoFile) {
        data.append('teamLogo', formData.logoFile); // ✅ matches @RequestParam
      }
      data.append('foundedYear', formData.foundedYear);
      data.append('homeStadium', formData.homeStadium);
      data.append('category', formData.category);

      if (id) {
        await updateTeam(id, data);
      } else {
        await createTeam(data);
      }

      navigate('/admin/teams');
    } catch (err) {
      setError('Failed to save team: ' + err.message);
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Team' : 'Add New Team'}</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2">
          Name <span className="text-red-600">*</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-2">
          Short Name <span className="text-red-600">*</span>
          <input
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-2">
          Logo {id ? '(leave blank to keep current)' : ''} <span className="text-red-600">{id ? '' : '*'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            {...(!id && { required: true })}
          />
        </label>

        {formData.logoPreview && (
          <img
            src={formData.logoPreview}
            alt="Logo Preview"
            className="mb-4 max-h-32 object-contain"
          />
        )}

        <label className="block mb-2">
          Founded Year
          <input
            type="number"
            name="foundedYear"
            value={formData.foundedYear}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min="1800"
            max={new Date().getFullYear()}
            required
          />
        </label>

        <label className="block mb-2">
          Home Stadium
          <input
            type="text"
            name="homeStadium"
            value={formData.homeStadium}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mb-4">
          Team Category <span className="text-red-600">*</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select category</option>
            {Categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="bg-sas-green-700 hover:bg-sas-green-800 text-white px-4 py-2 rounded"
        >
          {id ? 'Update Team' : 'Save Team'}
        </button>
      </form>
    </div>
  );
};
