import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createMatch,
  updateMatch,
  getMatch,
} from '../../services/matchService';
import {getTeams} from '../../services/teamsService';

export const MatchForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    competition: 'League',
    venue: 'Home Stadium',
    homeTeamName: '',
    awayTeamName: '',
    homeScore: '',
    awayScore: '',
    status: 'scheduled',
  });

  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadTeams = async () => {
      const teamsData = await getTeams();
      setTeams(teamsData);
    };

    const loadMatch = async () => {
      const matchData = await getMatch(id);
      const teamsData = await getTeams();
      setTeams(teamsData);

      const homeTeam = teamsData.find(
        (team) => team.id === matchData.homeTeam.id
      );
      const awayTeam = teamsData.find(
        (team) => team.id === matchData.awayTeam.id
      );

      setFormData({
        date: matchData.date?.split('T')[0] || '',
        time: matchData.time || '19:00',
        competition: matchData.competition || 'League',
        venue: matchData.venue || '',
        homeTeamName: homeTeam?.name || '',
        awayTeamName: awayTeam?.name || '',
        homeScore: matchData.homeScore ?? '',
        awayScore: matchData.awayScore ?? '',
        status: matchData.status || 'scheduled',
      });
    };

    if (id) {
      loadMatch();
    } else {
      loadTeams();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateMatch(id, formData);
      } else {
        await createMatch(formData);
      }
      navigate('/admin/matches');
    } catch (error) {
      console.error('Error saving match:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-semibold mb-6">
        {id ? 'Edit Match' : 'Create Match'}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Competition</label>
          <input
            type="text"
            name="competition"
            value={formData.competition}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Venue</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Home Team</label>
          <select
            name="homeTeamName"
            value={formData.homeTeamName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Away Team</label>
          <select
            name="awayTeamName"
            value={formData.awayTeamName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Home Score</label>
          <input
            type="number"
            name="homeScore"
            value={formData.homeScore}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-1">Away Score</label>
          <input
            type="number"
            name="awayScore"
            value={formData.awayScore}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {id ? 'Update Match' : 'Create Match'}
        </button>
      </div>
    </form>
  );
};
