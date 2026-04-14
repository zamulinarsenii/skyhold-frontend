import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser, logout } from '../../../store/slices/userSlice';
import { fetchCurrentUser } from '../../services/usersService';
import { useLocation } from 'react-router-dom';

export const useCurrentUserQuery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  // Обработка успешной загрузки пользователя
  useEffect(() => {
    if (user && localStorage.getItem('token')) {
      dispatch(setUser(user));
      // Редиректим только если мы на странице логина или регистрации
      if (location.pathname === '/login' || location.pathname === '/registration') {
        navigate('/');
      }
    }
  }, [user, dispatch, navigate, location.pathname]);

  // Обработка ошибки (например, 401 Unauthorized)
  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(logout());
        navigate('/login');
      }
    }
  }, [error, dispatch, navigate]);

  return { data: user, isLoading };
};