-- Clear and re-populate tables with IT & Software Engineering community projects
TRUNCATE TABLE project_categories, projects, categories, organizations RESTART IDENTITY CASCADE;

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
