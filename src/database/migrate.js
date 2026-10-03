import pool from './db.js';

export async function runMigrations() {
  try {
    await pool.query(`ALTER TABLE organizations ADD COLUMN IF NOT EXISTS email VARCHAR(255);`);
    await pool.query(`ALTER TABLE organizations ADD COLUMN IF NOT EXISTS logo_url TEXT;`);
    console.log('Database migration check complete.');
  } catch (err) {
    console.error('Migration error:', err);
  }
}
