import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

// <T> : permet de passer un typage générique
// Path => issue de react hook form
// extends FieldValues => doit correspondre au type du formulaire valide
type FormInputNumberProps<T extends FieldValues> = {
  min: number;
  max: number;
  step: number;
  name: Path<T>;
  form: UseFormReturn<T>;
  label: string;
  placeholder: string;
  isRequired: boolean;
};

export default function FormInputNumber<T extends FieldValues>({
  min,
  max,
  step,
  name,
  form,
  label,
  placeholder,
  isRequired,
}: FormInputNumberProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="my-3">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            id={field.name}
            min={min}
            max={max}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value === '' ? undefined : parseFloat(value));
            }}
            value={field.value ?? ''}
            step={step}
            required={isRequired}
            type="number"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
