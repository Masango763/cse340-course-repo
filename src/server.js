import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import router from './routes.js';
import pool from './database/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);

app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).render('500', { 
    title: 'Internal Server Error', 
    message: err.message 
  });
});

// Automatically ensure tables exist and seed IT-focused projects on startup
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS organizations (
        organization_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        contact_email VARCHAR(255),
        location VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS projects (
        project_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        location VARCHAR(255),
        organization_id INT REFERENCES organizations(organization_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS categories (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS project_categories (
        project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
        category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
        PRIMARY KEY (project_id, category_id)
      );
    `);

    // Always ensure IT projects are loaded for your software engineering portfolio
    await pool.query('TRUNCATE TABLE project_categories, projects, categories, organizations RESTART IDENTITY CASCADE;');

    await pool.query(`
      INSERT INTO organizations (name, description, contact_email, location) VALUES
      ('CodeCraft Youth Initiative', 'Teaching youth programming, web development, and computer science fundamentals.', 'lead@codecraftyouth.org', 'Rexburg, ID'),
      ('Senior Digital Bridge', 'Providing digital literacy training and technology access to elderly community members.', 'support@seniordigitalbridge.org', 'Idaho Falls, ID'),
      ('OpenCivic Tech Alliance', 'Building open-source software solutions and databases for local non-profits and government agencies.', 'contact@opencivictech.org', 'Boise, ID');

      INSERT INTO projects (title, description, date, location, organization_id) VALUES
      ('Python & Scratch Coding Bootcamp', 'Mentor middle school students through building their first interactive games and scripts using Python and Scratch.', '2026-10-10', 'Community Tech Lab', 1),
      ('Senior Smartphone & Web Literacy Workshop', 'Assist seniors in navigating modern web interfaces, secure online banking, and communication tools.', '2026-10-18', 'Public Library Annex', 2),
      ('Non-Profit Database Migration & Setup', 'Design and deploy a secure PostgreSQL database and web backend dashboard to help a food pantry track inventory.', '2026-10-25', 'CodeCraft Headquarters', 3),
      ('Full-Stack Web Development Hackathon', 'Host a weekend hackathon where aspiring developers build local community service web applications using Node.js and React.', '2026-11-05', 'University Innovation Center', 1),
      ('Open-Source Accessibility Audit', 'Conduct code reviews and accessibility testing on public municipal websites to ensure WCAG compliance.', '2026-11-20', 'Online / Remote', 3);

      INSERT INTO categories (name) VALUES
      ('Software Engineering'),
      ('Digital Literacy'),
      ('Community Tech'),
      ('Open Source');

      INSERT INTO project_categories (project_id, category_id) VALUES
      (1, 1), (1, 3),
      (2, 2),
      (3, 1), (3, 3),
      (4, 1), (4, 4),
      (5, 3), (5, 4);
    `);
    console.log('Successfully refreshed database with IT-focused service projects!');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
};

app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server running on port ${PORT}`);
});
