import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteImages } from '../../services/basketService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";
import { clearSelector } from "../../../store/slices/selectorSlice";

export const useDeleteImagesMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: deleteImages,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['basket', 'infinite'] });
            dispatch(addLogEntry(createLog({ message: "Изображения удалены", type: "info" })));
            dispatch(clearSelector());
        },
        onError: (error) => {
            console.error('Ошибка загрузки изображений:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка удаления изображений", type: "error" })));
        },
    })
};