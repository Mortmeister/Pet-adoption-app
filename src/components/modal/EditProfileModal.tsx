import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { X } from "lucide-react";
import {
  type Profile,
  type EditProfileFormData,
} from "../../types/authentication";
import { updateProfile } from "../../services/profile";
import { useAuth } from "../../hooks/useAuth";

interface EditProfileModalProps {
  profile: Profile;
  onClose: () => void;
  onUpdated: (profile: Profile) => void;
}

export function EditProfileModal({
  profile,
  onClose,
  onUpdated,
}: EditProfileModalProps) {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    defaultValues: {
      bio: profile.bio ?? "",
      avatarUrl: profile.avatar?.url ?? "",
      bannerUrl: profile.banner?.url ?? "",
    },
  });

  useEffect(() => {
    reset({
      bio: profile.bio ?? "",
      avatarUrl: profile.avatar?.url ?? "",
      bannerUrl: profile.banner?.url ?? "",
    });
  }, [profile, reset]);

  const onSubmit = async (data: EditProfileFormData) => {
    if (!user?.accessToken) return;

    const payload = {
      bio: data.bio,
      ...(data.avatarUrl && {
        avatar: {
          url: data.avatarUrl,
        },
      }),
      ...(data.bannerUrl && {
        banner: {
          url: data.bannerUrl,
        },
      }),
    };

    try {
      const response = await updateProfile(
        profile.name,
        payload,
        user.accessToken,
      );

      if (response.data) {
        onUpdated(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-(--color-text)">
            Edit profile
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-(--color-accent)"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
              Bio
            </label>

            <textarea
              rows={3}
              {...register("bio")}
              className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm focus:border-(--color-primary) focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
              Avatar URL
            </label>

            <input
              {...register("avatarUrl")}
              className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm focus:border-(--color-primary) focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
              Banner URL
            </label>

            <input
              {...register("bannerUrl")}
              className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm focus:border-(--color-primary) focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">
              Save changes
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn-outline flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
