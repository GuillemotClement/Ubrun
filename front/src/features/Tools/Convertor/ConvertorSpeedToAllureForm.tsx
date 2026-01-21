import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import FormTitle from "../../../components/Form/FormTitle";
import { convertorTool } from "../../../utils/convertorTool";

const schema = z.object({
  speed: z.coerce.number().min(1, "Une vitesse est attendu"),
});

type ConvertorFormData = z.infer<typeof schema>;

const defaultValues: z.infer<typeof schema> = {
  speed: "",
};

type ConvertorSpeedToAllureFormProps = {
  setResult: (value: string) => void;
};

export default function ConvertorSpeedToAllureForm({
                                                     setResult,
                                                   }: ConvertorSpeedToAllureFormProps) {
  const form = useForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      const data: ConvertorFormData = schema.parse(value);
      const resultObj = convertorTool.convertSpeedToAllure(data.speed);
      const result = `${resultObj.minutes}'${resultObj.secondes}`;
      setResult(result);
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
      <FormTitle title="Convertisseur vitesse en allure" />

      <form.Field name="speed">
        {(field) => (
          <FormField
            field={field}
            isRequired={true}
            label="Vitesse en km/h"
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