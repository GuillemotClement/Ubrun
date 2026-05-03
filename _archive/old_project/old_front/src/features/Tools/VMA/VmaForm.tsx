import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import FormTitle from "../../../components/Form/FormTitle";

const schema = z.object({
	vma: z.coerce.number().min(1, "Une valeur de VMA valide est attendu"),
});

type VmaFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
	vma: "",
};

type VmaFormProps = {
	setVma: (vma: number) => void;
};

export default function VmaForm({ setVma }: VmaFormProps) {
	const form = useForm({
		defaultValues,
		validators: {
			onChange: schema,
		},
		onSubmit: ({ value }) => {
			const data: VmaFormData = schema.parse(value);
			setVma(data.vma);
		},
	});

	return (
		<div>
			<form
				className="p-5"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<FormTitle title="VMA" />

				<form.Field name="vma">
					{(field) => (
						<FormField
							field={field}
							isRequired={true}
							label="VMA"
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
								setVma(0);
							}}
						/>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}
