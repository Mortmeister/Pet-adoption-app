import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { PawPrint, Share2, Heart } from "lucide-react";
import { PetCard } from "../components/layout/PetCard";
import { fetchAllPets, fetchPetById } from "../services/pets";
import { type Pet } from "../types/pets";

const DESCRIPTION_ROWS = (pet: Pet) => [
  [
    { label: "Breed", value: pet.breed },
    { label: "Age", value: `${pet.age} year${pet.age !== 1 ? "s" : ""}` },
  ],
  [
    { label: "Size", value: pet.size },
    { label: "Color", value: pet.color },
  ],
];

export default function PetDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [relatedPets, setRelatedPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const petId = id;

    async function loadPetDetails() {
      try {
        const [petResponse, allPetsResponse] = await Promise.all([
          fetchPetById(petId),
          fetchAllPets(),
        ]);

        if (petResponse?.data) {
          setPet(petResponse.data);
        }

        if (allPetsResponse?.data) {
          setRelatedPets(
            allPetsResponse.data
              .filter(
                (item) =>
                  item.id !== petId &&
                  item.species === petResponse?.data.species,
              )
              .slice(0, 3),
          );
        }
      } finally {
        setLoading(false);
      }
    }

    loadPetDetails();
  }, [id]);

  if (loading) {
    return (
      <p className="px-6 py-20 text-center text-(--color-text-muted)">
        Loading pet details...
      </p>
    );
  }

  if (!pet) {
    return (
      <div className="px-6 py-20 text-center">
        <h2 className="font-bold text-(--color-text)">Pet not found</h2>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn-primary mt-4"
        >
          Back to browse
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-275 px-6 pt-4">
        <p className="text-xs text-(--color-text-muted)">
          <Link to="/" className="text-(--color-text-muted) no-underline">
            Home
          </Link>
          <span className="mx-1.5">›</span>
          {pet.name}
        </p>
      </div>

      <section className="mx-auto w-full max-w-275 px-6 py-6">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:max-w-[55%] md:shrink-0">
            <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-(--color-accent)">
              {pet.image?.url ? (
                <img
                  src={pet.image.url}
                  alt={pet.image.alt ?? pet.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <PawPrint
                  size={72}
                  className="text-(--color-text) opacity-50"
                />
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h1 className="m-0 leading-tight font-bold text-(--color-text)">
                {pet.name}
              </h1>
              <button
                type="button"
                title="Copy link"
                className="flex shrink-0 items-center rounded-lg border-[1.5px] border-(--color-border) bg-transparent p-2 text-(--color-text-muted) transition-colors hover:bg-(--color-surface)"
              >
                <Share2 size={16} />
              </button>
            </div>

            <div>
              <span className="rounded-md bg-(--color-accent) px-3 py-1 text-xs font-medium text-(--color-text)">
                {pet.adoptionStatus}
              </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-(--color-border)">
              {DESCRIPTION_ROWS(pet).map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex ${rowIndex === 0 ? "border-b border-(--color-border)" : ""}`}
                >
                  {row.map(({ label, value }, columnIndex) => (
                    <div
                      key={label}
                      className={`flex-1 px-4 py-3 ${columnIndex === 1 ? "border-l border-(--color-border)" : ""}`}
                    >
                      <p className="mb-0.5 text-[11px] font-medium tracking-wider text-(--color-text-muted) uppercase">
                        {label}
                      </p>
                      <p className="m-0 text-(--color-text)">{value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div>
              <p className="mb-1.5 text-[13px] font-medium text-(--color-text)">
                About {pet.name}
              </p>
              <p className="m-0 leading-normal text-(--color-text)">
                {pet.description}
              </p>
            </div>

            <button type="button" className="btn-primary btn-lg btn-full gap-2">
              <Heart size={16} />
              Interested in adopting?
            </button>
          </div>
        </div>
      </section>

      {relatedPets.length > 0 && (
        <section className="mx-auto w-full max-w-275 px-6 pt-4 pb-16">
          <h3 className="mb-6 font-semibold text-(--color-text)">
            More pets you might like
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPets.map((relatedPet) => (
              <PetCard key={relatedPet.id} pet={relatedPet} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
