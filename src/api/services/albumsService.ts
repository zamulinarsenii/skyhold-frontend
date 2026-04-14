import apiClient from '../useApi';
import { Album, AlbumRequest } from '../../interfaces/albums';

export const getAlbums = async (): Promise<Album[]> => {
    const response = await apiClient.get(`/albums`);
    return response.data;
};

export const getPublicAlbums = async (profileId: number): Promise<Album[]> => {
    const response = await apiClient.get(`/albums/public`, { params: { profileId } });
    return response.data;
};

export const createAlbum = async (album: AlbumRequest): Promise<string> => {
    const response = await apiClient.post(`/albums`, album);
    return response.data;
};

export const updateAlbum = async ({ albumId, album }: {
    albumId: number, album: AlbumRequest,
}): Promise<string> => {
    const response = await apiClient.put(`/albums/${albumId}`, album);
    return response.data;
};

interface AddImagesToAlbum {
    albumId: number;
    imageIds: number[];
}

export const addImagesToAlbum = async ({ albumId, imageIds }: AddImagesToAlbum): Promise<string> => {
    const response = await apiClient.post(`/albums/${albumId}/images`, imageIds);
    return response.data;
};

export const removeImagesFromAlbum = async ({ albumId, imageIds }: AddImagesToAlbum): Promise<string> => {
    const response = await apiClient.delete(`/albums/${albumId}/images`, { data: imageIds });
    return response.data;
};

export const getAlbumById = async (albumId: number): Promise<Album> => {
    const response = await apiClient.get(`/albums/${albumId}`);
    return response.data;
};