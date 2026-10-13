import pool from '../database/db.js';

export const getAllOrganizations = async () => {
  const result = await pool.query('SELECT * FROM organizations ORDER BY name');
  return result.rows;
}

export const getOrganizationById = async (id) => {
  const result = await pool.query('SELECT * FROM organizations WHERE id = $1', [id]);
  return result.rows[0];
}

export const getProjectsByOrganizationId = async (orgId) => {
  const result = await pool.query(
    'SELECT * FROM projects WHERE organization_id = $1 ORDER BY due_date',
    [orgId]
  );
  return result.rows;
}

export const createOrganization = async ({ name, description, email, logo_url }) => {
  const result = await pool.query(
    `INSERT INTO organizations (name, description, email, logo_url) VALUES ($1, $2, $3, $4) RETURNING id`,
    [name, description, email, logo_url || null]
  );
  return result.rows[0].id;
}

export const updateOrganization = async (id, { name, description, email, logo_url }) => {
  const result = await pool.query(
    `UPDATE organizations SET name = $1, description = $2, email = $3, logo_url = $4 WHERE id = $5`,
    [name, description, email, logo_url || null, id]
  );
  if (result.rowCount === 0) {
    throw new Error('Organization not found');
  }
}
