'use client';

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
  const registerForm = useForm<RegisterFormValue>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const onSubmitRegister = (data: RegisterFormValue) => {
    // appelle fonction
    console.log(data);
  };

  const handleReset = () => {
    registerForm.reset();
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
          <FormAction submitText="Inscription" handleReset={handleReset} />
        </Form>
      </CardContent>
    </Card>
  );
}
