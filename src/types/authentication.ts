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
