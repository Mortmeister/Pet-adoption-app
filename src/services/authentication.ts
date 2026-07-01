import { post } from "./api";
import { type RegisterFormData } from "../types/authentication";

export function registerRequest(input: RegisterFormData) {
  post<RegisterFormData>("/auth/register", input, null);
}
