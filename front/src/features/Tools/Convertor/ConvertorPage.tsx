import { useState } from "react";
import AllureResult from "./AllureResult";
import ConvertorAllureToSpeedForm from "./ConvertorAllureToSpeedForm";
import ConvertorSpeedToAllureForm from "./ConvertorSpeedToAllureForm";

export default function ConvertorPage() {
	const [result, setResult] = useState("");
	const [isSpeed, setIsSpeed] = useState(false);
	const [isAllure, setIsAllure] = useState(false);

	const handleSpeed = () => {
		setIsSpeed(!isSpeed);
		setIsAllure(!isAllure);
		setResult("");
	};

	return (
		<div className="container mx-auto flex flex-col items-center">
			<div className="">
				<button type="button" onClick={handleSpeed} className="btn btn-neutral">
					Allure
				</button>
			</div>

			{isSpeed ? (
				<div className="card flex-1">
					<ConvertorSpeedToAllureForm setResult={setResult} />
				</div>
			) : (
				<div className="card flex-1">
					<ConvertorAllureToSpeedForm setResult={setResult} />
				</div>
			)}

			{result !== "" && (
				<div className="">
					<AllureResult allure={result} isAllure={isAllure} />
				</div>
			)}
		</div>
	);
}
