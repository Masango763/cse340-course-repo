import db from '../database/db.js';

const getAllCategories = async () => {
    const query = 'SELECT category_id, category_name AS name FROM category ORDER BY category_name';
    const result = await db.query(query);
    return result.rows;
};

const getCategoryDetails = async (categoryId) => {
    const query = 'SELECT category_id, category_name AS name FROM category WHERE category_id = $1';
    const result = await db.query(query, [categoryId]);
    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }
    return result.rows[0];
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO category (category_name)
        VALUES ($1)
        RETURNING category_id, category_name AS name;
    `;
    const result = await db.query(query, [name]);
    return result.rows[0];
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE category
        SET category_name = $1
        WHERE category_id = $2
        RETURNING category_id, category_name AS name;
    `;
    const result = await db.query(query, [name, categoryId]);
    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }
    return result.rows[0];
};

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;
    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

export {
    getAllCategories,
    getCategoryDetails,
    createCategory,
    updateCategory,
    assignCategoryToProject,
    updateCategoryAssignments
};
