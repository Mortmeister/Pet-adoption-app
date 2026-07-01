import { PawPrint, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerRequest } from "../../services/authentication";
import { useForm } from "react-hook-form";
import { type RegisterFormData } from "../../types/authentication";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData & { confirmPassword: string }>({
    mode: "onBlur",
  });

  const onSubmit = async (
    data: RegisterFormData & { confirmPassword: string },
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { confirmPassword, ...apiData } = data;

      if (!apiData.avatar?.url) delete apiData.avatar;
      if (!apiData.banner?.url) delete apiData.banner;

      await registerRequest(apiData);
      navigate("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-(--color-bg) p-6">
        <div className="w-full max-w-md rounded-xl bg-(--color-surface) p-8 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <PawPrint size={22} className="text-(--color-primary)" />
              <span className="font-heading text-xl font-bold text-(--color-text)">
                Pet adopt
              </span>
            </div>

            <h2 className="mb-2 font-heading text-3xl font-bold text-(--color-text)">
              Create an account
            </h2>

            <p className="text-(--color-text-muted) text-[15px]">
              Register an account to adopt and manage pets
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Username
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                {...register("name", { required: "Username is required" })}
              />
              {errors.name && (
                <p className="form-error-msg">{errors.name.message}</p>
              )}
            </div>

            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="form-error-msg">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="form-error-msg">{errors.password.message}</p>
              )}
            </div>

            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Confirm password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="form-error-msg">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="flex items-center gap-1 text-sm font-medium cursor-pointer"
            >
              {showOptional ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}
              {showOptional ? "Hide" : "Add"} optional profile fields
            </button>

            {showOptional && (
              <>
                <div className="form-group flex flex-col">
                  <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                    Bio
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                    {...register("bio")}
                  />
                </div>

                <div className="form-group flex flex-col">
                  <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                    {...register("avatar.url")}
                  />
                </div>

                <div className="form-group flex flex-col">
                  <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                    Avatar Alt Text
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                    {...register("avatar.alt")}
                  />
                </div>

                <div className="form-group flex flex-col">
                  <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                    Banner URL
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                    {...register("banner.url")}
                  />
                </div>

                <div className="form-group flex flex-col">
                  <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                    Banner Alt Text
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
                    {...register("banner.alt")}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-(--color-primary) px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover) disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-(--color-text-muted)">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-(--color-primary) hover:text-(--color-primary-hover)"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
