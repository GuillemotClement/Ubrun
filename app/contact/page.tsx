'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Form from '@/components/Form/Form';
import FormAction from '@/components/Form/FormAction';
import FormInputRadio from '@/components/Form/FormInputRadio';
import FormInputText from '@/components/Form/FormInputText';
import FormInputTextArea from '@/components/Form/FormInputTextArea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formContactSchema = z.object({
  email: z.email().trim(),
  title: z.string().trim().min(3, 'Minimum 3 caractères').max(255, 'Maximum 255 caractères'),
  content: z.string().trim().min(10, 'Minimum 10 caractères'),
  type: z.enum(['feature', 'bug'], {
    error: 'Sélectionner une catégorie',
  }),
});

type FormContact = z.infer<typeof formContactSchema>;

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

  const contactForm = useForm<FormContact>({
    resolver: zodResolver(formContactSchema),
    defaultValues: {
      email: '',
      title: '',
      content: '',
      type: undefined,
    },
  });

  const onSubmitForm = (data: FormContact) => {
    console.log(data);

    setServerError('');
    setIsLoading(true);

    // envoie vers la méthode dans service ou actions je sais plus
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
