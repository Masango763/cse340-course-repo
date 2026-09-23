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
