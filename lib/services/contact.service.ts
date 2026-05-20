import { desc, eq } from 'drizzle-orm';

import { db } from '../drizzle';
import { messageStatusTable, messageTable, messageTypeTable } from '../drizzle/db/schema/schema';

// méthode qui viens insérer en DB
type CreateRequestMessageRequest = {
  email: string;
  title: string;
  content: string;
  type: 'feature' | 'bug';
};

export type RequestMessage = {
  messageId: number;
  messageEmail: string;
  messageTitle: string | null;
  messageContent: string | null;
  messageDate: Date;
  messageStatusId: number;
  messageStatus: string;
  messageTypeId: number;
  messageType: string;
};

export async function insertRequestMessage(input: CreateRequestMessageRequest) {
  const { type } = input;

  const messageTypeId = await getMessageTypeId(type);
  if (messageTypeId == null) {
    throw new Error("Invalid data 'Type Id not found'");
  }

  const messageStatusId = await getMessageStatusId('new'); // par défaut, on passe le status à new
  if (messageStatusId == null) {
    throw new Error("Invalid data 'Status Id not found'");
  }

  const payload = {
    email: input.email,
    title: input.title,
    content: input.content,
    messageTypeId,
    messageStatusId,
  };

  const result = await db.insert(messageTable).values(payload).returning();

  return result[0] ?? null;
}

async function getMessageTypeId(titleMessage: string): Promise<number | null> {
  const result = await db
    .select({ id: messageTypeTable.id })
    .from(messageTypeTable)
    .where(eq(messageTypeTable.title, titleMessage))
    .limit(1);

  return result[0]?.id ?? null;
}

async function getMessageStatusId(title: string): Promise<number | null> {
  const result = await db
    .select({ id: messageStatusTable.id })
    .from(messageStatusTable)
    .where(eq(messageStatusTable.title, title))
    .limit(1);

  return result[0]?.id ?? null;
}

export async function getRequestMessages(): Promise<RequestMessage[]> {
  return db
    .select({
      messageId: messageTable.id,
      messageEmail: messageTable.email,
      messageTitle: messageTable.title,
      messageContent: messageTable.content,
      messageDate: messageTable.createdAt,
      messageStatusId: messageStatusTable.id,
      messageStatus: messageStatusTable.title,
      messageTypeId: messageTypeTable.id,
      messageType: messageTypeTable.title,
    })
    .from(messageTable)
    .innerJoin(messageTypeTable, eq(messageTable.messageTypeId, messageTypeTable.id))
    .innerJoin(messageStatusTable, eq(messageTable.messageStatusId, messageStatusTable.id))
    .orderBy(desc(messageTable.createdAt))
    .limit(20);
}
