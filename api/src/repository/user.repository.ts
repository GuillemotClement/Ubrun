import { userTable } from "../db/schema";
import { db } from "../lib/drizzle";
import { eq } from "drizzle-orm";

type SelectUser = typeof userTable.$inferSelect;
type InsertUser = typeof userTable.$inferInsert;

export default {
  async getAll() {
    return await db
      .select({
        name: userTable.name,
        email: userTable.email,
        id: userTable.id,
      })
      .from(userTable);
  },

  async getByEmail(email: string) {
    const [result] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    return result || null;
  },

  async getByName(name: string) {
    const [result] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.name, name));
    return result || null;
    return;
  },

  async create(userData: InsertUser) {
    const [result] = await db.insert(userTable).values(userData).returning({
      name: userTable.name,
      email: userTable.email,
      id: userTable.id,
    });
    return result || null;
  },
};
