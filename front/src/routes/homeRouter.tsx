import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import Homepage from "../features/Home/HomePage.tsx";

export const HomeRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Homepage />,
});