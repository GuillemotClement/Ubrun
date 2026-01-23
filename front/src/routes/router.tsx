import { createRouter } from "@tanstack/react-router";
import { HomeRouter } from "./homeRouter.tsx";
import { rootRoute } from "./root";
import { ToolsRouter } from "./toolsRoutes.tsx";

const routeTree = rootRoute.addChildren([HomeRouter, ToolsRouter]);

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
});
