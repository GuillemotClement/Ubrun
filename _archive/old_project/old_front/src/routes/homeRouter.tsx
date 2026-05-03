import { createRoute } from "@tanstack/react-router";
import Homepage from "../features/Home/HomePage.tsx";
import { rootRoute } from "./root";

export const HomeRouter = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <Homepage />,
});
