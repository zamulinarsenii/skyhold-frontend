import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moveToBasket } from '../../services/basketService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";
import { clearSelector } from "../../../store/slices/selectorSlice";

export const useMoveToBasketMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: moveToBasket,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] });
            queryClient.invalidateQueries({ queryKey: ['favorite'] });
            queryClient.invalidateQueries({ queryKey: ['album-images'] });
            queryClient.invalidateQueries({ queryKey: ['album'] });
            dispatch(addLogEntry(createLog({ message: "Изображение перемещено в корзину", type: "info" })));
            dispatch(clearSelector());
        },
        onError: (error) => {
            console.error('Ошибка загрузки изображений:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка загрузки", type: "error" })));
        },
    })
};