import { useQuery } from '@tanstack/react-query';
import { getAlbumById } from '../../services/albumsService';

export const useGetAlbumByIdQuery = (id: number) => {
    return useQuery({
        queryKey: ['album', id],
        queryFn: () => getAlbumById(id),
    });
};