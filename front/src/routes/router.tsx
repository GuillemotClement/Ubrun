import { createRouter } from "@tanstack/react-router";
import { HomeRouter } from "./homeRouter.tsx";
import { rootRoute } from "./root";
import { ToolsRouter } from "./toolsRoutes.tsx";
import { AuthRouter } from "./authRouter.tsx";

const routeTree = rootRoute.addChildren([HomeRouter, ToolsRouter, AuthRouter]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});
