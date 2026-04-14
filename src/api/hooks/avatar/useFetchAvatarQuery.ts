// hooks/useAvatar.ts
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAvatarBlob } from '../../services/avatarService';

export const useFetchAvatarQuery = () => {
    const { data: blob, isLoading, error } = useQuery({
        queryKey: ['user-avatar'],
        queryFn: getAvatarBlob,
        retry: false
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