import pool from '../database/db.js';

export async function getAllOrganizations() {
  const result = await pool.query('SELECT * FROM organizations ORDER BY name');
  return result.rows;
}

export async function getOrganizationById(id) {
  const result = await pool.query('SELECT * FROM organizations WHERE id = $1', [id]);
  return result.rows[0];
}

export async function getProjectsByOrganizationId(orgId) {
  const result = await pool.query('SELECT * FROM projects WHERE organization_id = $1 ORDER BY due_date', [orgId]);
  return result.rows;
}
