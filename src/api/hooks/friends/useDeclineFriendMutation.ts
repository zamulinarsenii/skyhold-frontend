// hooks/friends/useDeclineFriendMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { declineFriend } from '../../services/friendsService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";

export const useDeclineFriendMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: declineFriend,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends'] });
            dispatch(addLogEntry(createLog({ message: "Запрос на дружбу отклонен", type: "info" })));
        },
        onError: (error) => {
            console.error('Ошибка при запросе на дружбу:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка ответе на запрос на дружбу", type: "error" })));
        },
    });
};