import axios from 'axios';

if (!import.meta.env.VITE_SERVER_API_URL) {
    throw new Error('VITE_SERVER_API_URL is not defined in environment variables.');
}

const BASE = import.meta.env.VITE_SERVER_API_URL ?? 'http://localhost:1111';

const apiClient = axios.create({
    baseURL: `${BASE}/api/v1`,
    withCredentials: true
});

const getCurrentUser = async (userId: string) => {
    const response = await apiClient.post('/users/get-current-user', { userId });
    return response.data.data; // ensure consistent .data.data usage
};

const addUser = async (name: string) => {
    const response = await apiClient.post('/users/add-user', { name });
    return response.data.data;
};

const getClaimHistory = async (userId: string) => {
    try {
        const response = await apiClient.post('/users/get-claim-history', { userId });
        return response.data.data;
    } catch (error) {
        console.warn("No claim history or failed request", error);
        return [];
    }
};

const claimPoints = async (userId: string) => {
    const response = await apiClient.post('/users/claim-points', { userId });
    return response.data.data;
};

const getLeaderboard = async (page: number = 1) => {
    const response = await apiClient.get(`/users/leaderboard?page=${page}`);
    return response.data.data;
};


export const userApi = {
    getCurrentUser,
    addUser,
    claimPoints,
    getLeaderboard,
    getClaimHistory
};
