import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  PawPrint,
  Menu,
  X,
  Home,
  Plus,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="flex items-center gap-4 navbar-logo">
          <PawPrint
            size={20}
            className="text-(--color-primary)"
            aria-hidden="true"
          />
          Pet Adoption
        </Link>

        <nav
          className="hidden items-center gap-5 md:flex"
          aria-label="Main navigation"
        >
          <NavLink to="/" className="navbar-link flex items-center gap-1.5">
            <Home size={16} aria-hidden="true" />
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                to="/manage/pets/create"
                className="navbar-link flex items-center gap-1.5"
              >
                <Plus size={16} aria-hidden="true" />
                Add Pet
              </NavLink>
              <NavLink
                to="/profile"
                className="navbar-link flex items-center gap-1.5"
              >
                <User size={16} aria-hidden="true" />
                Profile
              </NavLink>
              <button
                type="button"
                className="btn-outline gap-1.5"
                onClick={handleLogout}
              >
                <LogOut size={16} aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/auth/login">
                <button type="button" className="btn-outline gap-1.5">
                  <LogIn size={16} aria-hidden="true" />
                  Login
                </button>
              </NavLink>
              <NavLink to="/auth/register">
                <button type="button" className="btn-primary gap-1.5">
                  <UserPlus size={16} aria-hidden="true" />
                  Register
                </button>
              </NavLink>
            </>
          )}
        </nav>

        {!isMenuOpen && (
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-(--color-text) transition-colors hover:bg-(--color-bg) md:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        )}
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-(--color-text)/25 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <nav
        id="mobile-nav"
        className={`fixed top-0 right-0 z-50 flex h-screen w-80 flex-col gap-1 border-l border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PawPrint
              size={20}
              className="text-(--color-primary)"
              aria-hidden="true"
            />
            <span className="font-heading text-2xl font-bold text-(--color-text)">
              Pet Adoption
            </span>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-(--color-text) transition-colors hover:bg-(--color-bg)"
            aria-label="Close menu"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="my-2 w-full border-t border-(--color-border)" />

        <NavLink
          to="/"
          onClick={closeMenu}
          className="navbar-link flex items-center gap-3 rounded-lg px-3 py-2.5"
        >
          <Home size={16} aria-hidden="true" />
          Home
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink
              to="/manage/pets/create"
              onClick={closeMenu}
              className="navbar-link flex items-center gap-3 rounded-lg px-3 py-2.5"
            >
              <Plus size={16} aria-hidden="true" />
              Add Pet
            </NavLink>
            <NavLink
              to="/profile"
              onClick={closeMenu}
              className="navbar-link flex items-center gap-3 rounded-lg px-3 py-2.5"
            >
              <User size={16} aria-hidden="true" />
              Profile
            </NavLink>
            <div className="my-2 w-full border-t border-(--color-border)" />
            <button
              type="button"
              className="btn-outline btn-full gap-1.5"
              onClick={handleLogout}
            >
              <LogOut size={16} aria-hidden="true" />
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              onClick={closeMenu}
              className="mt-4 w-full"
            >
              <button type="button" className="btn-outline btn-full gap-1.5">
                <LogIn size={16} aria-hidden="true" />
                Login
              </button>
            </NavLink>
            <NavLink to="/auth/register" onClick={closeMenu} className="w-full">
              <button type="button" className="btn-primary btn-full gap-1.5">
                <UserPlus size={16} aria-hidden="true" />
                Register
              </button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
