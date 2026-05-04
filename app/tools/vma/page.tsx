"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  vma: z
    .number()
    .min(1, "Vma invalide")
    .max(40, "Vma invalide")
    .positive("La Vma doit être positive"),
});

type FormValues = z.infer<typeof formSchema>;

export default function VmaPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vma: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto border">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2>VMA</h2>

        <div className="">
          <Controller
            name="vma"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Vma</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  min={1}
                  max={40}
                  aria-invalid={fieldState.invalid}
                  placeholder={"VMA"}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value === "" ? undefined : parseFloat(value),
                    );
                  }}
                  value={field.value ?? ""}
                  step={0.01}
                />
                <FieldDescription>Saisir sa valeur de VMA</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="">
          <Button type="submit">Calculer</Button>
        </div>
      </form>
    </div>
  );
}
