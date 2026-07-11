import { PawPrint } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { type Pet } from "../../types/pets";

interface ProfilePetCardProps {
  pet: Pet;
  badge: { label: string; className: string };
  onDelete: (petId: string) => void;
}

export function ProfilePetCard({ pet, badge, onDelete }: ProfilePetCardProps) {
  const isAvailable = pet.adoptionStatus.toLowerCase() === "available";
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)">
      <Link
        to={`/pet/${pet.id}`}
        className="relative flex aspect-16/10 items-center justify-center overflow-hidden bg-(--color-accent)"
      >
        {pet.image?.url ? (
          <img
            src={pet.image.url}
            alt={pet.image.alt ?? pet.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <PawPrint size={28} className="text-white opacity-30" />
        )}

        <span
          className={`absolute top-2 left-2 rounded px-1.5 py-0.5 text-[10px] font-medium ${badge.className}`}
        >
          {badge.label}
        </span>
      </Link>

      <div className="px-3 py-2.5">
        <p className="mb-0.5 font-heading text-sm font-semibold text-(--color-text)">
          {pet.name}
        </p>

        <p className="mb-2 text-[11px] text-(--color-text-muted)">
          {pet.breed} · {pet.age} yr{pet.age !== 1 ? "s" : ""}
        </p>

        {isAvailable ? (
          <div className="flex gap-2">
            <Link
              to={`/manage/pets/${pet.id}/edit`}
              className="btn-outline flex-1 px-0 py-1.25 text-center text-xs"
            >
              Edit
            </Link>

            <button
              type="button"
              onClick={() => onDelete(pet.id)}
              className="btn-danger flex-1 px-0 py-1.25 text-xs"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate(`/pet/${pet.id}`)}
            className="mt-auto w-full rounded-lg bg-(--color-primary) px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
          >
            View {pet.name}
          </button>
        )}
      </div>
    </div>
  );
}
