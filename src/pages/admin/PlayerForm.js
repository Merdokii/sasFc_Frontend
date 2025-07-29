import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlayerDetails, createPlayer, updatePlayer } from '../../services/playerService';

export const PlayerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    jerseyNumber: '',
    age: '',
    nationality: '',
    bio: '',
    joinedDate: '',
    teamCategory: '',
    isActive: true,
    image: null, // This will be a File
    imageUrl: ''  // For preview or fallback
  });

  useEffect(() => {
    const fetchPlayer = async () => {
      if (id) {
        try {
          const player = await getPlayerDetails(id);
          setFormData({
            name: player.name,
            position: player.position,
            jerseyNumber: player.jerseyNumber,
            age: player.age,
            nationality: player.nationality || '',
            bio: player.bio || '',
            joinedDate: player.joinedDate ? player.joinedDate.slice(0, 10) : '',
            teamCategory: player.teamCategory || '',
            isActive: player.isActive ?? true,
            image: null,
            imageUrl: player.imageUrl || ''
          });
        } catch (error) {
          console.error('Error fetching player:', error);
        }
      }
      setLoading(false);
    };
    fetchPlayer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        image: files[0],
        imageUrl: URL.createObjectURL(files[0])
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('position', formData.position);
      payload.append('jerseyNumber', formData.jerseyNumber);
      payload.append('age', formData.age);
      payload.append('nationality', formData.nationality);
      payload.append('bio', formData.bio);
      payload.append('joinedDate', formData.joinedDate);
      payload.append('teamCategory', formData.teamCategory);
      payload.append('isActive', formData.isActive ? 1 : 0);
      if (formData.image) payload.append('image', formData.image);

      if (id) {
        await updatePlayer(id, payload);
      } else {
        await createPlayer(payload);
      }
      navigate('/admin/players');
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Player' : 'Add New Player'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Position</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Position</option>
              <option value="GOALKEEPER">Goalkeeper</option>
              <option value="DEFENDER">Defender</option>
              <option value="MIDFIELDER">Midfielder</option>
              <option value="FORWARD">Forward</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Jersey Number</label>
            <input
              type="number"
              name="jerseyNumber"
              value={formData.jerseyNumber}
              onChange={handleChange}
              required
              min="1"
              max="99"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="16"
              max="45"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Joined Date</label>
            <input
              type="date"
              name="joinedDate"
              value={formData.joinedDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Team Category</label>
            <select
              name="teamCategory"
              value={formData.teamCategory}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Category</option>
              <option value="FIRST_TEAM">First Team</option>
              <option value="YOUTH">Youth</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows="3"
            />
          </div>

          <div>
            <label className="block mb-1">Active</label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            <span>{formData.isActive ? 'Yes' : 'No'}</span>
          </div>

          <div>
            <label className="block mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="Preview" className="mt-2 h-24 object-cover" />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/players')}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-sas-green-700 text-white rounded hover:bg-sas-green-800"
          >
            {id ? 'Update Player' : 'Add Player'}
          </button>
        </div>
      </form>
    </div>
  );
};
