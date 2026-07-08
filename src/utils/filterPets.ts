import { type Pet } from "../types/pets";

const SPECIES_MAP: Record<string, string> = {
  dogs: "dog",
  cats: "cat",
  hamster: "hamster",
  birds: "bird",
  snake: "snake",
  snail: "snail",
};

function matchesSearch(pet: Pet, query: string): boolean {
  if (!query.trim()) return true;
  const standardQuery = query.toLowerCase().trim();
  return (
    pet.name.toLowerCase().includes(standardQuery) ||
    pet.breed.toLowerCase().includes(standardQuery)
  );
}

function matchesSpecies(pet: Pet, speciesFilter: string): boolean {
  if (speciesFilter === "All") return true;
  const match = SPECIES_MAP[speciesFilter.toLowerCase()];
  if (!match) return true;
  return pet.species.toLowerCase() === match;
}

function matchesSize(pet: Pet, sizeFilter: string): boolean {
  if (!sizeFilter || sizeFilter === "All") return true;
  return pet.size.toLowerCase() === sizeFilter.toLowerCase();
}

export function filterPets(
  pets: Pet[],
  searchQuery: string,
  speciesFilter: string,
  sizeFilter: string,
): Pet[] {
  return pets.filter(
    (pet) =>
      matchesSearch(pet, searchQuery) &&
      matchesSpecies(pet, speciesFilter) &&
      matchesSize(pet, sizeFilter),
  );
}
