-- =========================================================
-- CSE 340 Service Hub — Database Setup Script
-- This is the single source of truth for the database schema.
-- Safe to re-run: drops and recreates organizations/categories/
-- projects/project_categories, but preserves roles/users if they
-- already exist (IF NOT EXISTS).
-- =========================================================

-- -----------------------------
-- Roles table defines available roles
-- -----------------------------
CREATE TABLE IF NOT EXISTS roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

-- -----------------------------
-- Users table references roles
-- -----------------------------
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial roles
INSERT INTO roles (role_name, role_description)
VALUES
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access')
ON CONFLICT (role_name) DO NOTHING;

-- -----------------------------
-- Organizations, Categories, Projects, Project_Categories
-- Dropped and recreated fresh so the schema and seed data
-- always match this file exactly (this is also how the
-- database structure is graded, per the assignment).
-- -----------------------------
DROP TABLE IF EXISTS project_volunteers CASCADE;
DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- 1. Organizations Table
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    email VARCHAR(255),
    logo_url TEXT
);

-- 2. Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Projects Table (Foreign Key to Organizations)
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    due_date DATE,
    organization_id INT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE
);

-- 4. Junction Table for Many-to-Many Relationship (Projects <-> Categories)
CREATE TABLE project_categories (
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- -----------------------------
-- Seed Data: Organizations (5)
-- -----------------------------
INSERT INTO organizations (name, description, email, logo_url) VALUES
('CodeCraft Youth Initiative', 'Teaching youth programming and web development skills.', 'contact@codecraftyouth.org', 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/codecraft-youth-initiative.jpg'),
('OpenCivic Tech Alliance', 'Building open source civic tools for local government.', 'info@opencivictech.org', 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/opencivic-tech-alliance.jpg'),
('Senior Digital Bridge', 'Helping senior citizens bridge the digital divide.', 'hello@seniordigitalbridge.org', 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/senior-digital-bridge.jpg'),
('Green Earth Alliance', 'Promoting environmental sustainability through technology.', 'contact@greenearthalliance.org', 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/green-earth-alliance.jpg'),
('HealthAccess Community', 'Expanding telehealth access in rural regions.', 'info@healthaccess.org', 'https://cse340-course-repo-8vt3.onrender.com/images/organizations/healthaccess-community.jpg');

-- -----------------------------
-- Seed Data: Categories (5)
-- -----------------------------
INSERT INTO categories (name) VALUES
('Education'),
('Environment'),
('Healthcare'),
('Technology'),
('Community Development');

-- -----------------------------
-- Seed Data: Projects (15 total — 3 per organization)
-- -----------------------------
INSERT INTO projects (name, description, due_date, organization_id) VALUES
-- CodeCraft Youth Initiative (org 1)
('Youth Code Camp', 'A summer coding bootcamp for high school students.', '2026-06-15', 1),
('Girls Who Code Workshop', 'Weekend workshop introducing girls to web development.', '2026-07-05', 1),
('Robotics After-School Club', 'Hands-on robotics club for middle schoolers.', '2026-08-20', 1),

-- OpenCivic Tech Alliance (org 2)
('Civic Budget Visualizer', 'Interactive charts for city budget allocation transparency.', '2026-07-20', 2),
('Open Data Portal', 'Public portal for browsing local government datasets.', '2026-09-01', 2),
('Town Hall Livestream Tool', 'Streaming platform for public town hall meetings.', '2026-09-15', 2),

-- Senior Digital Bridge (org 3)
('Senior Tech Help Desk', 'Weekly drop-in tech support sessions for seniors.', '2026-05-10', 3),
('Video Call Training for Seniors', 'Teaching seniors to use video calling to stay connected with family.', '2026-06-01', 3),
('Scam Awareness Workshop', 'Helping seniors recognize and avoid online scams.', '2026-06-25', 3),

-- Green Earth Alliance (org 4)
('EcoTrack Clean Rivers', 'Sensor network to monitor local water pollution levels.', '2026-08-12', 4),
('Community Tree Planting Drive', 'Organizing volunteers to plant trees in urban areas.', '2026-09-10', 4),
('Recycling Awareness Campaign', 'Educating neighborhoods on proper recycling practices.', '2026-10-01', 4),

-- HealthAccess Community (org 5)
('Rural Telehealth Kiosk', 'Setting up remote diagnosis terminals in local community centers.', '2026-09-30', 5),
('Mobile Health Screening Van', 'Traveling van providing free basic health screenings.', '2026-10-15', 5),
('Health Education SMS Program', 'Sending preventive health tips via text message to rural residents.', '2026-11-01', 5);

-- -----------------------------
-- Seed Data: Project-Categories (Many-to-Many Relationships)
-- Every project is linked to at least one category.
-- -----------------------------
INSERT INTO project_categories (project_id, category_id) VALUES
-- Youth Code Camp -> Education, Technology
(1, 1), (1, 4),
-- Girls Who Code Workshop -> Education, Technology, Community Development
(2, 1), (2, 4), (2, 5),
-- Robotics After-School Club -> Education, Technology
(3, 1), (3, 4),

-- Civic Budget Visualizer -> Technology, Community Development
(4, 4), (4, 5),
-- Open Data Portal -> Technology, Community Development
(5, 4), (5, 5),
-- Town Hall Livestream Tool -> Technology, Community Development
(6, 4), (6, 5),

-- Senior Tech Help Desk -> Education, Community Development
(7, 1), (7, 5),
-- Video Call Training for Seniors -> Education, Community Development
(8, 1), (8, 5),
-- Scam Awareness Workshop -> Education, Technology, Community Development
(9, 1), (9, 4), (9, 5),

-- EcoTrack Clean Rivers -> Environment, Technology
(10, 2), (10, 4),
-- Community Tree Planting Drive -> Environment, Community Development
(11, 2), (11, 5),
-- Recycling Awareness Campaign -> Environment, Community Development
(12, 2), (12, 5),

-- Rural Telehealth Kiosk -> Healthcare, Technology
(13, 3), (13, 4),
-- Mobile Health Screening Van -> Healthcare, Community Development
(14, 3), (14, 5),
-- Health Education SMS Program -> Healthcare, Technology, Community Development
(15, 3), (15, 4), (15, 5);

-- Junction table for volunteers (users <-> projects)
CREATE TABLE IF NOT EXISTS project_volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, project_id)
);
