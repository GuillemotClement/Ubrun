import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
  image: varchar(),
});
