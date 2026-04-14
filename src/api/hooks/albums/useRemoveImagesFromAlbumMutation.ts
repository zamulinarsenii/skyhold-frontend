// hooks/albums/useRemoveImagesFromAlbumMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeImagesFromAlbum } from '../../services/albumsService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";
import { clearSelector } from '../../../store/slices/selectorSlice';

export const useRemoveImagesFromAlbumMutation = (id: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: removeImagesFromAlbum,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['album', id, 'images'] });
            dispatch(addLogEntry(createLog({ message: "Фотографии удалены из альбома", type: "info" })));
            dispatch(clearSelector())
        },
        onError: (error) => {
            console.error('Ошибка при добавлении фотографий в альбом:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка при удалении фотографий из альбома", type: "error" })));
        },
    });
};