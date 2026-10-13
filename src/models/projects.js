import pool from '../database/db.js';

export const getAllProjects = async () => {
  const result = await pool.query(`
    SELECT
      p.*,
      o.name AS organization_name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.id
    ORDER BY p.due_date
  `);

  return result.rows;
}

export const getProjectById = async (id) => {
  const result = await pool.query(`
    SELECT
      p.*,
      o.name AS organization_name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.id
    WHERE p.id = $1
  `, [id]);

  return result.rows[0];
}

export const createProject = async ({
  name,
  description,
  due_date,
  organization_id
}) => {
  const result = await pool.query(
    `INSERT INTO projects
      (name, description, due_date, organization_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [
      name,
      description,
      due_date,
      organization_id
    ]
  );

  return result.rows[0].id;
}

export const updateProject = async (
  id,
  {
    name,
    description,
    due_date,
    organization_id
  }
) => {
  const result = await pool.query(
    `UPDATE projects
     SET name = $1,
         description = $2,
         due_date = $3,
         organization_id = $4
     WHERE id = $5`,
    [
      name,
      description,
      due_date,
      organization_id,
      id
    ]
  );

  if (result.rowCount === 0) {
    throw new Error('Project not found');
  }
}

export const getCategoriesForProject = async (
  projectId
) => {
  const result = await pool.query(`
    SELECT c.*
    FROM categories c
    JOIN project_categories pc
      ON c.id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name
  `, [projectId]);

  return result.rows;
}

export const setProjectCategories = async (projectId, categoryIds) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM project_categories WHERE project_id = $1', [projectId]);
    for (const categoryId of categoryIds) {
      await client.query(
        'INSERT INTO project_categories (project_id, category_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [projectId, categoryId]
      );
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
