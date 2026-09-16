import pool from '../database/dbConfig.js';

export async function getUpcomingProjects() {
  try {
    const result = await pool.query(`
      SELECT 
        p.project_id, 
        p.title, 
        p.description, 
        p.date, 
        p.location, 
        p.organization_id, 
        o.organization_name 
      FROM projects p
      LEFT JOIN organizations o ON p.organization_id = o.organization_id
      ORDER BY p.date ASC;
    `);
    return result.rows;
  } catch (error) {
    console.error("Error fetching upcoming projects:", error);
    throw error;
  }
}

export async function getProjectById(projectId) {
  try {
    const result = await pool.query(`
      SELECT 
        p.project_id, 
        p.title AS project_name, 
        p.description AS project_description, 
        p.date AS project_date, 
        p.location, 
        p.organization_id, 
        o.organization_name, 
        o.email, 
        o.phone 
      FROM projects p
      LEFT JOIN organizations o ON p.organization_id = o.organization_id
      WHERE p.project_id = $1;
    `, [projectId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
}
