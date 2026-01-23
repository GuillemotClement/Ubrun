import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import FormTitle from "../../../components/Form/FormTitle";

// import { fcmTools } from "../../../utils/fcmTools";

const schema = z.object({
	fcMax: z.coerce
		.number()
		.min(1, "Une fréquence cardiaque maximal valide est attendus")
		.max(250, "Une fréquence cardiaque valide est attendus"),
	fcRepo: z.coerce.number().optional(),
});

type FcmFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
	fcMax: "",
	fcRepo: "",
};

type FcmFormProps = {
	setFcMax: (age: number) => void;
	setFcRepo: (fcRepo: number) => void;
};

export default function FcmForm({ setFcMax, setFcRepo }: FcmFormProps) {
	const form = useForm({
		defaultValues,
		validators: {
			onChange: schema,
		},
		onSubmit: ({ value }) => {
			const data: FcmFormData = schema.parse(value);
			const fcRepo = data.fcRepo ?? 0;
			const fcMax = data.fcMax;
			setFcMax(fcMax);
			setFcRepo(fcRepo);
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
			<FormTitle title="Fréquence cardique maximal" />

			<form.Field name="fcMax">
				{(field) => (
					<FormField
						field={field}
						isRequired={true}
						label="Fréquence cardique maximal"
						type="number"
					/>
				)}
			</form.Field>

			<form.Field name="fcRepo">
				{(field) => (
					<FormField
						field={field}
						isRequired={false}
						label="Fréquence cardique au repos"
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
							setFcMax(0);
						}}
					/>
				)}
			</form.Subscribe>
		</form>
	);
}
