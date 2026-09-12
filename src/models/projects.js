import pool from '../database/index.js';

export async function getAllProjects() {
  const sql = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    ORDER BY p.date ASC;
  `;
  const result = await pool.query(sql);
  return result.rows;
}

export async function getProjectsByCategoryId(categoryId) {
  const sql = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.organization_id = $1
    ORDER BY p.date ASC;
  `;
  const result = await pool.query(sql, [categoryId]);
  return result.rows;
}
