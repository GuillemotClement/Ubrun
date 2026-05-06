'use client';

import { useState } from 'react';

import { convertAllureToSpeed, convertSpeedToAllure } from '@/lib/services/calculator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Form from '@/components/Form/Form';
import FormAction from '@/components/Form/FormAction';
import FormInputNumber from '@/components/Form/FormInputNumber';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const formVitesseSchema = z.object({
  speed: z
    .float32()
    .min(0.01, 'Une vitesse valide est attendu')
    .max(100, 'Une vitesse valide est attendu')
    .positive(),
});

const formAllureSchema = z.object({
  minute: z
    .number()
    .min(0, 'Une minute valide est attendu')
    .max(60, 'Une minute valide est attendu')
    .positive('Une minute valide est attendu'),
  second: z
    .number()
    .min(0, 'Une seconde valide est attendu')
    .max(60, 'Une seconde valide est attendu')
    .positive('Une seconde valide est attendu'),
});

type FormVitesseValue = z.infer<typeof formVitesseSchema>;
type FormAllureValue = z.infer<typeof formAllureSchema>;

type TypeForm = 'speed' | 'allure';

export default function ConvertissorPage() {
  const [typeForm, setTypeForm] = useState<TypeForm>('speed');
  const [result, setResult] = useState('');

  const selectForm = (type: TypeForm) => {
    setTypeForm(type);
    handleReset();
  };

  const speedForm = useForm<FormVitesseValue>({
    resolver: zodResolver(formVitesseSchema),
    defaultValues: {
      speed: undefined,
    },
  });

  const allureForm = useForm<FormAllureValue>({
    resolver: zodResolver(formAllureSchema),
    defaultValues: {
      minute: undefined,
      second: undefined,
    },
  });

  const onSubmitSpeed = (data: FormVitesseValue) => {
    const allure = convertSpeedToAllure(data.speed);
    setResult(`${allure} min/km`);
  };

  const onSubmitAllure = (data: FormAllureValue) => {
    const speed = convertAllureToSpeed(data.minute, data.second);
    setResult(`${speed}km/h`);
  };

  const handleReset = () => {
    speedForm.reset({
      speed: undefined,
    });

    allureForm.reset({
      minute: undefined,
      second: undefined,
    });

    setResult('');
  };

  console.log(result);
  return (
    <>
      <Card className="mb-5">
        <CardHeader className="flex flex-col">
          <div className="w-full">
            <CardTitle className="text-center">Convertisseur</CardTitle>
            <CardDescription className="text-center my-2">
              Convertion d&apos;une allure en min/km en vitesse km/h et inversement
            </CardDescription>
          </div>
          <CardAction className="flex justify-center w-full gap-x-3 my-2">
            <Button onClick={() => selectForm('speed')}>Vitesse</Button>
            <Button onClick={() => selectForm('allure')}>Allure</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {typeForm === 'speed' ? (
            <Form onSubmit={speedForm.handleSubmit(onSubmitSpeed)} key="speed-form">
              <FormInputNumber
                min={0}
                max={100}
                step={0.01}
                name="speed"
                form={speedForm}
                label="Vitesse :"
                placeholder=""
                isRequired={true}
              />

              <FormAction submitText="Convertir" handleReset={handleReset} />
            </Form>
          ) : (
            <Form onSubmit={allureForm.handleSubmit(onSubmitAllure)} key="allure-form">
              <FormInputNumber
                min={0}
                max={60}
                step={1}
                name="minute"
                form={allureForm}
                label="Minute :"
                placeholder=""
                isRequired={true}
              />
              <FormInputNumber
                min={0}
                max={60}
                step={1}
                name="second"
                form={allureForm}
                label="Seconde :"
                placeholder=""
                isRequired={true}
              />
              <FormAction submitText="Convertir" handleReset={handleReset} />
            </Form>
          )}
        </CardContent>
      </Card>

      <Card className="text-center">
        {result.length > 0 ? (
          <CardHeader>
            <CardTitle>Résultat</CardTitle>
            <CardDescription className="font-bold text-3xl">{result}</CardDescription>
          </CardHeader>
        ) : (
          <CardHeader>
            <CardTitle>Résultat</CardTitle>
            <CardDescription>Saisir une valeur à convertir</CardDescription>
          </CardHeader>
        )}
      </Card>
    </>
  );
}
