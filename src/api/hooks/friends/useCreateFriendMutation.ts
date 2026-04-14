// hooks/friends/useCreateFriendMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFriend } from '../../services/friendsService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";

export const useCreateFriendMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: createFriend,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends'] });
            dispatch(addLogEntry(createLog({ message: "Запрос на дружбу отправлен", type: "info" })));
        },
        onError: (error) => {
            console.error('Ошибка при запросе на дружбу:', error);
            dispatch(addLogEntry(createLog({ message: "Ошибка при запросе на дружбу!", type: "error" })));
        },
    });
};