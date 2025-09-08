const API_URL = 'https://api.mothershipdevelop.com';
const LAUNCHER_API_URL = 'https://launcher.mothershipdevelop.com';

const getAuthHeaders = (token) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
});

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
};

export const fetchEnvironments = async (token) => {
    const response = await fetch(`${LAUNCHER_API_URL}/environments/`, {
        headers: getAuthHeaders(token),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch environments');
    }
    return response.json();
};

export const createEnvironment = async (token, { compose_content }) => {
    const response = await fetch(`${LAUNCHER_API_URL}/environments/`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ compose_content }),
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
    return response.json();
};

export const createDeployment = async (token, { subdomain }) => {
    const response = await fetch(`${LAUNCHER_API_URL}/deploys/`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ subdomain }),
    });
    if (!response.ok) {
        throw new Error('Failed to create deployment');
    }
    return response.json();
};
