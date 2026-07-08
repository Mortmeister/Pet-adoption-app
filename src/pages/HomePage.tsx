import { fetchPets, fetchAllPets } from "../services/pets";
import { useEffect, useState } from "react";
import { type Pet } from "../types/pets";
import { PetCard } from "../components/layout/PetCard";
import { PawPrint, Heart, Search } from "lucide-react";

export default function HomePage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPets() {
      try {
        const response = await fetchPets();
        if (!response) {
          setError("No pets found.");
          return;
        }
        setPets(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadPets();
  }, []);

  useEffect(() => {
    async function loadAllPets() {
      try {
        const response = await fetchAllPets();
        if (!response) {
          setError("No pets found.");
          return;
        }
        setAllPets(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred.",
        );
      }
    }

    loadAllPets();
  }, []);

  function lastListedPet(): Pet | null {
    if (pets.length === 0) return null;
    const sortedPets = [...pets].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return sortedPets[0];
  }

  const lastPet = lastListedPet();
  const lastPetImageUrl = lastPet?.image?.url || "No image available";
  const lastPetName = lastPet?.name || "No name available";

  function getAdoptedPets(): number {
    const adoptedPets = allPets.filter(
      (pet) => pet.adoptionStatus.toLowerCase() === "adopted",
    );
    return adoptedPets.length;
  }

  const speciesSet = new Set(allPets.map((pet) => pet.species.toLowerCase()));

  const speciesCount = speciesSet.size;

  const getAdoptedPetsLength = getAdoptedPets();

  function getAvailablePets(): number {
    const adoptedPets = allPets.filter(
      (pet) => pet.adoptionStatus.toLowerCase() === "available",
    );
    return adoptedPets.length;
  }

  const getAvailablePetsLength = getAvailablePets();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (pets.length === 0) {
    return <p>No pets available for adoption.</p>;
  }

  return (
    <div>
      <section className="mb-4 relative overflow-hidden px-6 py-12">
        <div className="relative z-10 mx-auto flex max-w-275 flex-col items-center gap-12 md:flex-row">
          <div className="flex-1">
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-(--color-primary) px-3 py-1">
              <Heart size={12} className="text-(--color-primary)" />
              <span className="text-xs font-medium text-(--color-primary)">
                Over {getAvailablePetsLength} pets need a home
              </span>
            </div>
            <h1 className="mb-4 line-clamp-3 font-bold leading-tight text-(--color-text)">
              Find your new
              <br />
              best friend
            </h1>
            <p className="mb-7 max-w-md leading-7 text-(--color-text-muted)">
              Every pet here is waiting for someone just like you. Browse our
              listings and give them the home they deserve.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn-primary flex items-center gap-2">
                <PawPrint size={"16px"} />
                Browse pets
              </button>
              <button className="btn-outline transition-colors hover:bg-(--color-primary) hover:text-white">
                Learn more
              </button>
            </div>
          </div>
          <div className="relative w-full max-w-85 shrink-0">
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img
                src={lastPetImageUrl}
                alt="Latest pet"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/10" />

            <div className="absolute -right-3 -top-3 flex items-center gap-2 rounded-full bg-(--color-surface) px-3 py-1.5 shadow-md">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-(--color-primary)">
                <Heart size={10} className="text-white" />
              </div>

              <span className="whitespace-nowrap text-xs font-medium text-(--color-text)">
                {getAdoptedPetsLength} adopted this month
              </span>
            </div>

            <div className="absolute -bottom-4 -right-4 flex items-center gap-3 rounded-xl bg-(--color-surface) px-3.5 py-2.5 shadow-lg">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-accent)">
                <PawPrint size={16} className="text-(--color-text)" />
              </div>

              <div>
                <p className="text-sm font-medium text-(--color-text)">
                  {lastPetName}
                </p>
                <p className="text-xs text-(--color-text-muted)">Just listed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-(--color-border) bg-(--color-surface) px-6 py-8 justify-items-center">
        <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4 max-w-275">
          {[
            { value: `${getAvailablePetsLength}`, label: "Pets available" },
            { value: `${getAdoptedPetsLength}`, label: "Adopted this month" },
            { value: `${speciesCount}`, label: "Species" },
            { value: "100%", label: "Free to browse" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="mb-1 font-bold leading-none text-(--color-primary) font-heading text-3xl">
                {value}
              </p>
              <p className="text-[13px] text-(--color-text-muted)">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-6 pt-8">
        <div className="mx-auto max-w-275">
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
              />
              <input
                type="text"
                placeholder="Search by name or breed..."
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) py-2.5 pl-10 pr-3.5 text-sm text-(--color-text) outline-none transition-colors focus:border-(--color-primary)"
              />
            </div>
            <button className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-(--color-primary) px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)">
              <Search size={14} />
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-275">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="leading-tight font-bold text-(--color-text)">
                Available pets
              </h2>
              <span className="rounded-md bg-(--color-accent) px-2.5 py-1 text-xs font-medium text-(--color-text)">
                {allPets.length}
              </span>
            </div>
            <p className="text-[13px] text-(--color-text-muted)">
              Showing {pets.length} of {allPets.length} pets
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
