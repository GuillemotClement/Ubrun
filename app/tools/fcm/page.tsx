'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Form from '@/components/Form/Form';
import FormAction from '@/components/Form/FormAction';
import FormInputNumber from '@/components/Form/FormInputNumber';
import FormInputRadio from '@/components/Form/FormInputRadio';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Définition des schéma de validation des formulaire
const formAgeSchema = z.object({
  age: z
    .number()
    .min(1, 'Une âge valide est attendu')
    .max(120, 'Un âge valide est attendu')
    .positive('Un âge valide est attendu'),
  gender: z.enum(['man', 'woman'], {
    error: 'Sélectionner un genre',
  }),
});

// Définition des types du composants
type FormAgeValue = z.infer<typeof formAgeSchema>;
type TypeForm = 'age' | 'value';

// option pour les checkboxs
const genderType = [
  {
    id: 'man',
    title: 'Homme',
  },
  {
    id: 'woman',
    title: 'Femme',
  },
];

export default function FcmPage() {
  const ageForm = useForm<FormAgeValue>({
    resolver: zodResolver(formAgeSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
    },
  });

  const onSubmitAge = (data: FormAgeValue) => {
    console.log(data);
    // TODO: aller chercher les données
  };

  const handleReset = () => {
    ageForm.reset({
      age: undefined,
      gender: undefined,
    });
  };

  return (
    <div className="">
      <Card className="">
        <CardHeader className="flex flex-col">
          <div className="">
            <CardTitle className="text-center">Fréquence Cardiaque</CardTitle>
            <CardDescription className="text-justify my-2">
              Obtiens tes zones d’entraînement cardiaque à partir de ta fréquence cardiaque maximale
              théorique ou de tes valeurs physiologiques mesurées.
            </CardDescription>
          </div>
          <CardAction className="flex justify-center w-full gap-x-3">
            <Button>Par âge</Button>
            <Button>Par valeur</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form onSubmit={ageForm.handleSubmit(onSubmitAge)} title="">
            <FormInputNumber
              min={1}
              max={140}
              name="age"
              form={ageForm}
              label="Age :"
              placeholder=""
              isRequired={true}
              step={0}
            />
            <FormInputRadio form={ageForm} name="gender" types={genderType} label="Genre :" />
            <FormAction submitText="Calculer" handleReset={handleReset} />
          </Form>
        </CardContent>
      </Card>

      <Card className="flex-2"></Card>
    </div>
  );
}
