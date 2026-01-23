import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import FormTitle from "../../../components/Form/FormTitle";
import { calculatorTools } from "../../../utils/calculatorTools";

const schema = z.object({
	value: z.coerce.number().min(1, "Une valeur est attendu"),
	purcent: z.coerce.number().min(1, "Un pourcentage est attendu"),
});

type PurcentFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
	value: "",
	purcent: "",
};

type PurcentFormProps = {
	setResult: (value: number) => void;
};

export default function PurcentForm({ setResult }: PurcentFormProps) {
	const form = useForm({
		defaultValues,
		validators: {
			onChange: schema,
		},
		onSubmit: ({ value }) => {
			const data: PurcentFormData = schema.parse(value);
			const numericPurcent = data.purcent;
			const numericValue = data.value;
			const resultValue = calculatorTools.getPurcentValue(
				numericValue,
				numericPurcent,
			);
			setResult(resultValue);
		},
	});

	return (
		<form
			className="p-5"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FormTitle title="Calcul de pourcentage" />

			<form.Field name="value">
				{(field) => (
					<FormField
						field={field}
						isRequired={true}
						label="Valeur"
						type="number"
					/>
				)}
			</form.Field>

			<form.Field name="purcent">
				{(field) => (
					<FormField
						field={field}
						isRequired={true}
						label="Pourcentage"
						type="number"
					/>
				)}
			</form.Field>

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
	);
}
