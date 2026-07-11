import { get, post, put, del } from "./api";

import {
  type PetsResponse,
  type CreatePetPayload,
  type EditAdoptionStatusPayload,
} from "../types/pets";

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
export async function deletePet(id: string, token: string) {
  return del(`/pets/${id}`, token);
}

export async function updatePetAdoptionStatus(
  id: string,
  token: string,
  status: "Available" | "Adopted",
) {
  return updatePet(
    {
      adoptionStatus: status,
    },
    token,
    id,
  );
}
