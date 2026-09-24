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

export async function createOrganization({ name, description, location }) {
  const result = await pool.query(
    `INSERT INTO organizations (name, description, location) VALUES ($1, $2, $3) RETURNING id`,
    [name, description, location]
  );
  return result.rows[0].id;
}

export async function updateOrganization(id, { name, description, location }) {
  const result = await pool.query(
    `UPDATE organizations SET name = $1, description = $2, location = $3 WHERE id = $4`,
    [name, description, location, id]
  );
  if (result.rowCount === 0) {
    throw new Error('Organization not found');
  }
}
