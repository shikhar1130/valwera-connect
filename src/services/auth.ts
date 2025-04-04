
import { api } from "./api";

export interface User {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  headline?: string;
  location?: string;
  sports?: string[];
  connections?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  login: (data: LoginData) => {
    return api.post<AuthResponse>("/auth/login", data).then((response) => {
      localStorage.setItem("valwera_token", response.token);
      return response;
    });
  },

  register: (data: RegisterData) => {
    return api.post<AuthResponse>("/auth/register", data).then((response) => {
      localStorage.setItem("valwera_token", response.token);
      return response;
    });
  },

  logout: () => {
    localStorage.removeItem("valwera_token");
  },

  getCurrentUser: () => {
    return api.get<User>("/auth/me");
  },

  updateProfile: (data: Partial<User>) => {
    return api.put<User>("/users/profile", data);
  },
};
