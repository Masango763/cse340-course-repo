import pool from '../database/db.js';

const getAllOrganizations = async () => {
  const result = await pool.query('SELECT organization_id, name AS organization_name, description, contact_email, location FROM organizations ORDER BY name ASC');
  return result.rows;
};

const getOrganizationDetails = async (id) => {
  const orgResult = await pool.query('SELECT organization_id, name AS organization_name, description, contact_email, location FROM organizations WHERE organization_id = $1', [id]);
  const projResult = await pool.query('SELECT project_id, title AS project_name, date, location FROM projects WHERE organization_id = $1 ORDER BY date ASC', [id]);
  return {
    organization: orgResult.rows[0],
    projects: projResult.rows
  };
};

export { getAllOrganizations, getOrganizationDetails };
