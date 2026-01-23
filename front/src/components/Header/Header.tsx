import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header className="flex items-center justify-between shadow py-4 px-10">
			<Link to="/" className="">
				<p>UbRun</p>
			</Link>

			<ul>
				<li>
					<Link to="/tools">Outils</Link>
				</li>
			</ul>
		</header>
	);
}
