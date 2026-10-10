import pool from '../database/db.js';

export async function getAllCategories() {
  const result = await pool.query('SELECT * FROM categories ORDER BY name');
  return result.rows;
}

export async function getCategoryById(id) {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0];
}

export async function createCategory(name) {
  const result = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING id', [name]);
  return result.rows[0].id;
}

export async function updateCategory(id, name) {
  await pool.query('UPDATE categories SET name = $1 WHERE id = $2', [name, id]);
}

export async function getProjectsByCategory(categoryId) {
  const result = await pool.query(`
    SELECT p.*, o.name AS organization_name
    FROM projects p
    JOIN project_categories pc ON p.id = pc.project_id
    JOIN organizations o ON p.organization_id = o.id
    WHERE pc.category_id = $1
    ORDER BY p.due_date
  `, [categoryId]);
  return result.rows;
}
