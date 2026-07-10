import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { PawPrint, Share2, Heart, Check, Pencil, Trash2 } from "lucide-react";
import { PetCard } from "../components/layout/PetCard";
import { fetchAllPets, fetchPetById, deletePet } from "../services/pets";
import { type Pet } from "../types/pets";
import { useAuth } from "../hooks/useAuth";
import { ConfirmModal } from "../components/modal/ConfirmModal";

const DESCRIPTION_ROWS = (pet: Pet) => [
  [
    { label: "Species", value: pet.species },
    { label: "Breed", value: pet.breed },
  ],
  [
    { label: "Size", value: pet.size },
    { label: "Color", value: pet.color },
  ],
  [
    { label: "Gender", value: pet.gender },
    { label: "Age", value: `${pet.age} year${pet.age !== 1 ? "s" : ""}` },
  ],
  [{ label: "Location", value: pet.location }],
];

export default function PetDetailsPage() {
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [relatedPets, setRelatedPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);

      await deletePet(pet.id, user.accessToken);

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete pet");
    } finally {
      setDeleting(false);
    }
  }

  const isOwner = pet?.owner.name === user?.name;

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
                  item.species.toLowerCase() ===
                    petResponse?.data.species.toLowerCase(),
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

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="flex md:w-[55%]">
            <div className="relative w-full overflow-hidden rounded-xl bg-(--color-accent)">
              {pet.image?.url ? (
                <img
                  src={pet.image.url}
                  alt={pet.image.alt ?? pet.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex min-h-100 items-center justify-center">
                  <PawPrint
                    size={72}
                    className="text-(--color-text) opacity-50"
                  />
                </div>
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
                onClick={handleCopy}
                title="Copy link"
                className="flex shrink-0 items-center rounded-lg border-[1.5px] border-(--color-border) bg-transparent p-2 text-(--color-text-muted) transition-colors hover:bg-(--color-surface)"
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
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
                  className={`flex ${rowIndex !== 3 ? "border-b border-(--color-border)" : "text-center"}`}
                >
                  {row.map(({ label, value }, columnIndex) => (
                    <div
                      key={label}
                      className={`flex-1 px-4 py-3 ${columnIndex === 1 ? "border-l border-(--color-border)" : ""}`}
                    >
                      <p className="mb-0.5 text-[11px] font-medium tracking-wider text-(--color-text-muted) uppercase">
                        {label}
                      </p>
                      <p className="m-0 text-(--color-text) capitalize">
                        {value}
                      </p>
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

            {isOwner && isLoggedIn && (
              <>
                <button
                  type="button"
                  className="btn-primary btn-lg btn-full gap-2"
                >
                  <Heart size={16} />
                  Mark {pet.name} as adopted
                </button>
                <div>
                  <div className="flex gap-3">
                    <Link to={`/manage/pets/${pet.id}/edit`} className="flex-1">
                      <button
                        type="button"
                        className="btn-outline btn-full gap-1.5"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(true)}
                      className="btn-danger btn-full flex-1 gap-1.5"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
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

      {showDeleteModal && (
        <ConfirmModal
          title={`Are you sure you want to delete ${pet.name}?`}
          message="This action cannot be undone."
          confirmText="Yes, delete"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
