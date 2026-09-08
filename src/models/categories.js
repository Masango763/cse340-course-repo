import db from '../database/index.js';

export async function getAllCategories() {
  try {
    const data = await db.query('SELECT * FROM category ORDER BY category_name ASC');
    return data.rows.length ? data.rows : getStaticCategories();
  } catch (error) {
    return getStaticCategories();
  }
}

export async function getCategoryById(id) {
  try {
    const data = await db.query('SELECT * FROM category WHERE category_id = $1', [id]);
    if (data.rows.length) return data.rows[0];
  } catch (error) {
    console.warn(`Fallback active for category ID ${id}`);
  }
  return getStaticCategories().find(c => c.category_id === parseInt(id, 10));
}

function getStaticCategories() {
  return [
    { category_id: 1, category_name: 'Education', category_description: 'Technology initiatives supporting schools, literacy, and digital learning.' },
    { category_id: 2, category_name: 'Healthcare', category_description: 'Digital solutions for community health centers and patient wellbeing.' },
    { category_id: 3, category_name: 'Environment', category_description: 'Tech tools driving sustainability, conservation, and eco-friendly practice.' }
  ];
}
