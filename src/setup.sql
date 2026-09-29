-- CSE 340 Service Hub: database setup script
-- Run this to recreate the full database structure and seed data.
-- Tables: organizations, projects, categories, project_categories (many-to-many)

DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE
);

-- Many-to-many join table: a project can belong to multiple categories,
-- and a category can be associated with multiple projects.
CREATE TABLE project_categories (
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- Data for organizations (5 records)
INSERT INTO organizations (id, name, description, location) VALUES (1, 'CodeCraft Youth Initiative', 'STEM education and coding programs for local youth.', 'Rexburg, ID');
INSERT INTO organizations (id, name, description, location) VALUES (2, 'OpenCivic Tech Alliance', 'Boise based civic tech group supporting digital equity.', 'Boise, ID');
INSERT INTO organizations (id, name, description, location) VALUES (3, 'Senior Digital Bridge', 'Idaho Falls digital literacy program for senior citizens.', 'Idaho Falls, ID');
INSERT INTO organizations (id, name, description, location) VALUES (4, 'Green Earth Alliance', 'River and wetland ecosystem conservation efforts.', 'Portland, OR');
INSERT INTO organizations (id, name, description, location) VALUES (5, 'HealthAccess Community', 'Rural health access and mobile clinic outreach.', 'Salt Lake City, UT');

-- Data for projects (10 records)
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (1, 'Senior Tech Help Desk', 'Weekly drop-in tech support sessions for seniors.', '2026-10-04', 3);
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (2, 'Youth Code Camp', 'Hands-on robotics and coding after-school workshops.', '2026-06-14', 1);
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (3, 'Civic Budget Visualizer', 'Interactive tool showing municipal budget allocation.', '2026-07-19', 2);
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (4, 'EcoTrack Clean Rivers', 'Volunteer-led river cleanup and pollution tracking.', '2026-08-11', 4);
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (5, 'Rural Telehealth Kiosk', 'Telehealth access points for remote communities.', '2026-09-29', 5);
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (6, 'Digital Literacy Nights', 'Evening computer skills classes for seniors.', '2026-11-09', 3);
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (7, 'Robotics Competition Prep', 'After-school robotics training for regional competition.', '2026-11-21', 1);
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (8, 'Open Data Portal', 'Public dashboard for city budget and civic data.', '2026-11-30', 2);
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (9, 'Wetland Restoration Days', 'Community planting and native species reintroduction.', '2027-01-14', 4);
INSERT INTO projects (id, name, description, due_date, organization_id) VALUES (10, 'Mobile Clinic Outreach', 'Traveling health clinic serving rural neighborhoods.', '2027-02-04', 5);

-- Data for categories (5 records)
INSERT INTO categories (id, name) VALUES (1, 'Community Development');
INSERT INTO categories (id, name) VALUES (2, 'Education');
INSERT INTO categories (id, name) VALUES (3, 'Environment');
INSERT INTO categories (id, name) VALUES (4, 'Healthcare');
INSERT INTO categories (id, name) VALUES (5, 'Technology');

-- Data for project_categories (19 records)
INSERT INTO project_categories (project_id, category_id) VALUES (1, 4);
INSERT INTO project_categories (project_id, category_id) VALUES (1, 5);
INSERT INTO project_categories (project_id, category_id) VALUES (2, 2);
INSERT INTO project_categories (project_id, category_id) VALUES (2, 5);
INSERT INTO project_categories (project_id, category_id) VALUES (3, 1);
INSERT INTO project_categories (project_id, category_id) VALUES (3, 5);
INSERT INTO project_categories (project_id, category_id) VALUES (4, 3);
INSERT INTO project_categories (project_id, category_id) VALUES (5, 4);
INSERT INTO project_categories (project_id, category_id) VALUES (5, 5);
INSERT INTO project_categories (project_id, category_id) VALUES (6, 2);
INSERT INTO project_categories (project_id, category_id) VALUES (6, 4);
INSERT INTO project_categories (project_id, category_id) VALUES (7, 2);
INSERT INTO project_categories (project_id, category_id) VALUES (7, 5);
INSERT INTO project_categories (project_id, category_id) VALUES (8, 1);
INSERT INTO project_categories (project_id, category_id) VALUES (8, 5);
INSERT INTO project_categories (project_id, category_id) VALUES (9, 1);
INSERT INTO project_categories (project_id, category_id) VALUES (9, 3);
INSERT INTO project_categories (project_id, category_id) VALUES (10, 1);
INSERT INTO project_categories (project_id, category_id) VALUES (10, 4);

-- Reset sequences to continue after seeded IDs
SELECT setval('organizations_id_seq', (SELECT MAX(id) FROM organizations));
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
