import { useState } from "react";
import VmaForm from "./VmaForm";
import VmaResult from "./VmaResult";

export default function VmaPage() {
	const [vma, setVma] = useState<number>(0);

	return (
		<div className="container mx-auto flex flex-1 flex-col items-center">
			<div className="card flex-1">
				<VmaForm setVma={setVma} />
			</div>

			{vma > 0 && (
				<div className="card flex-1">
					<VmaResult vma={vma} />
				</div>
			)}
		</div>
	);
}
