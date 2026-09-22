const pool = require('../database/db');

async function getAllCategories() {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

module.exports = {
    getAllCategories
};
