import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { type CreatePetFormData } from "../../types/pets";
import { fetchPetById } from "../../services/pets";
import { type Pet } from "../../types/pets";
import { updatePet } from "../../services/pets";
import { useAuth } from "../../hooks/useAuth";
import { ErrorModal } from "../../components/modal/ErrorModal";
import { ConfirmModal } from "../../components/modal/ConfirmModal";

export default function EditPetPage() {
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState<CreatePetFormData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<Pet | null>(null);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOpenConfirm = (data: CreatePetFormData) => {
    setPendingData(data);
    setShowConfirmModal(true);
  };

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePetFormData>({
    mode: "onBlur",
    defaultValues: {
      size: "Medium",
    },
  });

  const imageUrl = watch("image.url");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const petId = id;

    async function loadPetDetails() {
      try {
        const petResponse = await fetchPetById(petId);
        const petData = petResponse?.data;
        console.log(petData);
        if (petData) {
          setPet(petData);
          reset({
            name: petData.name,
            breed: petData.breed,
            species: petData.species,
            gender: petData.gender,
            age: Number(petData.age),
            size: petData.size,
            color: petData.color,
            location: petData.location,
            description: petData.description,
            image: {
              url: petData.image?.url ?? "",
              alt: petData.image?.alt ?? "",
            },
          });
        }
      } finally {
        setLoading(false);
      }
    }

    loadPetDetails();
  }, [id, reset]);

  const onSubmit = async (data: CreatePetFormData) => {
    if (!id) return;

    setLoading(true);

    setError(null);

    try {
      await updatePet(
        {
          name: data.name,
          breed: data.breed,
          age: Number(data.age),
          size: data.size,
          color: data.color,
          species: data.species,
          gender: data.gender,
          location: data.location,
          description: data.description,
          image: {
            url: data.image?.url,
            alt: data.image?.alt,
          },
        },
        user?.accessToken,
        id,
      );
      setShowConfirmModal(false);
      navigate(`/pet/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-275 flex-1 px-6 py-6">
      <p className="mb-2 text-xs text-(--color-text-muted)">
        <Link to="/" className="text-(--color-text-muted) no-underline">
          Home
        </Link>
        <span className="mx-1.5">›</span>
        Add Pet
      </p>

      <h2 className="mb-1.5 text-[2rem] leading-tight font-bold text-(--color-text)">
        Add a new pet
      </h2>
      <p className="mb-8 text-[15px] text-(--color-text-muted)">
        Fill in the details below to add a pet to the adoption listings.
      </p>

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}

      <form onSubmit={handleSubmit(handleOpenConfirm)}>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col gap-4 md:shrink-0 md:basis-[55%]">
            <div className="flex gap-4">
              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Name <span className="text-(--color-danger)">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Buddy"
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters longs",
                    },
                    maxLength: {
                      value: 15,
                      message: "Name cannot be more than 15 characters longs",
                    },
                  })}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Breed <span className="text-(--color-danger)">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Labrador"
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                  {...register("breed", {
                    required: "breed is required",
                    minLength: {
                      value: 3,
                      message: "Breed must be at least 3 characters longs",
                    },
                    maxLength: {
                      value: 30,
                      message: "Breed cannot be more than 30 characters longs",
                    },
                  })}
                />
                {errors.breed && <p>{errors.breed.message}</p>}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Species <span className="text-(--color-danger)">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Dog"
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                  {...register("species", {
                    required: "Species is required",
                    minLength: {
                      value: 3,
                      message: "Species must be at least 3 characters longs",
                    },
                    maxLength: {
                      value: 45,
                      message:
                        "Species cannot be more than 45 characters longs",
                    },
                  })}
                />
                {errors.species && <p>{errors.species.message}</p>}
              </div>

              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Gender <span className="text-(--color-danger)">*</span>
                </label>
                <select
                  className={`cursor-pointer w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"`}
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
                {errors.gender && <p>{errors.gender.message}</p>}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Age (years) <span className="text-(--color-danger)">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  placeholder="2"
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 0, message: "Age must be 0 or greater" },
                    max: { value: 50, message: "Age must be 50 or less" },
                  })}
                />
                {errors.age && <p>{errors.age.message}</p>}
              </div>

              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Size <span className="text-(--color-danger)">*</span>
                </label>
                <select
                  className={`cursor-pointer w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"`}
                  {...register("size", { required: "Size is required" })}
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
                {errors.size && <p>{errors.size.message}</p>}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Color <span className="text-(--color-danger)">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Red"
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                  {...register("color", {
                    required: "Color is required",
                    minLength: {
                      value: 3,
                      message: "Color must be at least 3 characters longs",
                    },
                    maxLength: {
                      value: 30,
                      message: "Color cannot be more than 30 characters longs",
                    },
                  })}
                />
                {errors.color && <p>{errors.color.message}</p>}
              </div>

              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Location <span className="text-(--color-danger)">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Oslo"
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                  {...register("location", {
                    required: "Location is required",
                    minLength: {
                      value: 3,
                      message: "Location must be at least 3 characters longs",
                    },
                    maxLength: {
                      value: 30,
                      message:
                        "Location cannot be more than 30 characters longs",
                    },
                  })}
                />
                {errors.location && <p>{errors.location.message}</p>}
              </div>
            </div>

            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Description <span className="text-(--color-danger)">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about this pet..."
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>

            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Image URL <span className="text-(--color-danger)">*</span>
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                {...register("image.url", {
                  required: "Image url is required",
                })}
              />
              {errors.image?.url && <p>{errors.image?.url.message}</p>}
              <p className="mt-1.5 text-xs text-(--color-text-muted)">
                Paste a URL to preview the image on the right
              </p>
            </div>
            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Image alt text
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                {...register("image.alt", {})}
              />
            </div>

            <div className="mt-2 flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary gap-1.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={15} />
                {loading ? "Saving..." : "Save Pet"}
              </button>
              <Link
                to="/"
                className="text-sm text-(--color-text-muted) no-underline"
              >
                Cancel
              </Link>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="flex min-h-50 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-(--color-border) bg-[#fdfaf5] p-6">
              {imageUrl && <img src={imageUrl} alt="" />}
            </div>
          </div>
        </div>
      </form>
      {showConfirmModal && pendingData && (
        <ConfirmModal
          title={`Are you sure you want to edit ${pendingData.name}?`}
          message="Please confirm that all information is correct before submitting."
          confirmText="Yes, post"
          loading={loading}
          onConfirm={() => onSubmit(pendingData)}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}
