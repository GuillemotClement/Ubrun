import * as z from 'zod';

export const formContactSchema = z.object({
  email: z.email().trim(),
  title: z.string().trim().min(3, 'Minimum 3 caractères').max(255, 'Maximum 255 caractères'),
  content: z.string().trim().min(10, 'Minimum 10 caractères'),
  type: z.enum(['feature', 'bug'], {
    error: 'Sélectionner une catégorie',
  }),
});

export type FormContact = z.infer<typeof formContactSchema>;
