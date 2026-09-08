DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_organization 
        FOREIGN KEY (organization_id) 
        REFERENCES organization(organization_id) 
        ON DELETE CASCADE
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES project(project_id) ON DELETE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
('BrightFuture Builders', 'A nonprofit focused on community infrastructure through sustainable projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

INSERT INTO project (organization_id, title, description, location, project_date) VALUES
(1, 'Community Center Renovation', 'Repairing roofing and interior walls.', '124 Main Street', '2026-10-15'),
(1, 'Solar Panel Installation', 'Installing low-cost solar panels.', '45 Elm Avenue', '2026-10-22'),
(2, 'Urban Garden Planting', 'Preparing soil beds and planting winter crop seeds.', 'Community Plot 4', '2026-10-10'),
(2, 'Composting Workshop Setup', 'Constructing three-tier compost bins.', 'Green Harvest Hub', '2026-10-18'),
(3, 'Food Bank Packaging Drive', 'Sorting, packing, and labeling food boxes.', 'Unity Warehouse', '2026-10-12');

INSERT INTO category (name) VALUES
('Infrastructure & Construction'),
('Environmental & Agriculture'),
('Community Outreach & Youth');

INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), (2, 1), (3, 2), (4, 2), (5, 3);
