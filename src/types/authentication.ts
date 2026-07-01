export interface AuthUser {
  name: string;
  email: string;
  accessToken: string;
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
}

export type Login = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    name: string;
    email: string;
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string };
    accessToken: string;
  };
};
