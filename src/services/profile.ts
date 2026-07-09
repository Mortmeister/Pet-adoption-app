import { get, put } from "./api";
import {
  type ProfileResponse,
  type UpdateProfilePayload,
} from "../types/authentication";

export async function fetchProfile(name: string, token: string) {
  return get<ProfileResponse>(`/auction/profiles/${name}`, token);
}
export async function updateProfile(
  name: string,
  data: UpdateProfilePayload,
  token: string,
) {
  return put<ProfileResponse>(`/auction/profiles/${name}`, data, token);
}
