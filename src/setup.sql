-- 1. Create Organizations Table
CREATE TABLE IF NOT EXISTS organizations (
  organization_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  website VARCHAR(150)
);

-- 2. Insert Sample Organizations
INSERT INTO organizations (name, description, website) VALUES
('Community Outreach Guild', 'Dedicated to supporting local communities and shelters.', 'https://communityoutreach.org'),
('Youth Empowerment Network', 'Empowering youth through education, mentorship, and tech skills.', 'https://youthempowerment.net'),
('Green Earth Alliance', 'Focused on environmental conservation, tree planting, and sustainability.', 'https://greenearth.org')
ON CONFLICT DO NOTHING;

-- 3. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  project_id SERIAL PRIMARY KEY,
  organization_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  CONSTRAINT fk_organization
    FOREIGN KEY (organization_id)
    REFERENCES organizations(organization_id)
    ON DELETE CASCADE
);

-- 4. Insert Sample Projects
INSERT INTO projects (organization_id, title, description, location, date) VALUES
(1, 'Community Food Drive', 'Collect and deliver canned goods to local shelters.', 'Community Center', '2026-10-15'),
(1, 'Park Cleanup', 'Rake leaves and pick up litter in the main park.', 'City Park', '2026-10-22'),
(1, 'Senior Home Visit', 'Spend time conversing and playing board games with residents.', 'Sunnyside Manor', '2026-11-05'),
(1, 'Warm Coat Drive', 'Sort and distribute donated winter coats.', 'Downtown Hub', '2026-11-12'),
(1, 'Holiday Meal Prep', 'Prepare hot Thanksgiving meals for families in need.', 'Soup Kitchen', '2026-11-26'),
(2, 'Youth Tutoring', 'Provide free homework help for elementary students.', 'Public Library', '2026-10-18'),
(2, 'STEM Workshop', 'Demonstrate simple science experiments for youth.', 'Youth Club', '2026-10-25'),
(2, 'Book Donation Sorting', 'Organize and package books for local schools.', 'Warehouse B', '2026-11-02'),
(2, 'Coding Bootcamp Mentor', 'Guide high school students through introductory JavaScript.', 'Tech Center', '2026-11-16'),
(2, 'After-school Reading Hour', 'Read storybooks to children aged 5 to 8.', 'Community Library', '2026-11-30'),
(3, 'Tree Planting Initiative', 'Plant 50 native trees along the riverbank.', 'Riverside Trail', '2026-10-20'),
(3, 'Recycling Drive', 'Collect electronic waste and recyclable plastics.', 'Recycling Hub', '2026-10-28'),
(3, 'Garden Bed Construction', 'Build raised garden beds for a community garden.', 'East Community Plot', '2026-11-08'),
(3, 'Beach & River Cleanup', 'Remove trash from local waterways.', 'River Bend', '2026-11-18'),
(3, 'Compost Bin Assembly', 'Help residents set up home composting systems.', 'Civic Center', '2026-12-02');
