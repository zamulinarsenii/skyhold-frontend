// hooks/albums/useCreateAlbumMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAlbum } from '../../services/albumsService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";

export const useUpdateAlbumMutation = (albumId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: updateAlbum,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['albums'] });
            queryClient.invalidateQueries({ queryKey: ['album', albumId] });
            dispatch(addLogEntry(createLog({ message: "Альбом изменен", type: "info" })));
        },
        onError: (error) => {
            console.error('Ошибка при создании альбома:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка при изменении альбома", type: "error" })));
        },
    });
};