import db from '../database/index.js';

export async function getAllOrganizations() {
  try {
    const data = await db.query('SELECT * FROM organization ORDER BY organization_name ASC');
    return data.rows.length ? data.rows : getStaticOrganizations();
  } catch (error) {
    return getStaticOrganizations();
  }
}

function getStaticOrganizations() {
  return [
    { organization_id: 1, organization_name: 'Tech for Good' },
    { organization_id: 2, organization_name: 'Green Earth Initiative' }
  ];
}
