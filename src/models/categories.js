import pool from '../database/db.js';

// Get all categories
const getAllCategories = async () => {
  const result = await pool.query('SELECT category_id, name FROM categories ORDER BY name ASC');
  return result.rows;
};

// Get a single category by ID
const getCategoryById = async (categoryId) => {
  const result = await pool.query('SELECT category_id, name FROM categories WHERE category_id = $1', [categoryId]);
  return result.rows[0];
};

// Get all service projects belonging to a specific category
const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT p.project_id, p.title AS project_name, p.date, p.location, p.description
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date ASC;
  `;
  const result = await pool.query(query, [categoryId]);
  return result.rows;
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId };
