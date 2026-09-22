import pool from '../database/db.js';

export const getUpcomingProjects = async () => {
    try {
        const result = await pool.query(`
            SELECT p.id, p.name, p.description, p.due_date, o.name AS organization_name 
            FROM projects p 
            JOIN organizations o ON p.org_id = o.id 
            ORDER BY p.due_date
        `);
        return result.rows;
    } catch (err) {
        console.error('Error in getUpcomingProjects model:', err);
        throw err;
    }
};
