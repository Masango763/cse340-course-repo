import fs from 'fs';
import path from 'path';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL || process.argv[2];

if (!connectionString) {
  console.error('Missing connection string.');
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function runSeed() {
  try {
    await client.connect();
    const sql = fs.readFileSync(path.join(process.cwd(), 'src/database/db-sql-code.sql'), 'utf8');
    await client.query(sql);
    console.log('Database tables created and seeded successfully!');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await client.end();
  }
}

runSeed();
