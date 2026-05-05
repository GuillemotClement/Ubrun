import { useForm } from "@tanstack/react-form";
import { Flag } from "lucide-react";
import { useState } from "react";
import z from "zod";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import FormTitle from "../../../components/Form/FormTitle";

const schema = z.object({
	distance: z.coerce.number().min(0, "Une distance valide est attendu"),
	min: z.coerce
		.number()
		.min(0, "Une minute valide est attendu")
		.max(59, "Une minute valie est attendu"),
	second: z.coerce
		.number()
		.min(0, "Une seconde valide est attendu")
		.max(59, "Une seconde valide est attendu"),
});

type PredictorTimeData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
	distance: "",
	min: "",
	second: "",
};

export default function PredictorPage() {
	const [result, setResut] = useState("");

	const form = useForm({
		defaultValues,
		validators: {
			onChange: schema,
		},
		onSubmit: ({ value }) => {
			const data: PredictorTimeData = schema.parse(value);
			const numericDistance = data.distance;
			const numericMin = data.min;
			const numericSecond = data.second;

			// conversion de l'allure en décimal (min + sec/60)
			const allureDecimal = numericMin + numericSecond / 60;

			// calcul temps total en minute
			const tempsMinute = numericDistance * allureDecimal;

			// conversion en heures et minutes
			const heures = Math.floor(tempsMinute / 60);
			const minutes = Math.floor(tempsMinute % 60);
			const secondes = Math.round((tempsMinute % 1) * 60);

			const formatResult = `${heures}h ${minutes}min ${secondes}s`;

			setResut(formatResult);
		},
	});

	const setDistance = (distance: number) => {
		// permet de set une valeur dans l'input
		form.setFieldValue("distance", distance);
	};

	return (
		<div className="container mx-auto flex flex-1 flex-col items-center">
			<div className="flex gap-x-3">
				<button className="btn" type="button" onClick={() => setDistance(5)}>
					5 km
				</button>
				<button className="btn" type="button" onClick={() => setDistance(10)}>
					10 km
				</button>
				<button
					className="btn"
					type="button"
					onClick={() => setDistance(21.097)}
				>
					Semi
				</button>
				<button
					className="btn"
					type="button"
					onClick={() => setDistance(42.195)}
				>
					Marathon
				</button>
			</div>

			<form
				action=""
				className="p-5"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<FormTitle title="Prédiction de temps" />

				<form.Field name="distance">
					{(field) => (
						<FormField
							field={field}
							isRequired={true}
							label="Distance"
							type="Number"
						/>
					)}
				</form.Field>

				<div className="flex gap-x-3">
					<form.Field name="min">
						{(field) => (
							<FormField
								field={field}
								isRequired={true}
								label="Minute"
								type="Number"
							/>
						)}
					</form.Field>

					<form.Field name="second">
						{(field) => (
							<FormField
								field={field}
								isRequired={true}
								label="Seconde"
								type="Number"
							/>
						)}
					</form.Field>
				</div>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<FormSubscribe
							canSubmit={canSubmit}
							isSubmitting={isSubmitting}
							onReset={() => {
								form.reset();
							}}
						/>
					)}
				</form.Subscribe>
			</form>

			<div className="flex justify-center gap-x-15 items-center border border-gray-300 rounded-xl p-5 shadow">
				<div className="flex items-center">
					<Flag size={80} />
				</div>
				<div className="">
					<span>Temps prévu</span>
					<div className="">
						<span className="text-3xl font-bold mt-3">{result}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
