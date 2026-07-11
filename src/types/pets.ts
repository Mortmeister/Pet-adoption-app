export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  color: string;
  description: string;
  adoptionStatus: string;
  location: string;
  image?: { url: string; alt?: string };
  created: string;
  updated: string;
  owner: {
    name: string;
    email: string;
    bio?: string;
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string };
  };
};

export type PetsResponse = {
  data: Pet[];
};

export type CreatePetFormData = {
  name: string;
  breed: string;
  species: string;
  gender: string;
  location: string;
  age: number;
  size: string;
  color: string;
  description: string;
  image?: { url: string; alt?: string };
};

export type CreatePetPayload = {
  name?: string;
  breed?: string;
  age?: number;
  size?: string;
  color?: string;
  description?: string;
  species?: string;
  gender?: string;
  location?: string;
  adoptionStatus?: string;
  image?: { url: string; alt?: string };
};
