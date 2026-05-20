import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';

type FormInputTextAreaProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
};

export default function FormInputTextArea<T extends FieldValues>({
  name,
  form,
  label,
  placeholder = '',
  isRequired = true,
}: FormInputTextAreaProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="my-4">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Textarea
            id={field.name}
            placeholder={placeholder}
            required={isRequired}
            value={field.value ?? ''}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
