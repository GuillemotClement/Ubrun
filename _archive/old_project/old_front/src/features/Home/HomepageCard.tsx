import { Link } from "@tanstack/react-router";

type HomepageCardProps = {
	text: string;
	link: string;
	title: string;
};

export default function HomepageCard({ title, text, link }: HomepageCardProps) {
	return (
		<div className="card bg-base-100 w-96 shadow-sm">
			<figure className="px-10 pt-10">
				<img
					src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					alt="Shoes"
					className="rounded-xl"
				/>
			</figure>
			<div className="card-body items-center text-center">
				<h2 className="card-title">{title}</h2>
				<p>{text}</p>
				<div className="card-actions">
					<Link to={link} className="btn btn-primary">
						Accéder
					</Link>
				</div>
			</div>
		</div>
	);
}
