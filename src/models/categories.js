import db from '../config/database.js';

// Retrieve all categories
const getCategories = async () => {
  const query = `
    SELECT category_id, name 
    FROM category 
    ORDER BY name ASC;
  `;
  const result = await db.query(query);
  return result.rows;
};

// Retrieve a single category by its ID
const getCategoryById = async (categoryId) => {
  const query = `
    SELECT category_id, name 
    FROM category 
    WHERE category_id = $1;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

// Retrieve all service projects for a given category
const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT 
      p.project_id, 
      p.project_name, 
      p.project_description, 
      p.project_date, 
      p.location,
      p.organization_id
    FROM project p
    WHERE p.category_id = $1
    ORDER BY p.project_date ASC;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows;
};

export { getCategories, getCategoryById, getProjectsByCategoryId };
