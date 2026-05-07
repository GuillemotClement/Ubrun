import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

type TypeInput = 'email' | 'text' | 'password';

type FormInputTextProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label: string;
  placeholder?: string;
  type?: TypeInput;
  isRequired?: boolean;
};

export default function FormInputText<T extends FieldValues>({
  name,
  form,
  label,
  placeholder = '',
  type = 'text',
  isRequired = true,
}: FormInputTextProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="my-4">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            type={type}
            value={field.value ?? ''}
            required={isRequired}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
