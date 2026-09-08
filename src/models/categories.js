import db from '../database/index.js';

export async function getAllCategories() {
  try {
    const data = await db.query('SELECT * FROM category ORDER BY category_name ASC');
    return data.rows.length ? data.rows : getStaticCategories();
  } catch (error) {
    return getStaticCategories();
  }
}

function getStaticCategories() {
  return [
    { category_id: 1, category_name: 'Education' },
    { category_id: 2, category_name: 'Healthcare' },
    { category_id: 3, category_name: 'Environment' }
  ];
}
