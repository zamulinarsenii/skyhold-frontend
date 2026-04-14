// hooks/images/useInfiniteUserImagesQuery.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserImages } from '../../services/imagesService';

export const useInfiniteUserImagesQuery = (size: number = 20) => {
    return useInfiniteQuery({
        queryKey: ['images', 'infinite'],
        queryFn: ({ pageParam = 0 }) => getUserImages({ page: pageParam, size }),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.currentPage + 1;
            return nextPage < lastPage.totalPages ? nextPage : undefined;
        },
        initialPageParam: 0,
    });
};