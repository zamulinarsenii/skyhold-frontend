// hooks/albums/useAddImagesToAlbumMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addImagesToAlbum } from '../../services/albumsService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";
import { clearSelector } from '../../../store/slices/selectorSlice';
import { useNavigate } from 'react-router-dom';

export const useAddImagesToAlbumMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return useMutation({
        mutationFn: addImagesToAlbum,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['albums'] });
            dispatch(addLogEntry(createLog({ message: "Фотографии добавлены в альбом", type: "info" })));
            dispatch(clearSelector())
            navigate('/')
        },
        onError: (error) => {
            console.error('Ошибка при добавлении фотографий в альбом:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка при добавлении фотографий в альбом", type: "error" })));
        },
    });
};