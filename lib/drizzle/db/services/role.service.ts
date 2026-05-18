import { eq } from 'drizzle-orm';

import { db } from '../..';
import { roleTable, userRoleTable } from '../schema/schema';

type Role = 'admin' | 'user';

const getRoleId = async (role: Role): Promise<number | null> => {
  const result = await db
    .select({ id: roleTable.id })
    .from(roleTable)
    .where(eq(roleTable.title, role))
    .limit(1);

  return result[0]?.id ?? null;
};

export const setUserRoleDefault = async (userId: string): Promise<void> => {
  const userRoleId = await getRoleId('user');

  if (!userRoleId) {
    throw new Error("Default role 'user' not found");
  }

  await db.insert(userRoleTable).values({ userId, roleId: userRoleId }).onConflictDoNothing();
};
