// hooks/images/useInfiniteUserImagesQuery.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBasketImages } from '../../services/basketService';

export const useInfiniteBasketQuery = (size: number = 20) => {
    return useInfiniteQuery({
        queryKey: ['basket', 'infinite'],
        queryFn: ({ pageParam = 0 }) => getBasketImages({ page: pageParam, size }),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.currentPage + 1;
            return nextPage < lastPage.totalPages ? nextPage : undefined;
        },
        initialPageParam: 0,
    });
};