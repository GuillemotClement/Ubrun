import 'dotenv/config'

import { db } from '..';
import { roleTable } from './schema/schema';



async function main() {
  console.log('Start seeding DB');

  await db
    .insert(roleTable)
    .values([{ title: 'admin' }, { title: 'user' }])
    .onConflictDoNothing();

  console.log('Seeding finish');
}

main().catch((error) => {
  console.error('Error seeding : ', error);
  process.exit(1);
});
