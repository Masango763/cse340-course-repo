import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function runSetup() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'database/setup.sql'), 'utf8');
        console.log('Running setup.sql on your Render database...');
        await pool.query(sql);
        console.log('Database setup completed successfully! All tables and categories are now populated.');
        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('Error running setup.sql:', err);
        await pool.end();
        process.exit(1);
    }
}

runSetup();
