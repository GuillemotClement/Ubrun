'use server';

import { insertRequestMessage } from '@/lib/services/contact.service';
import { FormContact, formContactSchema } from '@/lib/validations/contact.validation';

export async function createRequestMessage(formData: FormContact) {
  try {
    const result = formContactSchema.safeParse(formData);

    if (!result.success) {
      return {
        success: false,
        message: 'Les données du formulaire sont invalides.',
      };
    }

    const newRequest = await insertRequestMessage(result.data);

    if (!newRequest) {
      return {
        success: false,
        message: 'Failed to create new request',
      };
    }

    return {
      success: true,
      message: 'Message envoyé',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Une erreur serveur est survenue',
    };
  }
}
