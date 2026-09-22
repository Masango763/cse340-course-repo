import pool from '../../database/db.js';

export async function getUpcomingProjects() {
    try {
        const query = `
            SELECT p.project_id, p.title, p.date, 
                   o.id AS organization_id, 
                   o.organization_name 
            FROM projects p
            JOIN organizations o ON p.organization_id = o.id
            ORDER BY p.date ASC
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching upcoming projects:', error);
        throw error;
    }
}
