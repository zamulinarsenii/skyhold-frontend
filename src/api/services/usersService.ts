import apiClient from '../useApi';
import { User, LoginUser, UserResponse, UserProfile } from '../../interfaces/user';


export const loginUser = async (userData: LoginUser): Promise<User> => {
  const response = await apiClient.post<UserResponse>('/users/login', userData);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};

export const createUser = async (userData: Omit<User, 'id' | 'registrationDate'>): Promise<User> => {
  const response = await apiClient.post<UserResponse>('/users/registration', userData);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');

  const response = await apiClient.get<UserResponse>('/users/me');
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const getUserById = async (id: number): Promise<UserProfile> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};
