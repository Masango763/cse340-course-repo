import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: connectionString && connectionString.includes('render.com') ? { rejectUnauthorized: false } : false
});

export default pool;
