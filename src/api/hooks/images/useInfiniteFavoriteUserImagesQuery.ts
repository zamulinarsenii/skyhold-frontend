// hooks/images/useInfiniteUserImagesQuery.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFavoriteUserImages } from '../../services/imagesService';

export const useInfiniteFavoriteUserImagesQuery = (size: number = 20) => {
    return useInfiniteQuery({
        queryKey: ['favorite', 'infinite'],
        queryFn: ({ pageParam = 0 }) => getFavoriteUserImages({ page: pageParam, size }),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.currentPage + 1;
            return nextPage < lastPage.totalPages ? nextPage : undefined;
        },
        initialPageParam: 0,
    });
};