import { User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

// Not sure if I want to implement this after all.

export default function Avatar() {
  const { user } = useAuth();

  if (user?.avatar?.url) {
    return (
      <img
        src={user.avatar.url}
        alt={user.avatar.alt ?? user.name}
        className="h-8 w-8 rounded-full object-cover ring-2 ring-(--color-border)"
      />
    );
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-accent) ring-2 ring-(--color-border)">
      <User size={14} className="text-(--color-text)" />
    </div>
  );
}
