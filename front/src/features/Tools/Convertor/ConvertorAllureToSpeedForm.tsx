import { z } from "zod";
import { convertorTool } from "../../../utils/convertorTool";
import { useForm } from "@tanstack/react-form";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import FormField from "../../../components/Form/FormField/FormField";
import FormTitle from "../../../components/Form/FormTitle";

const schema = z.object({
  minute: z.coerce
    .number()
    .min(0, "Une minute est attendu")
    .max(59, "Une minute valide est attendu"),
  seconde: z.coerce
    .number()
    .min(0, "Une seconde est valide est attendu")
    .max(59, "Une seconde valide est attendu"),
});

type ConvertFormData = z.infer<typeof schema>;

const defaultValues: z.infer<typeof schema> = {
  minute: "",
  seconde: "",
};

type ConvertorAllureToSpeedFormProps = {
  setResult: (value: string) => void;
};

export default function ConvertorAllureToSpeedForm({
                                                     setResult,
                                                   }: ConvertorAllureToSpeedFormProps) {
  const form = useForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      const data: ConvertFormData = schema.parse(value);
      const numericMinute = data.minute;
      const numericSeconde = data.seconde;

      const result = convertorTool.convertAllureToSpeed(
        numericMinute,
        numericSeconde,
      );

      setResult(String(result));
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
      <FormTitle title="Convertisseur allure en vitesse" />

      <div className="flex gap-x-5">
        <form.Field name="minute">
          {(field) => (
            <FormField
              field={field}
              isRequired={true}
              label="Minute"
              type="number"
            />
          )}
        </form.Field>

        <form.Field name="seconde">
          {(field) => (
            <FormField
              field={field}
              isRequired={true}
              label="Seconde"
              type="number"
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
  );
}