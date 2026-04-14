// hooks/friends/useAcceptFriendMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptFriend } from '../../services/friendsService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";

export const useAcceptFriendMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: acceptFriend,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends'] });
            dispatch(addLogEntry(createLog({ message: "Запрос на дружбу принят", type: "info" })));
        },
        onError: (error) => {
            console.error('Ошибка при запросе на дружбу:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка ответе на запрос на дружбу", type: "error" })));
        },
    });
};