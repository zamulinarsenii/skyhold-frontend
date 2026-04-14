import apiClient from '../useApi';
import { GetImagesParams, PageResponse, Image } from '../../interfaces/images';

export const getBasketImages = async ({ page, size }: GetImagesParams): Promise<PageResponse<Image>> => {
    const response = await apiClient.get('/basket', {
        params: { page, size },
    });
    return response.data;
};

export const moveToBasket = async (imageIds: Array<number>): Promise<Boolean> => {
    const response = await apiClient.post(`/basket`, { imageIds });
    return response.data;
};

export const deleteImages = async (imageIds: Array<number>): Promise<Boolean> => {
    const response = await apiClient.post(`/basket/delete`, { imageIds });
    return response.data;
};


export const restoreImages = async (imageIds: Array<number>): Promise<Boolean> => {
    const response = await apiClient.post(`/basket/restore`, { imageIds });
    return response.data;
};