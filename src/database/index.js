import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : false
});

const db = {
  query: (text, params) => pool.query(text, params),
};

export const query = (text, params) => pool.query(text, params);
export default db;
