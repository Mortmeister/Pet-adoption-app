import { PawPrint } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type Login } from "../../types/authentication";
import { loginRequest } from "../../services/authentication";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const login = useAuth().login;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ mode: "onBlur" });

  const onSubmit = async (data: Login) => {
    setError(null);
    setLoading(true);

    try {
      const response = await loginRequest(data);
      if (!response) throw new Error("No response from server");
      login(response);
      navigate("/");
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
              Welcome back
            </h2>

            <p className="text-(--color-text-muted) text-[15px]">
              Log in to manage pet listings.
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
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-(--color-primary) px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover) disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-(--color-text-muted)">
            Dont have an account?{" "}
            <Link
              to="/auth/register"
              className="text-(--color-primary) hover:text-(--color-primary-hover)"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
