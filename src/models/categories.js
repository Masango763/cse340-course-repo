import db from '../config/database.js';

const getAllCategories = async () => {
  const query = `SELECT category_id, name FROM category ORDER BY name;`;
  const result = await db.query(query);
  return result.rows;
};

const getCategoryDetails = async (id) => {
  const query = `
    SELECT category_id, name
    FROM category
    WHERE category_id = $1;
  `;
  const result = await db.query(query, [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

export { getAllCategories, getCategoryDetails };
