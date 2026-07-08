import { get } from "./api";

import { type PetsResponse } from "../types/pets";

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
