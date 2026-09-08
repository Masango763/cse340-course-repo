import db from '../database/index.js';

export async function getAllCategories() {
  try {
    const data = await db.query('SELECT * FROM category ORDER BY category_name ASC');
    return data.rows;
  } catch (error) {
    console.error('Error in getAllCategories:', error);
    return [];
  }
}
