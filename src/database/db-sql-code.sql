-- Create Tables
CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    category_description TEXT
);

CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL,
    organization_email VARCHAR(100),
    organization_website VARCHAR(150),
    organization_description TEXT
);

CREATE TABLE IF NOT EXISTS project (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    project_description TEXT NOT NULL,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    organization_id INT REFERENCES organization(organization_id) ON DELETE CASCADE
);

-- Seed Categories
INSERT INTO category (category_name, category_description) VALUES
('Education', 'Technology initiatives supporting schools, literacy, and digital learning.'),
('Healthcare', 'Digital solutions for community health centers and patient wellbeing.'),
('Environment', 'Tech tools driving sustainability, conservation, and eco-friendly practice.')
ON CONFLICT DO NOTHING;

-- Seed Organizations
INSERT INTO organization (organization_name, organization_email, organization_website, organization_description) VALUES
('Tech for Good', 'contact@techforgood.org', 'https://techforgood.org', 'Empowering local communities through digital skills training.'),
('Green Earth Initiative', 'info@greenearth.org', 'https://greenearth.org', 'Promoting environmental sustainability through tech solutions.'),
('Health Tech Alliance', 'support@healthtech.org', 'https://healthtech.org', 'Modernizing healthcare accessibility in underserved regions.')
ON CONFLICT DO NOTHING;

-- Seed Projects
INSERT INTO project (project_name, project_description, category_id, organization_id) VALUES
('Community Coding Lab', 'Setting up interactive coding workshops for underprivileged students.', 1, 1),
('Solar Power Tracker App', 'Building IoT dashboards to monitor solar installations in rural clinics.', 3, 2),
('Clinic Appointment Portal', 'Developing a web portal for scheduling local patient appointments.', 2, 3),
('E-Waste Recycling Hub', 'Creating an online platform for tracking electronic waste collection.', 3, 2)
ON CONFLICT DO NOTHING;
