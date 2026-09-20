const pool = require('../config/database'); // Adjust path to your db configuration if needed

async function updateProject(id, projectName, description, dueDate, organizationId) {
    const query = `
        UPDATE projects 
        SET name = $1, description = $2, due_date = $3, organization_id = $4 
        WHERE id = $5 
        RETURNING *;
    `;
    const values = [projectName, description, dueDate, organizationId, id];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
        throw new Error(`Project with ID ${id} not found for update.`);
    }
    return result.rows[0];
}

module.exports = {
    updateProject
};
