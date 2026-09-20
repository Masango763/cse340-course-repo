const pool = require('../config/database');

async function getAllCategories() {
    const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    return result.rows;
}

async function getCategoryById(id) {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
}

async function createCategory(name) {
    const query = 'INSERT INTO categories (name) VALUES ($1) RETURNING *;';
    const result = await pool.query(query, [name]);
    return result.rows[0];
}

async function updateCategory(id, name) {
    const query = 'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *;';
    const result = await pool.query(query, [name, id]);
    if (result.rows.length === 0) {
        throw new Error(`Category with ID ${id} not found for update.`);
    }
    return result.rows[0];
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory
};
