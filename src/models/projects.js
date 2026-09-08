import db from '../database/index.js';

export async function getAllProjects() {
  try {
    const data = await db.query(`
      SELECT 
        p.project_id,
        p.project_name,
        p.project_description,
        p.location,
        TO_CHAR(p.project_date, 'Mon DD, YYYY') AS formatted_date,
        c.category_name,
        o.organization_name 
      FROM project p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN organization o ON p.organization_id = o.organization_id
      ORDER BY p.project_date ASC
    `);
    return data.rows;
  } catch (error) {
    console.error('Error in getAllProjects:', error);
    return [];
  }
}

export async function getProjectsByCategoryId(categoryId) {
  try {
    const data = await db.query(`
      SELECT 
        p.project_id,
        p.project_name,
        p.project_description,
        p.location,
        TO_CHAR(p.project_date, 'Mon DD, YYYY') AS formatted_date,
        c.category_name,
        o.organization_name 
      FROM project p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN organization o ON p.organization_id = o.organization_id
      WHERE p.category_id = $1
      ORDER BY p.project_date ASC
    `, [categoryId]);
    return data.rows;
  } catch (error) {
    console.error('Error in getProjectsByCategoryId:', error);
    return [];
  }
}
