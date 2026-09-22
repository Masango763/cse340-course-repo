import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

// Use process.env.DATABASE_URL if available, otherwise construct it from your credentials
const connectionString = process.env.DATABASE_URL || 'postgresql://cse340_f4ms_user:5SWGIxf62krBA2b5a6TuuUkqaaOohL8n@dpg-dafuos740ujc73d2q80g-a.oregon-postgres.render.com/cse340_f4ms';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;
