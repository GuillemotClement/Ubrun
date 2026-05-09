


// import 'dotenv/config';
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' }); // permet de charger le fichier .env

export default defineConfig({
  out: './drizzle',
  schema: './lib/drizzle/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
