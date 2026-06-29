import { PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
export default function RegisterPage() {
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
          <form action="" className="space-y-4">
            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text)  transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
              />
            </div>
            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
              />
            </div>
            <div className="form-group flex flex-col">
              <label className="mb-1.5 block text-sm font-medium text-(--color-text)">
                Confirm password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-subtle) transition-colors duration-300 focus:border-(--color-primary) focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-(--color-primary) px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
            >
              Register
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
