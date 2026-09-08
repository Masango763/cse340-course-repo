import db from '../database/index.js';

export async function getAllProjects() {
  try {
    const data = await db.query(`
      SELECT p.*, c.category_name, o.organization_name 
      FROM project p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN organization o ON p.organization_id = o.organization_id
      ORDER BY p.project_name ASC
    `);
    return data.rows.length ? data.rows : getStaticProjects();
  } catch (error) {
    return getStaticProjects();
  }
}

export async function getProjectsByCategoryId(categoryId) {
  try {
    const data = await db.query(`
      SELECT p.*, c.category_name, o.organization_name 
      FROM project p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN organization o ON p.organization_id = o.organization_id
      WHERE p.category_id = $1
      ORDER BY p.project_name ASC
    `, [categoryId]);
    return data.rows.length ? data.rows : getStaticProjects().filter(p => p.category_id === parseInt(categoryId, 10));
  } catch (error) {
    return getStaticProjects().filter(p => p.category_id === parseInt(categoryId, 10));
  }
}

function getStaticProjects() {
  return [
    { project_id: 1, project_name: 'Community Coding Lab', project_description: 'Setting up interactive coding workshops for underprivileged students.', category_id: 1, category_name: 'Education', organization_name: 'Tech for Good' },
    { project_id: 2, project_name: 'Solar Power Tracker App', project_description: 'Building IoT dashboards to monitor solar installations in rural clinics.', category_id: 3, category_name: 'Environment', organization_name: 'Green Earth Initiative' },
    { project_id: 3, project_name: 'Clinic Appointment Portal', project_description: 'Developing a web portal for scheduling local patient appointments.', category_id: 2, category_name: 'Healthcare', organization_name: 'Health Tech Alliance' },
    { project_id: 4, project_name: 'E-Waste Recycling Hub', project_description: 'Creating an online platform for tracking electronic waste collection.', category_id: 3, category_name: 'Environment', organization_name: 'Green Earth Initiative' }
  ];
}
