import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function CreatePetPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      {error && (
        <div className="mb-4">
          <p>{error}</p>
        </div>
      )}

      <form>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col gap-4 md:shrink-0 md:basis-[55%]">
            <div className="flex gap-4">
              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Name <span className="text-(--color-danger)">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Buddy"
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                />
              </div>

              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Breed <span className="text-(--color-danger)">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Labrador"
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                />
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
                  max="30"
                  placeholder="e.g. 2"
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                />
              </div>

              <div className="form-group flex flex-1 flex-col">
                <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                  Size <span className="text-(--color-danger)">*</span>
                </label>
                <select
                  className={`cursor-pointer w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"`}
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
            </div>

            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Colour <span className="text-(--color-danger)">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Red"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
              />
            </div>

            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Description <span className="text-(--color-danger)">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about this pet..."
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
              />
            </div>

            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                {" "}
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-(--color-text-muted)">
                Paste a URL to preview the image on the right
              </p>
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
            <div className="flex min-h-50 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-(--color-border) bg-[#fdfaf5] p-6"></div>
          </div>
        </div>
      </form>
    </div>
  );
}
