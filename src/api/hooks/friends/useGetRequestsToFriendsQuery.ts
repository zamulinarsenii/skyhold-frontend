import { useQuery } from '@tanstack/react-query';
import { getRequestsToFriends } from '../../services/friendsService';
export const useGetRequestsToFriendsQuery = () => {
    return useQuery({
        queryKey: ['friends', 'requests'],
        queryFn: getRequestsToFriends,
    });
};