import pool from '../database/db.js';

export async function getAllCategories() {
    const result = await pool.query('SELECT * FROM categories ORDER BY category_name ASC');
    return result.rows;
}

export async function getCategoryById(id) {
    const result = await pool.query('SELECT * FROM categories WHERE category_id = $1', [id]);
    return result.rows[0];
}

export async function createCategory(name) {
    const result = await pool.query(
        'INSERT INTO categories (category_name) VALUES ($1) RETURNING *',
        [name]
    );
    return result.rows[0];
}

export async function updateCategory(id, name) {
    const result = await pool.query(
        'UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *',
        [name, id]
    );
    return result.rows[0];
}
