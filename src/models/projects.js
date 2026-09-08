import db from '../database/index.js';

export async function getAllProjects() {
  try {
    const data = await db.query('SELECT * FROM project ORDER BY project_name ASC');
    return data.rows.length ? data.rows : getStaticProjects();
  } catch (error) {
    return getStaticProjects();
  }
}

function getStaticProjects() {
  return [
    { project_id: 1, project_name: 'Community Coding Lab' },
    { project_id: 2, project_name: 'Solar Panel Installation' }
  ];
}
