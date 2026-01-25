import { Link, Outlet } from "@tanstack/react-router";
import {
	CircleGauge,
	GitCompareArrows,
	HeartPulse,
	PanelLeftOpen,
	Percent,
	Timer,
} from "lucide-react";

export default function ToolsPage() {
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				{/* Navbar */}
				<nav className="navbar w-full bg-base-300">
					<label
						htmlFor="my-drawer-4"
						aria-label="open sidebar"
						className="btn btn-square btn-ghost"
					>
						{/* Sidebar toggle icon */}
						<PanelLeftOpen />
					</label>
					<div className="px-4">Outils</div>
				</nav>
				{/* Page content here */}
				<div className="py-10 px-4">
					<Outlet />
				</div>
			</div>

			<div className="drawer-side is-drawer-close:overflow-visible">
				<label
					htmlFor="my-drawer-4"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>

				<div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
					{/* Sidebar content here */}

					<ul className="menu w-full grow">
						{/* Calcul de pourcentage */}
						<li>
							<Link
								to="/tools/purcent"
								className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
								data-tip="Calcul de pourcentage"
							>
								<Percent />
								<span className="is-drawer-close:hidden">
									Calcul de pourcentage
								</span>
							</Link>
						</li>

						{/* FCM */}
						<li>
							<Link
								to="/tools/fcm"
								className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
								data-tip="Fréquence Cardique"
							>
								<HeartPulse />

								<span className="is-drawer-close:hidden">
									Fréquence Cardiaque
								</span>
							</Link>
						</li>

						{/* VMA */}
						<li>
							<Link
								to="/tools/vma"
								className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
								data-tip="Vitesse Maximal Aérobique"
							>
								<CircleGauge />

								<span className="is-drawer-close:hidden">
									Vitesse Maximal Aérobique
								</span>
							</Link>
						</li>

						{/* Convertisseur */}
						<li>
							<Link
								to="/tools/convertor"
								className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
								data-tip="Convertisseur"
							>
								<GitCompareArrows />

								<span className="is-drawer-close:hidden">Convertisseur</span>
							</Link>
						</li>

						{/* Prédicteur */}
						<li>
							<Link
								to="/tools/predictor"
								className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
								data-tip="Prédicteur"
							>
								<Timer />
								<span className="is-drawer-close:hidden">Prédicteur</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
