import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchProfile } from "../../services/profile";
import { type Profile } from "../../types/authentication";
import { EditProfileModal } from "../../components/layout/EditProfileModal";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleProfileUpdated = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setShowEditModal(false);
  };

  useEffect(() => {
    if (!user?.accessToken) return;

    const { name, accessToken } = user;

    async function loadProfile() {
      try {
        const response = await fetchProfile(name, accessToken);

        if (!response?.data) {
          setError("Could not load your profile.");
          return;
        }

        setProfile(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user?.accessToken, user?.name]);

  if (loading) {
    return (
      <p className="px-6 py-10 text-center text-sm text-(--color-text-muted)">
        Loading profile...
      </p>
    );
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
      <div className="relative h-50 overflow-hidden bg-(--color-secondary)">
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

          <div className="flex items-start justify-between mt-3">
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
              <Pencil size={13} /> Edit profile
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-275 flex-1 px-6 py-8">
        {profile.bio && (
          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
            <p className="mb-2 text-[11px] font-medium tracking-wider text-(--color-text-muted) uppercase">
              About
            </p>
            <p className="m-0 text-sm leading-normal text-(--color-text)">
              {profile.bio}
            </p>
          </div>
        )}
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
