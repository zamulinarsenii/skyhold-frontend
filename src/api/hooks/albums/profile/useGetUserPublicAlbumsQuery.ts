import { useQuery } from '@tanstack/react-query';
import { getPublicAlbums } from '../../../services/albumsService';

export const useGetUserPublicAlbumsQuery = (profileId: number) => {
    return useQuery({
        queryKey: ['albums', 'profile', profileId],
        queryFn: () => getPublicAlbums(profileId),
        enabled: !!profileId,
    });
};