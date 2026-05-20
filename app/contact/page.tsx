'use client';

import { useState } from 'react';

import { authClient } from '@/lib/betterAuth/auth-client';
import { FormContact, formContactSchema } from '@/lib/validations/contact.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Form from '@/components/Form/Form';
import FormAction from '@/components/Form/FormAction';
import FormInputRadio from '@/components/Form/FormInputRadio';
import FormInputText from '@/components/Form/FormInputText';
import FormInputTextArea from '@/components/Form/FormInputTextArea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { createRequestMessage } from './actions';

const contactType = [
  {
    id: 'feature',
    title: 'Demande',
  },
  {
    id: 'bug',
    title: 'Bug',
  },
];

export default function ContactPage() {
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data } = authClient.useSession();

  let userEmail = '';

  if (data) {
    userEmail = data.user.email;
  }

  const contactForm = useForm<FormContact>({
    resolver: zodResolver(formContactSchema),
    defaultValues: {
      email: userEmail,
      title: '',
      content: '',
      type: undefined,
    },
  });

  const onSubmitForm = async (data: FormContact) => {
    setServerError('');
    setIsLoading(true);

    const result = await createRequestMessage(data);

    setIsLoading(false);

    if (!result.success) {
      setServerError(result.message);
      return;
    }

    handleReset();
  };

  const handleReset = () => {
    contactForm.reset({
      email: '',
      title: '',
      content: '',
      type: undefined,
    });
  };

  return (
    <Card className="mb-5">
      <CardHeader className="">
        <CardTitle className="text-center">Contact</CardTitle>
        <CardDescription className="text-center my-2">
          Un bug, une demande d&apos;évolution ? N&apos;ésite pas, et envoie moi un message. Ta
          demande sera traité au plus vite
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={contactForm.handleSubmit(onSubmitForm)}>
          <FormInputText name="email" form={contactForm} label="Email :" type="email" />

          <FormInputText name="title" form={contactForm} label="Sujet :" />

          <FormInputTextArea name="content" form={contactForm} label="Message :" />

          <FormInputRadio
            form={contactForm}
            name="type"
            types={contactType}
            label="Type de message :"
          />

          {serverError && <p className="text-red-500 italic">{serverError}</p>}

          <FormAction submitText="Envoyer" handleReset={handleReset} isLoading={isLoading} />
        </Form>
      </CardContent>
    </Card>
  );
}
