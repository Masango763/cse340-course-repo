import pool from '../database/db.js';

// Get upcoming projects with organization details
const getUpcomingProjects = async (limit = 5) => {
  const query = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, 
           o.organization_id, o.organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    ORDER BY p.date ASC
    LIMIT $1;
  `;
  const result = await pool.query(query, [limit]);
  return result.rows;
};

// Get single project details with organization details
const getProjectDetails = async (projectId) => {
  const query = `
    SELECT p.project_id, p.title AS project_name, p.description AS project_description, 
           p.date AS project_date, p.location, 
           o.organization_id, o.organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;
  const result = await pool.query(query, [projectId]);
  return result.rows[0];
};

// Get all categories associated with a project ID
const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM categories c
    JOIN project_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name ASC;
  `;
  const result = await pool.query(query, [projectId]);
  return result.rows;
};

export { getUpcomingProjects, getProjectDetails, getCategoriesByProjectId };
