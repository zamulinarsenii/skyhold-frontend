// hooks/albums/useCreateAlbumMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAlbum } from '../../services/sharedAlbumsService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";

export const useUpdateSharedAlbumMutation = (albumId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: updateAlbum,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['shared-album', albumId] });
            queryClient.invalidateQueries({ queryKey: ['shared-albums'] });
            dispatch(addLogEntry(createLog({ message: "Альбом изменен", type: "info" })));
        },
        onError: (error) => {
            console.error('Ошибка при создании альбома:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка при изменении альбома", type: "error" })));
        },
    });
};