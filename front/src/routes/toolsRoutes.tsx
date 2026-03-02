import { createRoute } from "@tanstack/react-router";
import ConvertorPage from "../features/Tools/Convertor/ConvertorPage.tsx";
import FcmPage from "../features/Tools/FCM/FcmPage.tsx";
import PredictorPage from "../features/Tools/Predictor/PredictorPage.tsx";
import PurcentPage from "../features/Tools/Purcent/PurcentPage.tsx";
import ToolsPage from "../features/Tools/ToolsPage.tsx";
import VmaPage from "../features/Tools/VMA/VmaPage.tsx";
import { rootRoute } from "./root";
import ToolsDisplay from "../features/Tools/ToolsDisplay.tsx";

// définition du parent de la section. On l'exporte car c'est lui qu'on rattache au routeur principal
export const baseToolsRouter = createRoute({
	getParentRoute: () => rootRoute,
	path: "/tools",
	component: () => <ToolsPage />,
});

const homeToolPage = createRoute({
	getParentRoute: () => baseToolsRouter,
	path: "/",
	component: () => <ToolsDisplay />
})

// // définition des enfants. Leur layout se base sur la parent.
const fcmPage = createRoute({
	getParentRoute: () => baseToolsRouter,
	path: "/fcm",
	component: () => <FcmPage />,
});

const vmaPage = createRoute({
	getParentRoute: () => baseToolsRouter,
	path: "/vma",
	component: () => <VmaPage />,
});

const purcentPage = createRoute({
	getParentRoute: () => baseToolsRouter,
	path: "/purcent",
	component: () => <PurcentPage />,
});

const convertorPage = createRoute({
	getParentRoute: () => baseToolsRouter,
	path: "/convertor",
	component: () => <ConvertorPage />,
});

const predictorToolRoute = createRoute({
	getParentRoute: () => baseToolsRouter,
	path: "/predictor",
	component: () => <PredictorPage />,
});

export const ToolsRouter = baseToolsRouter.addChildren([
	fcmPage,
	vmaPage,
	purcentPage,
	convertorPage,
	predictorToolRoute,
	homeToolPage
]);
