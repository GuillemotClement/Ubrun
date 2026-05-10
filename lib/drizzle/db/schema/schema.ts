import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { user } from './auth-schema';

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

export const messageTypeTable = pgTable('message_type', {
  id: serial().primaryKey(),
  title: varchar().unique().notNull(),
});

export const messageStatusTable = pgTable('message_status', {
  id: serial().primaryKey(),
  title: varchar().unique().notNull(),
});

export const messageTable = pgTable('message', {
  id: serial().primaryKey(),
  title: varchar(),
  content: text(),
  messageTypeId: integer('message_type_id')
    .notNull()
    .references(() => messageTypeTable.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  messageStatusId: integer('message_status_id')
    .notNull()
    .references(() => messageStatusTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
