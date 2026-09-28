require('dotenv').config();

const fs = require('fs');
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error(
    'DATABASE_URL is missing from your .env file!'
  );

  process.exit(1);
}

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false
  }
});

const sql = fs.readFileSync(
  './src/setup.sql',
  'utf8'
);

console.log(
  'Connecting to database and running src/setup.sql...'
);

pool.query(sql)
  .then(async () => {

    console.log(
      'Database setup completed successfully!'
    );

    await pool.end();
    process.exit(0);

  })
  .catch(async err => {

    console.error(
      'Error executing src/setup.sql:',
      err.message
    );

    await pool.end();
    process.exit(1);
  });
