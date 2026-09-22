import pool from '../database/db.js';

const getUpcomingProjects = async (number_of_projects = 5) => {
  const query = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, 
           o.organization_id, o.name AS organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;
  `;
  const result = await pool.query(query, [number_of_projects]);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, 
           o.organization_id, o.name AS organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

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
