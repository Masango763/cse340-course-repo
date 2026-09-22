import pool from '../../database/db.js';

export async function getAllCategories() {
  const result = await pool.query('SELECT * FROM categories ORDER BY name');
  return result.rows;
}

export async function getCategoryById(id) {
  const result = await pool.query('SELECT * FROM categories WHERE category_id = $1', [id]);
  return result.rows[0];
}
