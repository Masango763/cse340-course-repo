import pool from './db.js';

export async function runMigrations() {
  try {
    await pool.query(`ALTER TABLE organizations ADD COLUMN IF NOT EXISTS email VARCHAR(255);`);
    await pool.query(`ALTER TABLE organizations ADD COLUMN IF NOT EXISTS logo_url TEXT;`);
    // Backfill logo addresses so the Edit Organization form shows them
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/codecraft-youth-initiative.jpg' WHERE name = 'CodeCraft Youth Initiative' AND (logo_url IS NULL OR logo_url = '');`);
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/opencivic-tech-alliance.jpg' WHERE name = 'OpenCivic Tech Alliance' AND (logo_url IS NULL OR logo_url = '');`);
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/senior-digital-bridge.jpg' WHERE name = 'Senior Digital Bridge' AND (logo_url IS NULL OR logo_url = '');`);
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/green-earth-alliance.jpg' WHERE name = 'Green Earth Alliance' AND (logo_url IS NULL OR logo_url = '');`);
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/healthaccess-community.jpg' WHERE name = 'HealthAccess Community' AND (logo_url IS NULL OR logo_url = '');`);
    console.log('Database migration check complete.');
  } catch (err) {
    console.error('Migration error:', err);
  }
}
