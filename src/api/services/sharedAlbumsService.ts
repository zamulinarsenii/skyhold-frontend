import apiClient from '../useApi';
import { SharedAlbum, SharedAlbumRequest } from '../../interfaces/sharedAlbums';

export const getAlbums = async (): Promise<SharedAlbum[]> => {
    const response = await apiClient.get(`/shared-albums`);
    return response.data;
};

export const createAlbum = async (album: SharedAlbumRequest): Promise<string> => {
    const response = await apiClient.post(`/shared-albums`, album);
    return response.data;
};

export const getAlbumById = async (albumId: number): Promise<SharedAlbum> => {
    const response = await apiClient.get(`/shared-albums/${albumId}`);
    return response.data;
};

export const updateAlbum = async ({ albumId, album }: {
    albumId: number, album: SharedAlbumRequest,
}): Promise<string> => {
    const response = await apiClient.put(`/shared-albums/${albumId}`, album);
    return response.data;
};