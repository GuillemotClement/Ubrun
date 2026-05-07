'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/betterAuth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Form from '@/components/Form/Form';
import FormAction from '@/components/Form/FormAction';
import FormInputText from '@/components/Form/FormInputText';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const registerFormSchema = z.object({
  email: z.email().trim(),
  name: z.string().min(2, 'Un nom valide est attendu').trim(),
  password: z.string().min(6, 'Un mot de passe de 6 caractère minimum est attendu'),
});

type RegisterFormValue = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const registerForm = useForm<RegisterFormValue>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const onSubmitRegister = async (data: RegisterFormValue) => {
    setServerError('');
    setIsLoading(true);

    const { email, password, name } = data;

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: '/',
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push('/');
        },
        onError: (ctx) => {
          setServerError(ctx.error.message);
        },
      }
    );
  };

  const handleReset = () => {
    registerForm.reset();
    setIsLoading(false);
    setServerError('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={registerForm.handleSubmit(onSubmitRegister)} key="register-form">
          <FormInputText name="email" form={registerForm} label="Email :" type="email" />
          <FormInputText name="name" form={registerForm} label="Nom :" />
          <FormInputText
            name="password"
            form={registerForm}
            label="Mot de passe :"
            type="password"
          />

          {serverError && <p className="text-red-500 italic">{serverError}</p>}

          <FormAction submitText="Inscription" handleReset={handleReset} isLoading={isLoading} />
        </Form>
      </CardContent>
    </Card>
  );
}
