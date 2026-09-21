-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- 1. Organizations Table
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100)
);

-- 2. Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Projects Table (with Foreign Key to Organizations)
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    due_date DATE,
    organization_id INT REFERENCES organizations(id) ON DELETE CASCADE
);

-- 4. Junction Table for Many-to-Many Relationship (Projects & Categories)
CREATE TABLE project_categories (
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- Seed Data: Organizations
INSERT INTO organizations (name, description, location) VALUES
('CodeCraft Youth Initiative', 'Teaching youth programming and web development skills.', 'Rexburg, ID'),
('OpenCivic Tech Alliance', 'Building open source civic tools for local government.', 'Boise, ID'),
('Senior Digital Bridge', 'Helping senior citizens bridge the digital divide.', 'Idaho Falls, ID');

-- Seed Data: Categories
INSERT INTO categories (name) VALUES
('Education'),
('Environment'),
('Healthcare');

-- Seed Data: Projects
INSERT INTO projects (name, description, due_date, organization_id) VALUES
('Youth Code Camp', 'A summer coding bootcamp for high school students.', '2026-06-15', 1),
('Civic Budget Visualizer', 'Interactive charts for city budget allocation transparency.', '2026-07-20', 2),
('Senior Tech Help Desk', 'Weekly drop-in tech support sessions for seniors.', '2026-05-10', 3);
