// hooks/useAvatar.ts
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAvatarByIdBlob } from '../../services/avatarService';

export const useGetAvatarByIdQuery = (id: number) => {
    const { data: blob, isLoading, error } = useQuery({
        queryKey: ['avatar', id],
        queryFn: () => getAvatarByIdBlob(id),
        retry: false,
        enabled: !!id,
    });

    const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

    useEffect(() => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        setAvatarUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [blob]);

    return { avatarUrl, isLoading, error };
};