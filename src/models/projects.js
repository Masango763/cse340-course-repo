import db from '../config/database.js';

// Retrieve upcoming projects
const getUpcomingProjects = async (limit) => {
  const query = `
    SELECT 
      p.project_id, 
      p.project_name AS title, 
      p.project_description AS description, 
      p.project_date AS date, 
      p.location, 
      p.organization_id,
      o.organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.project_date >= NOW()
    ORDER BY p.project_date ASC
    LIMIT $1;
  `;
  const result = await db.query(query, [limit]);
  return result.rows;
};

// Retrieve a single project by ID
const getProjectDetails = async (projectId) => {
  const query = `
    SELECT 
      p.project_id, 
      p.project_name, 
      p.project_description, 
      p.project_date, 
      p.location, 
      p.organization_id,
      o.organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

// Retrieve categories for a project
const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM category c
    JOIN project p ON c.category_id = p.category_id
    WHERE p.project_id = $1;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

export { getUpcomingProjects, getProjectDetails, getCategoriesByProjectId };
