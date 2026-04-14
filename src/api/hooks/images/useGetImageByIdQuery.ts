// api/hooks/images/useGetImageByIdQuery.ts
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getImageBlob } from '../../services/imagesService';

export const useGetImageByIdQuery = (id: number | undefined) => {
    const { data: blob, isLoading, error } = useQuery({
        queryKey: ['image', id],
        queryFn: () => getImageBlob(id!),
        enabled: !!id,
    });
    const [url, setUrl] = useState<string>();

    useEffect(() => {
        if (!blob) {
            if (url) URL.revokeObjectURL(url);
            setUrl(undefined);
            return;
        }
        const newUrl = URL.createObjectURL(blob);
        setUrl(newUrl);
        return () => URL.revokeObjectURL(newUrl);
    }, [blob]);

    return { url, isLoading, error };
};