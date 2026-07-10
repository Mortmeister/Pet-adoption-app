import { PawPrint } from "lucide-react";
import { useNavigate } from "react-router";
import { type Pet } from "../../types/pets";

interface PetCardProps {
  pet: Pet;
  badge: { label: string; className: string };
}

export function PetCard({ pet, badge }: PetCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface) shadow-sm transition-all duration-200 hover:scale-101`}
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-(--color-accent)">
        {pet.image?.url ? (
          <img
            src={pet.image.url}
            alt={pet.image.alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <PawPrint size={40} className="text-(--color-text) opacity-60" />
        )}
        <span
          className={`absolute top-2 left-2 rounded px-1.5 py-0.5 text-[10px] font-medium ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="font-heading text-base font-semibold text-(--color-text)">
            {pet.name}
          </p>

          <p className="text-xs text-(--color-text-muted)">
            {pet.breed} · {pet.age} yr{pet.age !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={() => navigate(`/pet/${pet.id}`)}
          className="mt-auto w-full rounded-lg bg-(--color-primary) px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
        >
          View {pet.name}
        </button>
      </div>
    </div>
  );
}
