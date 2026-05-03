import { createRootRoute } from "@tanstack/react-router";
import App from "../App.tsx";

export const rootRoute = createRootRoute({
	component: () => <App />,
});
