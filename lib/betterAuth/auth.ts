import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { db } from '../drizzle';
import * as schema from '../drizzle/db/schema/auth-schema';
import { isAdminUser, setUserRoleDefault } from '../drizzle/db/services/role.service';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // permet d'étendre les données dans session du hook
  session: {
    additionalFields: {
      isAdmin: {
        type: 'boolean',
        required: false,
        defaultValue: false,
        input: false,
      },
    },
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
    session: {
      // à la création de la session, on ajoute la valeur si user est admin
      create: {
        before: async (session) => {
          const isAdmin = await isAdminUser(session.userId);

          return {
            data: {
              ...session,
              isAdmin,
            },
          };
        },
      },
    },
  },
});
