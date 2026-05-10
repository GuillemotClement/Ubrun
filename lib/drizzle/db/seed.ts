import 'dotenv/config';

import { db } from '..';
import { messageStatusTable, messageTypeTable, roleTable } from './schema/schema';

async function main() {
  console.log('Start seeding DB');

  console.log('Seed role user');
  await db
    .insert(roleTable)
    .values([{ title: 'admin' }, { title: 'user' }])
    .onConflictDoNothing();

  console.log('Seed type message');
  await db
    .insert(messageTypeTable)
    .values([{ title: 'bug' }, { title: 'feature' }])
    .onConflictDoNothing();

  console.log('Seed message status');
  await db
    .insert(messageStatusTable)
    .values([{ title: 'new' }, { title: 'doing' }, { title: 'done' }]);

  console.log('Seeding finish');
}

main().catch((error) => {
  console.error('Error seeding : ', error);
  process.exit(1);
});
