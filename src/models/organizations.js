import db from '../database/index.js';

export async function getAllOrganizations() {
  try {
    const data = await db.query('SELECT * FROM organization ORDER BY organization_name ASC');
    return data.rows;
  } catch (error) {
    console.warn('Falling back to static organization data');
    return [
      { organization_id: 1, organization_name: 'Tech for Good' },
      { organization_id: 2, organization_name: 'Green Earth Initiative' }
    ];
  }
}
