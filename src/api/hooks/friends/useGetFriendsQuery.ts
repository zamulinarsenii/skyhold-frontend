import { useQuery } from '@tanstack/react-query';
import { getFriends } from '../../services/friendsService';

export const useGetFriendsQuery = (enabled = true) => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
    enabled: enabled
  });
};