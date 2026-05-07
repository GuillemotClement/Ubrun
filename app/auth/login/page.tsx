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

const loginFormSchema = z.object({
  email: z.email().trim(),
  password: z.string(),
});

type LoginFormValue = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();

  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormValue>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitLogin = async (data: LoginFormValue) => {
    setServerError('');
    setIsLoading(true);

    const { email, password } = data;

    await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: true,
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
    loginForm.reset();
    setIsLoading(false);
    setServerError('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={loginForm.handleSubmit(onSubmitLogin)} key="login-form">
          <FormInputText name="email" form={loginForm} label="Email :" type="email" />
          <FormInputText name="password" form={loginForm} label="Mot de passe :" type="password" />

          {serverError && <p className="text-red-500 italic">{serverError}</p>}

          <FormAction submitText="Connexion" handleReset={handleReset} isLoading={isLoading} />
        </Form>
      </CardContent>
    </Card>
  );
}
