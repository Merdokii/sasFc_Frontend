const API_BASE_URL = "http://localhost:8080/api";

// Get all matches
export const getMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches`);
  if (!response.ok) throw new Error('Failed to fetch matches');
  return await response.json();
};

// Get upcoming matches
export const getUpcomingMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches?status=upcoming`);
  if (!response.ok) throw new Error('Failed to fetch upcoming matches');
  return await response.json();
};

// Get past matches
export const getPastMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches?status=past`);
  if (!response.ok) throw new Error('Failed to fetch past matches');
  return await response.json();
};

// Get single match
export const getMatch = async (id) => {
  const response = await fetch(`${API_BASE_URL}/matches/${id}`);
  if (!response.ok) throw new Error('Failed to fetch match');
  return await response.json();
};

// ✅ Create new match using FormData
export const createMatch = async (matchData) => {
  const formData = new FormData();

  for (const key in matchData) {
    if (matchData[key] !== null && matchData[key] !== undefined) {
      formData.append(key, matchData[key]);
    }
  }

  const response = await fetch(`${API_BASE_URL}/matches`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: formData
  });

  if (!response.ok) throw new Error('Failed to create match');
  return await response.json();
};

// Update match using JSON (Assuming backend accepts it)
export const updateMatch = async (id, matchData) => {
  const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: JSON.stringify(matchData)
  });
  if (!response.ok) throw new Error('Failed to update match');
  return await response.json();
};

// Delete match
export const deleteMatch = async (id) => {
  const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete match');
  return await response.json();
};
