// hooks/images/useInfiniteImages.ts
import { useInfiniteUserImagesQuery } from './useInfiniteUserImagesQuery';
import { useInfiniteFavoriteUserImagesQuery } from './useInfiniteFavoriteUserImagesQuery';
import { useInfiniteBasketQuery } from '../basket/useInfiniteBasketQuery';
import { useInfiniteImagesByAlbumIdQuery } from './useInfiniteImagesByAlbumIdQuery';

type ImagesSource = 'user' | 'favorite' | 'basket' | 'album' | 'shared-album';

interface UseInfiniteImagesOptions {
    source: ImagesSource;
    albumId?: number; // требуется при source = 'album'
    size?: number;
}

export const useInfiniteImages = ({ source, albumId, size = 20 }: UseInfiniteImagesOptions) => {
    // Все хуки вызываются всегда (чтобы порядок вызовов не менялся)
    const userQuery = useInfiniteUserImagesQuery(size);
    const favoriteQuery = useInfiniteFavoriteUserImagesQuery(size);
    const basketQuery = useInfiniteBasketQuery(size);
    const albumQuery = useInfiniteImagesByAlbumIdQuery(albumId!, size);

    switch (source) {
        case 'favorite':
            return favoriteQuery;
        case 'album':
            return albumQuery;
        case 'basket':
            return basketQuery;
        default:
            return userQuery;
    }
};