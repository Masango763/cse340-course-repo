import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
};
