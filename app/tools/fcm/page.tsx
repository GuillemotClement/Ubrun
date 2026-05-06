'use client';

import { useState } from 'react';

import { ZoneData, getZoneWithAge, getZoneWithValue } from '@/lib/services/fcm';
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

import FcmZoneRow from './FcmZoneRow';

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

const formValueSchema = z.object({
  fcMax: z
    .number()
    .min(100, 'Une valeur valide est attendu')
    .max(250, 'Une valeur valide est attendu')
    .positive('Une valeur positive est attendu'),
  fcRepos: z
    .number()
    .min(10, 'Une valeur valide est attendu')
    .max(210, 'Une valeur valide est attendu')
    .positive('Une valeur positive est attendu'),
});

// Définition des types du composants
type FormAgeValue = z.infer<typeof formAgeSchema>;
type FormValue = z.infer<typeof formValueSchema>;
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
  const [typeForm, setTypeForm] = useState<TypeForm>('age');
  const [fcZone, setFcZone] = useState<ZoneData[]>([]);
  // const [fcm, setFcm] = useState();

  const ageForm = useForm<FormAgeValue>({
    resolver: zodResolver(formAgeSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
    },
  });

  const valueForm = useForm<FormValue>({
    resolver: zodResolver(formValueSchema),
    defaultValues: {
      fcMax: undefined,
      fcRepos: undefined,
    },
  });

  const onSubmitAge = (data: FormAgeValue) => {
    setFcZone(getZoneWithAge(data));
  };

  const onSubmitValue = (data: FormValue) => {
    setFcZone(getZoneWithValue(data));
  };

  const handleReset = () => {
    ageForm.reset({
      age: undefined,
      gender: undefined,
    });
    setFcZone([]);

    valueForm.reset({
      fcMax: undefined,
      fcRepos: undefined,
    });
  };

  return (
    <>
      <Card className="mb-5">
        <CardHeader className="flex flex-col">
          <div className="w-full">
            <CardTitle className="text-center">Fréquence Cardiaque</CardTitle>
            <CardDescription className="text-center my-2">
              Obtiens tes zones d’entraînement cardiaque à partir de ta fréquence cardiaque maximale
              théorique ou de tes valeurs physiologiques mesurées.
            </CardDescription>
          </div>
          <CardAction className="flex justify-center w-full gap-x-3">
            <Button onClick={() => setTypeForm('age')}>Par âge</Button>
            <Button onClick={() => setTypeForm('value')}>Par valeur</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {typeForm === 'age' ? (
            <Form onSubmit={ageForm.handleSubmit(onSubmitAge)} key="age-form">
              <FormInputNumber
                min={1}
                max={140}
                name="age"
                form={ageForm}
                label="Age :"
                placeholder=""
                isRequired={true}
                step={1}
              />
              <FormInputRadio form={ageForm} name="gender" types={genderType} label="Genre :" />
              <FormAction submitText="Calculer" handleReset={handleReset} />
            </Form>
          ) : (
            <Form onSubmit={valueForm.handleSubmit(onSubmitValue)} key="value-form">
              <FormInputNumber
                min={100}
                max={250}
                name="fcMax"
                form={valueForm}
                label="Fréquence Cardique Maximale :"
                placeholder=""
                isRequired={true}
                step={1}
              />
              <FormInputNumber
                min={10}
                max={210}
                name="fcRepos"
                form={valueForm}
                label="Fréquence Cardiaque au Repos :"
                placeholder=""
                isRequired={true}
                step={1}
              />
              <FormAction submitText="Calculer" handleReset={handleReset} />
            </Form>
          )}
        </CardContent>
      </Card>

      <Card className="flex-2">
        {fcZone.length < 1 ? (
          <>
            <CardTitle className="text-center">Zone de fréquence cardiaque</CardTitle>
            <CardDescription className="text-center">
              Renseignes ton âge où tes valeurs physiologique dans le formulaire pour obtenir tes
              zones cardiaques d'entrainement
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle className="text-center font-bold">Zone de fréquence cardiaque</CardTitle>
            <CardContent>
              {fcZone.map((zone) => {
                return <FcmZoneRow key={zone.title} zone={zone} />;
              })}
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}
