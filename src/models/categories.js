import pool from '../database/db.js';

const getAllCategories = async () => {
  const result = await pool.query('SELECT category_id, name FROM categories ORDER BY name ASC');
  return result.rows;
};

const getCategoryDetails = async (categoryId) => {
  const catResult = await pool.query('SELECT category_id, name FROM categories WHERE category_id = $1', [categoryId]);
  const projResult = await pool.query(`
    SELECT p.project_id, p.title, p.description, p.date, p.location, 
           o.organization_id, o.name AS organization_name
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE pc.category_id = $1
    ORDER BY p.date ASC;
  `, [categoryId]);
  return {
    category: catResult.rows[0],
    projects: projResult.rows
  };
};

export { getAllCategories, getCategoryDetails };
