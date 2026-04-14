import apiClient from '../useApi';

export const getAvatarBlob = async (): Promise<Blob> => {
    const response = await apiClient.get('/avatar', {
        responseType: 'blob',
    });

    return response.data;
};

export const getAvatarByIdBlob = async (id: number): Promise<Blob> => {
    const response = await apiClient.get(`/avatar/${id}`, {
        responseType: 'blob',
    });

    return response.data;
};

export const uploadAvatar = async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    // Замените URL на ваш эндпоинт
    const response = await apiClient.post('/avatar/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};