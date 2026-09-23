import pool from '../database/db.js';

export async function getAllProjects() {
  const result = await pool.query(`
    SELECT p.*, o.name AS organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.id
    ORDER BY p.due_date
  `);
  return result.rows;
}

export async function getProjectById(id) {
  const result = await pool.query(`
    SELECT p.*, o.name AS organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.id
    WHERE p.id = $1
  `, [id]);
  return result.rows[0];
}

export async function createProject({ name, description, due_date, organization_id }) {
  const result = await pool.query(
    `INSERT INTO projects (name, description, due_date, organization_id)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [name, description, due_date, organization_id]
  );
  return result.rows[0].id;
}

export async function updateProject(id, { name, description, due_date, organization_id }) {
  await pool.query(
    `UPDATE projects SET name = $1, description = $2, due_date = $3, organization_id = $4
     WHERE id = $5`,
    [name, description, due_date, organization_id, id]
  );
}

export async function getCategoriesForProject(projectId) {
  const result = await pool.query(`
    SELECT c.* FROM categories c
    JOIN project_categories pc ON c.id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name
  `, [projectId]);
  return result.rows;
}

export async function setProjectCategories(projectId, categoryIds) {
  await pool.query('DELETE FROM project_categories WHERE project_id = $1', [projectId]);
  for (const catId of categoryIds) {
    await pool.query(
      'INSERT INTO project_categories (project_id, category_id) VALUES ($1, $2)',
      [projectId, catId]
    );
  }
}
