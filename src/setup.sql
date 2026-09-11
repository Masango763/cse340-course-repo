-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_organization
        FOREIGN KEY(organization_id) 
        REFERENCES organizations(organization_id)
        ON DELETE CASCADE
);

-- 2. Insert sample service projects (assuming organization_ids 1, 2, and 3 exist)
INSERT INTO projects (organization_id, title, description, location, project_date) VALUES
(1, 'Community Garden Planting', 'Planting seasonal vegetables and flowers for the local community.', 'Central Park', '2026-10-15'),
(1, 'Food Bank Packaging', 'Sorting and packing non-perishable goods for distribution.', 'Downtown Warehouse', '2026-10-22'),
(1, 'Neighborhood Cleanup', 'Removing litter and clearing brush along the riverwalk.', 'River Park', '2026-11-05'),
(1, 'Senior Tech Support', 'Helping local seniors set up mobile devices and emails.', 'Community Center', '2026-11-12'),
(1, 'Holiday Toy Drive', 'Collecting and wrapping gifts for local families.', 'Main Library', '2026-12-01'),

(2, 'Youth Mentorship Kickoff', 'Pairing college mentors with local middle school students.', 'City High School', '2026-10-18'),
(2, 'After-School Tutoring', 'Assisting elementary school children with math and reading homework.', 'Eastside Elementary', '2026-10-25'),
(2, 'STEM Workshop', 'Interactive science experiments for kids aged 8-12.', 'Science Center', '2026-11-08'),
(2, 'Coat Drive Collection', 'Gathering winter coats and blankets for families in need.', 'Youth Hub', '2026-11-19'),
(2, 'Career Day Prep', 'Helping teens build resumes and practice mock interviews.', 'Civic Hall', '2026-12-05'),

(3, 'Shelter Painting Project', 'Repainting interior rooms at the municipal shelter.', 'Hope Shelter', '2026-10-20'),
(3, 'Hygiene Kit Assembly', 'Packing essential hygiene supplies into travel bags.', 'Red Cross Building', '2026-10-29'),
(3, 'Soup Kitchen Service', 'Preparing and serving warm lunch meals to local residents.', 'St. Jude Kitchen', '2026-11-10'),
(3, 'Disaster Prep Workshop', 'Distributing emergency preparedness information kits.', 'Fire Station 4', '2026-11-24'),
(3, 'Winter Blanket Drive', 'Distributing heavy blankets and warm clothing.', 'Westside Depot', '2026-12-10');

-- 3. Verify data insertion
SELECT * FROM projects;
