import { useQuery } from '@tanstack/react-query';
import { getImageDetails } from '../../services/imagesService';

export const useGetImageDetailsQuery = (id: number) => {
    return useQuery({
        queryKey: ['image-details', id],
        queryFn: () => getImageDetails(id!),
    });
};