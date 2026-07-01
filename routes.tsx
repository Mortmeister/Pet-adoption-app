import { createBrowserRouter } from "react-router-dom";
import AppShell from "./src/components/appShell/AppShellLayout";
import { AuthGuard } from "./src/components/AuthGuard";
import HomePage from "./src/pages/HomePage";
import LoginPage from "./src/pages/authentication/LoginPage";
import RegisterPage from "./src/pages/authentication/RegisterPage";
import ProfilePage from "./src/pages/profile/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/register", element: <RegisterPage /> },

      {
        element: <AuthGuard />,

        children: [{ path: "profile", element: <ProfilePage /> }],
      },
    ],
  },
]);
