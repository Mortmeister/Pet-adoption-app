import {
  type RegisterFormData,
  type Login,
  type AuthUser,
} from "../types/authentication";
import { post } from "./api";

export async function loginRequest(input: Login): Promise<AuthUser | null> {
  const response = await post<{ data: AuthUser }>("/auth/login", input, null);
  return response?.data ?? null;
}

export function registerRequest(input: RegisterFormData) {
  post<RegisterFormData>("/auth/register", input, null);
}
