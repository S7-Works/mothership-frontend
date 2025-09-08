// ... (existing code)

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
