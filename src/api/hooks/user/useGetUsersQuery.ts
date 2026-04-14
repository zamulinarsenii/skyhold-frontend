import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../services/usersService';

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};