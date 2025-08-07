const API_BASE_URL = "http://localhost:8080/api";

export const getTeamPlayers = async (category) => {
  const response = await fetch(`${API_BASE_URL}/players?category=${category}`);
  if (!response.ok) throw new Error('Failed to fetch players');
  return await response.json();
};

export const getPlayerDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/players/${id}`);
  if (!response.ok) throw new Error('Failed to fetch player details');
  return await response.json();
};

export const getTopScorers = async () => {
  const response = await fetch(`${API_BASE_URL}/players/top-scorers`);
  if (!response.ok) throw new Error('Failed to fetch top scorers');
  return await response.json();
};

// Add these new functions for admin
export const getPlayers = async () => {
  const response = await fetch(`${API_BASE_URL}/players`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch players');
  return await response.json();
};

// Create new news article
export const createPlayer = async (player, imageFile) => {
  const formData = new FormData();
  for (const key in player) {
    formData.append(key, player[key]);
  }
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await fetch(`${API_BASE_URL}/players`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: formData
  });
  if (!response.ok) throw new Error('Failed to create news');
  return await response.json();
};

// Update news article
export const updatePlayer = async (id, player, imageFile) => {
  const formData = new FormData();
  for (const key in player) {
    formData.append(key, player[key]);
  }
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await fetch(`${API_BASE_URL}/players/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: formData
  });
  if (!response.ok) throw new Error('Failed to update news');
  return await response.json();
};


export const deletePlayer = async (id) => {
  const response = await fetch(`${API_BASE_URL}/players/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete player');
  // return await response.json();
   const text = await response.text();
  return text ? JSON.parse(text) : null;
};