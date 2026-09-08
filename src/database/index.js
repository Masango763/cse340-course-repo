import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const connectionString = process.env.DATABASE_URL;

let pool = null;
if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
} else {
  console.warn('Warning: DATABASE_URL not set. Running in fallback mode.');
}

export default {
  async query(text, params) {
    if (!pool) {
      throw new Error('Database connection string (DATABASE_URL) is undefined.');
    }
    return await pool.query(text, params);
  }
};
