import { createRoute, Outlet } from "@tanstack/react-router";
import { rootRoute } from "./root";
import LoginPage from "../features/Auth/Login/LoginPage";
import RegisterPage from "../features/Auth/RegisterPage";

export const baseAuthPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: () => <Outlet />,
});

const loginPage = createRoute({
  getParentRoute: () => baseAuthPage,
  path: "/login",
  component: () => <LoginPage />,
});

const registerPage = createRoute({
  getParentRoute: () => baseAuthPage,
  path: "/register",
  component: () => <RegisterPage />,
});

export const AuthRouter = baseAuthPage.addChildren([loginPage, registerPage]);
