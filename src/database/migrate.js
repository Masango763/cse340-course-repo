import pool from './db.js';

export const runMigrations = async () => {
  try {
    await pool.query(`ALTER TABLE organizations ADD COLUMN IF NOT EXISTS email VARCHAR(255);`);
    await pool.query(`ALTER TABLE organizations ADD COLUMN IF NOT EXISTS logo_url TEXT;`);
    // Backfill logo addresses so the Edit Organization form shows them
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/codecraft-youth-initiative.jpg' WHERE name = 'CodeCraft Youth Initiative' AND (logo_url IS NULL OR logo_url = '');`);
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/opencivic-tech-alliance.jpg' WHERE name = 'OpenCivic Tech Alliance' AND (logo_url IS NULL OR logo_url = '');`);
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/senior-digital-bridge.jpg' WHERE name = 'Senior Digital Bridge' AND (logo_url IS NULL OR logo_url = '');`);
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/green-earth-alliance.jpg' WHERE name = 'Green Earth Alliance' AND (logo_url IS NULL OR logo_url = '');`);
    await pool.query(`UPDATE organizations SET logo_url = 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/healthaccess-community.jpg' WHERE name = 'HealthAccess Community' AND (logo_url IS NULL OR logo_url = '');`);

    // Make sure the volunteering table exists on databases where setup.sql was never re-run
    await pool.query(`
      CREATE TABLE IF NOT EXISTS project_volunteers (
        volunteer_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, project_id)
      );
    `);

    console.log('Database migration check complete.');
  } catch (err) {
    console.error('Migration error:', err);
  }
}
