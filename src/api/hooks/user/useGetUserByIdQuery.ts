import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/usersService';

export const useGetUserByIdQuery = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
        enabled: !!id,
    });
};