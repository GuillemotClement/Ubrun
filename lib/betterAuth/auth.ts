import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { db } from '../drizzle';
import * as schema from '../drizzle/db/schema/auth-schema';
import { setUserRoleDefault } from '../drizzle/db/services/role.service';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      // à la création d'un user, viens ajouter un nouveau rôle par défaut
      create: {
        after: async (user) => {
          await setUserRoleDefault(user.id);
        },
      },
    },
  },
});
