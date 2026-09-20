import db from '../database/db.js';

const getAllCategories = async () => {
    const query = 'SELECT category_id, name FROM category ORDER BY name';
    const result = await db.query(query);
    return result.rows;
};

const getCategoryDetails = async (categoryId) => {
    const query = 'SELECT category_id, name FROM category WHERE category_id = $1';
    const result = await db.query(query, [categoryId]);
    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }
    return result.rows[0];
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO category (name)
        VALUES ($1)
        RETURNING category_id;
    `;
    const result = await db.query(query, [name]);
    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }
    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE category
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;
    const result = await db.query(query, [name, categoryId]);
    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }
    return result.rows[0].category_id;
};

export {
    getAllCategories,
    getCategoryDetails,
    createCategory,
    updateCategory
};
