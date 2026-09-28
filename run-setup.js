import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false
  }
});

async function runSetup() {
  try {
    const sql = fs.readFileSync(
      path.join(
        __dirname,
        'src',
        'setup.sql'
      ),
      'utf8'
    );

    console.log(
      'Running src/setup.sql on your database...'
    );

    await pool.query(sql);

    console.log(
      'Database setup completed successfully!'
    );

    await pool.end();
    process.exit(0);

  } catch (err) {

    console.error(
      'Error running database setup:',
      err
    );

    await pool.end();
    process.exit(1);
  }
}

runSetup();
