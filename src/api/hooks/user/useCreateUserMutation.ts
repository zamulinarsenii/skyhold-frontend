// hooks/users/useCreateUserMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../services/usersService';
import { setUser } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // убедитесь, что axios импортирован

export const useCreateUserMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      dispatch(setUser(user));
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    },
    onError: (error) => {
      // Проверяем, является ли ошибка AxiosError
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data?.error || error.response.data?.message || 'Ошибка регистрации';
        console.error('Ошибка регистрации:', serverMessage);
      } else {
        console.error('Неизвестная ошибка:', error);
      }
    },
  });
};