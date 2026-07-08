import { NavLink, useNavigate } from "react-router-dom";
import { PawPrint, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="flex items-center gap-4 navbar-logo">
          <PawPrint
            size={20}
            className="text-(--color-primary) "
            aria-hidden="true"
          />
          Pet Adoption
        </NavLink>
        <nav
          className="hidden md:flex items-center gap-5 text-sm"
          aria-label="Main navigation"
        >
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
          {isLoggedIn ? (
            <>
              <div>
                <NavLink to="/manage/pets/create">Add Pet</NavLink>
              </div>
              <div>
                <NavLink to="/">Profile</NavLink>
              </div>
              <button className="btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="auth/login">
                <button className="btn-outline"> Login</button>
              </NavLink>
              <NavLink to="auth/register">
                <button className="btn-primary">Register</button>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      <div className="absolute top-4 right-4 md:hidden">
        <Menu onClick={() => setIsMenuOpen((prev) => !prev)} />
      </div>
      {isMenuOpen && (
        <nav
          id="hamburgerMenu"
          className="md:hidden border-t flex flex-col items-center px-6 py-4 gap-4"
          aria-label="Mobile navigation"
        >
          {isLoggedIn && (
            <>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Browse
              </NavLink>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                Add Pet
              </NavLink>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                Profile
              </NavLink>
              <button className="btn-outline btn-full" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Browse
              </NavLink>
              <NavLink to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <button className="btn btn-outline btn-full">Login</button>
              </NavLink>
              <NavLink to="/auth/register" onClick={() => setIsMenuOpen(false)}>
                <button className="btn btn-primary btn-full">Register</button>
              </NavLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
