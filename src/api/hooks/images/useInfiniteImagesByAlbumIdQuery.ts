// hooks/albums/useInfiniteUserImagesQuery.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { getImagesByAlbumId } from '../../services/imagesService';

export const useInfiniteImagesByAlbumIdQuery = (albumId: number, size = 20) => {
    return useInfiniteQuery({
        queryKey: ['album', albumId, 'images'],
        queryFn: ({ pageParam = 0 }) => getImagesByAlbumId({ albumId, page: pageParam, size }),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.currentPage + 1;
            return nextPage < lastPage.totalPages ? nextPage : undefined;
        },
        initialPageParam: 0,
        enabled: !!albumId,
    });
};