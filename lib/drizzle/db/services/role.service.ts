import { and, eq } from 'drizzle-orm';

import { db } from '../..';
import { roleTable, userRoleTable } from '../schema/schema';

type Role = 'admin' | 'user';

export const getRoleId = async (role: Role): Promise<number | null> => {
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

export const isAdminUser = async (userId: string): Promise<boolean> => {
  const adminRoleId = await getRoleId('admin');

  if (!adminRoleId) {
    return false;
  }

  const userAdminRole = await db
    .select()
    .from(userRoleTable)
    .where(and(eq(userRoleTable.userId, userId), eq(userRoleTable.roleId, adminRoleId)))
    .limit(1);

  // drizzle retourne toujours un tableau vide si non trouvé. On test avec .length pour check si de la donnée est présente dans le tableau du coup
  return userAdminRole.length > 0;
};
