import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-background text-foreground py-4">
      <div className="container h-full flex items-center gap-2 justify-center">
        <div className="mt-4">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="mt-4">
          <NavLink to="auth/login">Profile</NavLink>
        </div>
        <div className="mt-4">
          <NavLink to="auth/register">Register</NavLink>
        </div>
      </div>
    </header>
  );
}
