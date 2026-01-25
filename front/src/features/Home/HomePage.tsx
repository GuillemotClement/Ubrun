// import { Apple, Bot } from "lucide-react";
import imageHero from "../../assets/hero.png";
// import HomepageCard from "./HomepageCard";

export default function Homepage() {
	return (
		<div className="">
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage: `url(${imageHero})`,
				}}
			>
				<div className="hero-overlay"></div>
				<div className="hero-content text-neutral-content text-center">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Ubrun</h1>
						<p className="mb-5 text-3xl font-bold">
							Votre partenaire performance
						</p>
					</div>
				</div>
				{/* </div> */}

				{/* card avec les différentes fonctionnalité du site */}
				{/* <div className="container mx-auto flex gap-x-4 my-10">
				<HomepageCard text="blablabla" title="test" link="/tools" />
			</div>

			{/* Section pour afficher les informations d'installation sur smarphone */}
				{/* TODO: mettre en place le toggle apple/android avec les ex^plication */}
				{/* TODO: ajouter les inscructions d'installation */}
				{/* <div className="container border mx-auto my-10">
				<h2>Installer sur mon portable</h2>
				<div className="btn">
					<Apple />
				</div>
				<div className="btn">
					<Bot />
				</div>
				<div className="">
					<p>blabla</p>
				</div>
			</div> */}

				{/* TOOD: plan prix  */}
				{/* <div className="container border mx-auto my-10">
				<h2>Nos plans d'abonnement</h2>
			</div> */}

				{/* TODO: partenaire */}
				{/* <div className="container border mx-auto my-10">
				<h2>Nos partenaire</h2>
			</div> */}
			</div>
		</div>
	);
}
