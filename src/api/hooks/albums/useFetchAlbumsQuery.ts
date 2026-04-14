import { useQuery } from '@tanstack/react-query';
import { getAlbums } from '../../services/albumsService';

export const useFetchAlbumsQuery = () => {
    return useQuery({
        queryKey: ['albums'],
        queryFn: getAlbums,
    });
};