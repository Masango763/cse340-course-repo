import pool from '../database/db.js';

export const getUpcomingProjects = async (limit = 5) => {
    try {
        const query = `
            SELECT p.*, 
                   COALESCE(p.name, p.title) AS title, 
                   COALESCE(p.due_date, p.date) AS date, 
                   o.name AS organization_name
            FROM projects p
            JOIN organizations o ON (p.organization_id = o.id OR p.org_id = o.id OR p.organization_id = o.organization_id)
            ORDER BY COALESCE(p.due_date, p.date) ASC
            LIMIT $1;
        `;
        const result = await pool.query(query, [limit]);
        return result.rows;
    } catch (err) {
        console.error('Error in getUpcomingProjects model:', err);
        throw err;
    }
};

export const getProjectDetails = async (id) => {
    try {
        const query = `
            SELECT p.*, 
                   COALESCE(p.name, p.title) AS title, 
                   COALESCE(p.due_date, p.date) AS date, 
                   o.name AS organization_name
            FROM projects p
            LEFT JOIN organizations o ON (p.organization_id = o.id OR p.org_id = o.id OR p.organization_id = o.organization_id)
            WHERE p.id = $1 OR p.project_id = $1;
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error in getProjectDetails model:', err);
        return null;
    }
};

export const getCategoriesByProjectId = async (projectId) => {
    try {
        const query = `
            SELECT c.*
            FROM categories c
            JOIN project_categories pc ON (c.id = pc.category_id OR c.category_id = pc.category_id)
            WHERE pc.project_id = $1
            ORDER BY c.name ASC;
        `;
        const result = await pool.query(query, [projectId]);
        return result.rows;
    } catch (err) {
        console.error('Error in getCategoriesByProjectId model:', err);
        return [];
    }
};
