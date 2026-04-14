import { useQuery } from '@tanstack/react-query';
import { getAlbums } from '../../services/sharedAlbumsService';

export const useGetSharedAlbumsQuery = () => {
    return useQuery({
        queryKey: ['shared-albums'],
        queryFn: getAlbums,
    });
};