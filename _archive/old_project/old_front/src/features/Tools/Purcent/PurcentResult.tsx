import { Percent } from "lucide-react";

type PurcentResultProps = {
	result: number;
};

export default function PurcentResult({ result }: PurcentResultProps) {
	return (
		<div className="flex justify-center gap-x-15 items-center border border-gray-300 rounded-xl p-5 shadow">
			<div className="flex items-center">
				<Percent size={80} />
			</div>
			<div className="">
				<span>Résultat</span>
				<div className="">
					<span className="text-3xl font-bold me-2">{result}</span>
				</div>
			</div>
		</div>
	);
}
