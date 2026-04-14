import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoreImages } from '../../services/basketService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";
import { clearSelector } from "../../../store/slices/selectorSlice";

export const useRestoreImagesMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: restoreImages,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['basket', 'infinite'] });
            dispatch(addLogEntry(createLog({ message: "Изображения восстановлены", type: "info" })));
            dispatch(clearSelector());
        },
        onError: (error) => {
            console.error('Ошибка загрузки изображений:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка восстановления изображений", type: "error" })));
        },
    })
};