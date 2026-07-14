import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchProfile } from "../../services/profile";
import { deletePet, fetchAllPets } from "../../services/pets";
import { type Profile } from "../../types/authentication";
import { type Pet } from "../../types/pets";
import { ProfilePetCard } from "../../components/layout/ProfilePetCard";
import { EditProfileModal } from "../../components/modal/EditProfileModal";
import { useToast } from "../../context/ToastContext";
import { ProfilePageSkeleton } from "../../components/Skeleton/ProfilePageSkeleton";

type ListingFilter = "All" | "Available" | "Adopted";

function filterButtonClass(active: boolean) {
  return [
    "cursor-pointer rounded-full border-[1.5px] px-3.5 py-1.25 text-[13px] font-medium transition-all duration-150",
    active
      ? "border-(--color-primary) bg-(--color-primary) text-white"
      : "border-(--color-border) bg-(--color-surface) text-(--color-text)",
  ].join(" ");
}

function isAvailable(pet: Pet) {
  return pet.adoptionStatus.toLowerCase() === "available";
}

function isAdopted(pet: Pet) {
  return pet.adoptionStatus.toLowerCase() === "adopted";
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listingFilter, setListingFilter] = useState<ListingFilter>("All");
  const [showEditModal, setShowEditModal] = useState(false);
  const { showToast } = useToast();

  const handleProfileUpdated = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    showToast("Profile edited", "success");
    setShowEditModal(false);
  };

  useEffect(() => {
    if (!user?.accessToken) return;

    const { name, email, accessToken } = user;

    async function loadProfile() {
      try {
        const [profileResponse, petsResponse] = await Promise.all([
          fetchProfile(name, accessToken),
          fetchAllPets(),
        ]);

        if (!profileResponse?.data) {
          setError("Could not load your profile.");
          return;
        }

        setProfile(profileResponse.data);

        if (petsResponse?.data) {
          setMyPets(
            petsResponse.data.filter(
              (pet) => pet.owner.email.toLowerCase() === email.toLowerCase(),
            ),
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user?.accessToken, user?.name, user?.email]);

  const availableCount = myPets.filter(isAvailable).length;
  const adoptedOutCount = myPets.filter(isAdopted).length;

  const filteredListings = useMemo(() => {
    if (listingFilter === "Available") {
      return myPets.filter(isAvailable);
    }

    if (listingFilter === "Adopted") {
      return myPets.filter(isAdopted);
    }

    return myPets;
  }, [myPets, listingFilter]);

  const handleDeletePet = async (petId: string) => {
    if (!user?.accessToken) return;
    if (!window.confirm("Are you sure you want to delete this pet?")) return;

    try {
      await deletePet(petId, user.accessToken);
      setMyPets((current) => current.filter((pet) => pet.id !== petId));
      showToast("Pet deleted", "error");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (loading) {
    return <ProfilePageSkeleton />;
  }

  if (error || !profile) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="max-w-md text-center">
          <h2 className="mb-2 text-xl font-bold text-(--color-text)">
            Unable to load profile
          </h2>
          <p className="m-0 text-sm text-(--color-text-muted)">
            {error ?? "Something went wrong while fetching your profile."}
          </p>
        </div>
      </div>
    );
  }

  const avatarUrl = profile.avatar?.url;
  const bannerUrl = profile.banner?.url;
  const initials = profile.name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative h-100 overflow-hidden bg-(--color-secondary)">
        {bannerUrl && (
          <img src={bannerUrl} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="border-b border-(--color-border) bg-(--color-surface)">
        <div className="mx-auto max-w-275 px-6 pb-6">
          <div className="relative -mt-9 inline-block">
            <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-[3px] border-(--color-surface) bg-(--color-accent)">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={profile.avatar?.alt ?? `${profile.name} avatar`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-heading text-[28px] font-bold text-(--color-text)">
                  {initials}
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-start justify-between flex-wrap gap-3 sm:gap-0">
            <div>
              <h1 className="mb-0.5 text-2xl font-bold text-(--color-text)">
                {profile.name}
              </h1>
              <p className="m-0 text-[13px] text-(--color-text-muted)">
                {profile.email}
              </p>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="btn btn-outline"
            >
              <Pencil size={13} />
              Edit profile
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-275 flex-1 px-6 py-8">
        {profile.bio && (
          <div className="mb-8 rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
            <p className="mb-2 text-[11px] font-medium tracking-wider text-(--color-text-muted) uppercase">
              About
            </p>
            <p className="m-0 text-sm leading-normal text-(--color-text)">
              {profile.bio}
            </p>
          </div>
        )}

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { label: `All (${myPets.length})`, value: "All" as const },
                {
                  label: `Available (${availableCount})`,
                  value: "Available" as const,
                },
                {
                  label: `Adopted (${adoptedOutCount})`,
                  value: "Adopted" as const,
                },
              ] as const
            ).map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => setListingFilter(value)}
                className={filterButtonClass(listingFilter === value)}
              >
                {label}
              </button>
            ))}
          </div>
          <Link to="/manage/pets/create">
            <button
              type="button"
              className="btn-primary gap-1.5 px-3.5 py-1.5 text-[13px]"
            >
              <Plus size={14} />
              Add pet
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((pet) => (
            <ProfilePetCard
              key={pet.id}
              pet={pet}
              badge={{
                label: isAvailable(pet) ? "Available" : "Adopted",
                className: isAvailable(pet)
                  ? "bg-(--color-success) text-white"
                  : "bg-(--color-text-muted) text-white",
              }}
              onDelete={handleDeletePet}
            />
          ))}
        </div>
      </div>
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onUpdated={handleProfileUpdated}
        />
      )}
    </div>
  );
}
