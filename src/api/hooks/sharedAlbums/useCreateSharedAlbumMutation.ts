// hooks/albums/useCreateAlbumMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAlbum } from '../../services/sharedAlbumsService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";

export const useCreateSharedAlbumMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: createAlbum,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['albums'] });
            queryClient.invalidateQueries({ queryKey: ['shared-albums'] });
            dispatch(addLogEntry(createLog({ message: "Альбом создан", type: "info" })));
        },
        onError: (error) => {
            console.error('Ошибка при создании альбома:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка при создании альбома", type: "error" })));
        },
    });
};