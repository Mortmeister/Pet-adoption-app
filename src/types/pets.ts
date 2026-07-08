export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
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
