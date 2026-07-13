import { PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-(--color-text) px-6 py-12 text-(--color-bg)">
      <div className="mx-auto max-w-360">
        <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <PawPrint size={18} className="text-(--color-accent)" />
              <h3 className="font-heading text-xl font-semibold text-(--color-bg)">
                Pet Adopt
              </h3>
            </div>
            <p className="max-w-60 text-sm leading-normal text-(--color-border)">
              Connecting pets with loving families. Find your perfect companion
              today.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="text-sm text-(--color-bg) no-underline transition-colors hover:text-(--color-accent)"
            >
              Browse
            </Link>
            <Link
              to="/auth/login"
              className="text-sm text-(--color-bg) no-underline transition-colors hover:text-(--color-accent)"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="text-sm text-(--color-bg) no-underline transition-colors hover:text-(--color-accent)"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="border-t border-(--color-border) pt-6">
          <p className="text-xs text-(--color-border)">
            © 2025 Pet Adopt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
