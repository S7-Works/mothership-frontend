const AUTH_API_URL = 'https://your-signin-registration-api.com/api'; // IMPORTANT: Replace with your actual auth API URL
const LAUNCHER_API_URL = 'https://your-remote-launcher-api.com/api/remote-launcher'; // IMPORTANT: Replace with your actual launcher API URL

const getAuthHeaders = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// --- Auth Service Functions ---

export const loginUser = async (credentials) => {
  const response = await fetch(`${AUTH_API_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

export const fetchOrgsAndTeams = async (token) => {
    const response = await fetch(`${AUTH_API_URL}/user/teams/`, { // Assuming this is the correct endpoint
        headers: getAuthHeaders(token),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch orgs and teams');
    }
    return response.json();
};


// --- Remote Launcher Service Functions ---

export const fetchEnvironments = async (token) => {
  const response = await fetch(`${LAUNCHER_API_URL}/environments/`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch environments');
  }
  return response.json();
};

export const createEnvironment = async (token, { instance_type, addons }) => {
    const response = await fetch(`${LAUNCHER_API_URL}/environments/`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ instance_type, addons }),
    });
    if (!response.ok) {
        throw new Error('Failed to create environment');
    }
    return response.json();
};

export const terminateEnvironment = async (token, instanceId) => {
    const response = await fetch(`${LAUNCHER_API_URL}/environments/${instanceId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
    });
    if (!response.ok) {
        throw new Error('Failed to terminate environment');
    }
};
