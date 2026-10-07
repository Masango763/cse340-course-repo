import pool from '../database/db.js';

export async function addVolunteer(userId, projectId) {
  const result = await pool.query(`
    INSERT INTO project_volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING
    RETURNING volunteer_id
  `, [userId, projectId]);

  return result.rowCount > 0;
}

export async function removeVolunteer(userId, projectId) {
  const result = await pool.query(`
    DELETE FROM project_volunteers
    WHERE user_id = $1 AND project_id = $2
  `, [userId, projectId]);

  return result.rowCount > 0;
}

export async function isUserVolunteering(userId, projectId) {
  const result = await pool.query(`
    SELECT 1
    FROM project_volunteers
    WHERE user_id = $1 AND project_id = $2
  `, [userId, projectId]);

  return result.rowCount > 0;
}

export async function getVolunteerCountForProject(projectId) {
  const result = await pool.query(`
    SELECT COUNT(*)::int AS total
    FROM project_volunteers
    WHERE project_id = $1
  `, [projectId]);

  return result.rows[0].total;
}

export async function getProjectsByVolunteer(userId) {
  const result = await pool.query(`
    SELECT
      p.*,
      o.name AS organization_name
    FROM project_volunteers pv
    JOIN projects p ON pv.project_id = p.id
    JOIN organizations o ON p.organization_id = o.id
    WHERE pv.user_id = $1
    ORDER BY p.due_date
  `, [userId]);

  return result.rows;
}
