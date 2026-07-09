import { get, post, put } from "./api";

import { type PetsResponse, type CreatePetPayload } from "../types/pets";

export async function fetchPets(page = 1, limit = 12) {
  return get<PetsResponse>(
    `/pets?page=${page}&limit=${limit}&sort=created&sortOrder=desc`,
    null,
  );
}
export async function fetchAllPets() {
  return get<PetsResponse>(`/pets`, null);
}

export async function fetchPetById(id: string) {
  return get<PetsResponse>(`/pets/${id}`, null);
}

export async function createPet(data: CreatePetPayload, token: string) {
  return post<PetsResponse>(`/pets`, data, token);
}
export async function updatePet(
  data: CreatePetPayload,
  token: string,
  id: string,
) {
  return put<PetsResponse>(`/pets/${id}`, data, token);
}
