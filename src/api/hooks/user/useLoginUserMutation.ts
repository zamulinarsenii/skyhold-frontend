// hooks/users/useLoginUserMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/usersService';
import { setUser } from '../../../store/slices/userSlice';
import axios from 'axios'; 

export const useLoginUserMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      dispatch(setUser(user));
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data?.error || error.response.data?.message || 'Ошибка входа';
        console.error('Ошибка входа:', serverMessage);
      } else {
        console.error('Неизвестная ошибка:', error);
      }
    },
  });
};