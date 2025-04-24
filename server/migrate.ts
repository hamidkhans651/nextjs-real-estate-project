import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const runMigration = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(sql);

  console.log('Running migrations...');

  await migrate(db, { migrationsFolder: 'server/migrations' });

  console.log('Migrations completed successfully!');

  await sql.end();
  process.exit(0);
};

runMigration().catch((err) => {
  console.error('Migration failed!', err);
  process.exit(1);
}); 