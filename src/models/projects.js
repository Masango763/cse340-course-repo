import pool from '../../database/db.js';

export async function getAllProjects() {
  const result = await pool.query(`
    SELECT p.*, o.organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.id
    ORDER BY p.date
  `);
  return result.rows;
}

export async function getProjectById(id) {
  const result = await pool.query(`
    SELECT p.*, o.organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.id
    WHERE p.project_id = $1
  `, [id]);
  return result.rows[0];
}

export async function getUpcomingProjects() {
  const result = await pool.query(`
    SELECT p.project_id, p.title, p.date, 
           o.id AS organization_id, 
           o.organization_name 
    FROM projects p
    JOIN organizations o ON p.organization_id = o.id
    ORDER BY p.date ASC
  `);
  return result.rows;
}

export async function getProjectDetails(projectId) {
  const result = await pool.query(`
    SELECT p.*, o.organization_name, o.location 
    FROM projects p
    JOIN organizations o ON p.organization_id = o.id
    WHERE p.project_id = $1
  `, [projectId]);
  return result.rows[0];
}

export async function getCategoriesByProjectId(projectId) {
  try {
    const result = await pool.query(`
      SELECT c.* FROM categories c
      JOIN project_categories pc ON c.category_id = pc.category_id
      WHERE pc.project_id = $1
    `, [projectId]);
    return result.rows;
  } catch (error) {
    return [];
  }
}

export async function getCategoriesByProjectId(projectId) {
    const result = await pool.query(
        `SELECT c.* FROM categories c 
         JOIN project_categories pc ON c.category_id = pc.category_id 
         WHERE pc.project_id = $1`,
        [projectId]
    );
    return result.rows;
}
