-- Drop existing tables
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS organization CASCADE;

-- Create Tables
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    category_description TEXT
);

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL,
    organization_email VARCHAR(100),
    organization_website VARCHAR(150),
    organization_description TEXT
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    project_description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL DEFAULT 'Harare',
    project_date DATE NOT NULL DEFAULT CURRENT_DATE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    organization_id INT REFERENCES organization(organization_id) ON DELETE CASCADE
);

-- Seed Data
INSERT INTO organization (organization_id, organization_name, organization_email, organization_website, organization_description) VALUES
(1, 'Tech for Good', 'contact@techforgood.org', 'https://techforgood.org', 'Empowering local communities through digital skills training.'),
(2, 'Green Earth Initiative', 'info@greenearth.org', 'https://greenearth.org', 'Promoting environmental sustainability through tech solutions.'),
(3, 'Health Tech Alliance', 'support@healthtech.org', 'https://healthtech.org', 'Modernizing healthcare accessibility in underserved regions.');

INSERT INTO category (category_id, category_name, category_description) VALUES
(1, 'Education', 'Technology initiatives supporting schools, literacy, and digital learning.'),
(2, 'Healthcare', 'Digital solutions for community health centers and patient wellbeing.'),
(3, 'Environment', 'Tech tools driving sustainability, conservation, and eco-friendly practices.');

INSERT INTO project (project_name, project_description, location, project_date, category_id, organization_id) VALUES
('Community Coding Lab', 'Interactive coding workshops for underprivileged students.', 'Harare CBD', '2026-10-15', 1, 1),
('Digital Literacy Drive', 'Teaching computer basics to adult learners.', 'Highfield', '2026-10-22', 1, 1),
('Solar Power Tracker App', 'IoT dashboards to monitor solar installations in rural clinics.', 'Mutare', '2026-10-10', 3, 2),
('Clinic Appointment Portal', 'Web portal for scheduling local patient appointments.', 'Epworth', '2026-10-12', 2, 3);
