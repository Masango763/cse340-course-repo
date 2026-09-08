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
    location VARCHAR(100) NOT NULL DEFAULT 'Harare',
    project_date DATE NOT NULL DEFAULT CURRENT_DATE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    organization_id INT REFERENCES organization(organization_id) ON DELETE CASCADE
);

-- Seed Organizations
INSERT INTO organization (organization_id, organization_name, organization_email, organization_website, organization_description) VALUES
(1, 'Tech for Good', 'contact@techforgood.org', 'https://techforgood.org', 'Empowering local communities through digital skills training.'),
(2, 'Green Earth Initiative', 'info@greenearth.org', 'https://greenearth.org', 'Promoting environmental sustainability through tech solutions.'),
(3, 'Health Tech Alliance', 'support@healthtech.org', 'https://healthtech.org', 'Modernizing healthcare accessibility in underserved regions.')
ON CONFLICT (organization_id) DO NOTHING;

-- Seed Categories
INSERT INTO category (category_id, category_name, category_description) VALUES
(1, 'Education', 'Technology initiatives supporting schools, literacy, and digital learning.'),
(2, 'Healthcare', 'Digital solutions for community health centers and patient wellbeing.'),
(3, 'Environment', 'Tech tools driving sustainability, conservation, and eco-friendly practice.')
ON CONFLICT (category_id) DO NOTHING;

-- Seed 15 Projects (5 per Organization)
INSERT INTO project (project_name, project_description, location, project_date, category_id, organization_id) VALUES
-- Tech for Good (Org 1)
('Community Coding Lab', 'Interactive coding workshops for underprivileged students.', 'Harare CBD', '2026-10-15', 1, 1),
('Digital Literacy Drive', 'Teaching computer basics to adult learners.', 'Highfield', '2026-10-22', 1, 1),
('School Refurbished Tech', 'Setting up donated desktop PCs in rural secondary schools.', 'Chitungwiza', '2026-11-05', 1, 1),
('Youth Robotics Club', 'Introducing STEM and basic robotics to primary schools.', 'Mbare', '2026-11-18', 1, 1),
('Open Source Mentorship', 'Pairing junior developers with senior tech mentors.', 'Avondale', '2026-12-01', 1, 1),

-- Green Earth Initiative (Org 2)
('Solar Power Tracker App', 'IoT dashboards to monitor solar installations in rural clinics.', 'Mutare', '2026-10-10', 3, 2),
('E-Waste Recycling Hub', 'Online platform for tracking electronic waste collection.', 'Bulawayo', '2026-10-28', 3, 2),
('Smart Irrigation Sensor System', 'Deploying moisture sensor networks for urban farms.', 'Gweru', '2026-11-12', 3, 2),
('Forest Canopy Satellite Monitor', 'Mapping deforestation trends using remote sensing data.', 'Nyanga', '2026-11-25', 3, 2),
('Community Clean-Up Mapper', 'Geospatial web app for reporting illegal dumping zones.', 'Kwekwe', '2026-12-05', 3, 2),

-- Health Tech Alliance (Org 3)
('Clinic Appointment Portal', 'Web portal for scheduling local patient appointments.', 'Epworth', '2026-10-12', 2, 3),
('Maternal Health SMS Alert System', 'Automated reminders for prenatal and postnatal visits.', 'Norton', '2026-10-30', 2, 3),
('Telemedicine Kiosk Pilot', 'Connecting rural patients with remote physicians.', 'Masvingo', '2026-11-08', 2, 3),
('Vaccine Cold-Chain Tracker', 'Temperature monitoring dashboards for medical storage.', 'Bindura', '2026-11-20', 2, 3),
('First Aid Mobile Guide', 'Offline digital resource for localized emergency response.', 'Marondera', '2026-12-10', 2, 3)
ON CONFLICT DO NOTHING;
