import { fetchPets } from "../services/pets";
import { useEffect, useState } from "react";
import { type Pet } from "../types/pets";
import { PetCard } from "../components/layout/PetCard";

export default function HomePage() {
  const [pets, setPets] = useState<Pet[]>([]);
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {pets.map((venue) => (
        <PetCard key={venue.id} pet={venue} />
      ))}
    </div>
  );
}
