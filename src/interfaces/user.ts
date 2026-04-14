export interface User {
  id?: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
  user: User;
}

export interface UserProfile {
  id: number;
  login: string;
  friend: boolean;
}