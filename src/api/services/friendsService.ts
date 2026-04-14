import apiClient from '../useApi';
import { Friend } from '../../interfaces/friends';

export const getFriends = async (): Promise<Friend[]> => {
    const response = await apiClient.get('/friends');
    return response.data;
};

export const getNewFriends = async (userLogin: string): Promise<Friend[]> => {
    const response = await apiClient.get('/friends/search', {
        params: { userLogin },
    });
    return response.data;
};

export const createFriend = async (id: number): Promise<Friend> => {
    const response = await apiClient.post(`/friends/${id}`);
    return response.data;
};

export const getRequestsToFriends = async (): Promise<Friend[]> => {
    const response = await apiClient.get('/friends/requests');
    return response.data;
};

export const acceptFriend = async (id: number): Promise<Friend> => {
    const response = await apiClient.post(`/friends/accept/${id}`);
    return response.data;
};

export const declineFriend = async (id: number): Promise<Friend> => {
    const response = await apiClient.delete(`/friends/decline/${id}`);
    return response.data;
};