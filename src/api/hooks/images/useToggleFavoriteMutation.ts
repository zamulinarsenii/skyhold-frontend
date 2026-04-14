import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleImageFavorite } from '../../services/imagesService';

export const useToggleFavoriteMutation = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleImageFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['image-details', id] });
        },
    })
};