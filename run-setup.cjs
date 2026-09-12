require('dotenv').config();
const fs = require('fs');
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing from your .env file!');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sql = fs.readFileSync('./src/setup.sql', 'utf8');

console.log('Connecting to database and running setup.sql...');

pool.query(sql)
  .then(() => {
    console.log('✅ Database setup completed successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error executing setup.sql:', err.message);
    process.exit(1);
  });
