import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '../ui/field';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type RadioOption = {
  id: string;
  title: string;
};

type FormInputRadioProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  types: RadioOption[];
  label: string;
};

export default function FormInputRadio<T extends FieldValues>({
  form,
  name,
  types,
  label,
}: FormInputRadioProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <FieldSet className="my-3">
          <FieldLegend className="text-[14px]!">{label}</FieldLegend>
          <RadioGroup name={field.name} value={field.value ?? ''} onValueChange={field.onChange}>
            {types.map((type) => (
              <FieldLabel
                key={type.id}
                htmlFor={`${name}-${type.id}`}
                className="border-muted hover:border-primary/50 has-checked:border-primary has-checked:bg-primary/5 cursor-pointer rounded-lg border-2 transition-all hover:shadow-sm"
              >
                <Field orientation="horizontal" data-invalid={fieldState.invalid} className="gap-4">
                  <FieldContent className="flex-1">
                    <FieldTitle className="font-medium">{type.title}</FieldTitle>
                  </FieldContent>

                  <RadioGroupItem
                    value={type.id}
                    id={`${name}-${type.id}`}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </FieldSet>
      )}
    />
  );
}
