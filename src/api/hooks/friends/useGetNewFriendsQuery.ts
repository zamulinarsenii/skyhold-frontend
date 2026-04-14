import { useQuery } from '@tanstack/react-query';
import { getNewFriends } from '../../services/friendsService';

export const useGetNewFriendsQuery = (searchLogin: string, enabled = true) => {
    return useQuery({
        queryKey: ['friends', 'search', searchLogin],
        queryFn: () => getNewFriends(searchLogin),
        enabled: enabled && !!searchLogin?.trim(), 
        staleTime: 60 * 1000,
    });
};