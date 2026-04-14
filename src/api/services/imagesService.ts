import apiClient from '../useApi';
import { GetImagesParams, PageResponse, Image, ImageDetails } from '../../interfaces/images';

export const uploadImages = async (files: FileList | File[]): Promise<string> => {
    if (!files || files.length === 0) {
        throw new Error("Не выбранно ни одного файла");
    }
    const formData = new FormData();
    Array.from(files).forEach(file => {
        formData.append('files', file);
    });

    // Замените URL на ваш эндпоинт
    const response = await apiClient.post('/images/upload', formData);
    return response.data;
};

export const getUserImages = async ({ page, size }: GetImagesParams): Promise<PageResponse<Image>> => {
    const response = await apiClient.get('/images', {
        params: { page, size },
    });
    return response.data;
};

export const getFavoriteUserImages = async ({ page, size }: GetImagesParams): Promise<PageResponse<Image>> => {
    const response = await apiClient.get('/images/favorite', {
        params: { page, size },
    });
    return response.data;
};

export const getImageBlob = async (id: number): Promise<Blob> => {
    const response = await apiClient.get(`/images/${id}`, {
        responseType: 'blob',
    });
    return response.data;
};


export const getImageDetails = async (id: number): Promise<ImageDetails> => {
    const response = await apiClient.get(`/images/${id}/details`);
    return response.data;
};

export const toggleImageFavorite = async (id: number): Promise<Boolean> => {
    const response = await apiClient.post(`/images/${id}/favorite`);
    return response.data;
};

interface GetAlbumsParams {
    albumId: number;
    page: number;
    size: number;
}

export const getImagesByAlbumId = async ({ albumId, page, size }: GetAlbumsParams): Promise<PageResponse<Image>> => {
    const response = await apiClient.get(`/images/albums/${albumId}`, {
        params: { page, size },
    });
    return response.data;
};
