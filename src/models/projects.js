import db from '../config/database.js';

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT project_id, organization_id, project_name, project_description, location, project_date
    FROM project
    WHERE organization_id = $1
    ORDER BY project_date;
  `;
  const result = await db.query(query, [organizationId]);
  return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
  const query = `
    SELECT 
      p.project_id, p.project_name, p.project_description, p.project_date, p.location,
      p.organization_id, o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.project_date >= CURRENT_DATE
    ORDER BY p.project_date ASC
    LIMIT $1;
  `;
  const result = await db.query(query, [numberOfProjects]);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT 
      p.project_id, p.project_name, p.project_description, p.project_date, p.location,
      p.organization_id, o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;
  const result = await db.query(query, [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM category c
    JOIN project_category pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT 
      p.project_id, p.project_name, p.project_description, p.project_date, p.location,
      p.organization_id, o.name AS organization_name
    FROM project p
    JOIN project_category pc ON p.project_id = pc.project_id
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date ASC;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows;
};

export {
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  getCategoriesByProjectId,
  getProjectsByCategoryId
};
