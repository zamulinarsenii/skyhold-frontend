import { useQuery } from '@tanstack/react-query';
import { getAlbumById } from '../../services/sharedAlbumsService';

export const useGetSharedAlbumByIdQuery = (albumId: number) => {
    return useQuery({
        queryKey: ['shared-album', albumId],
        queryFn: () => getAlbumById(albumId),
    });
};