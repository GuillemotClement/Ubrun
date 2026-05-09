import { integer, pgTable, primaryKey, serial, text, varchar } from 'drizzle-orm/pg-core';

export const roleTable = pgTable('role', {
  id: serial().primaryKey(),
  title: varchar().unique(),
});

export const userRoleTable = pgTable(
  'user_role',
  {
    userId: text('user_id').notNull(),
    roleId: integer('role_id').notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.roleId] })]
);
