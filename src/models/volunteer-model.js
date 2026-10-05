const pool = require("../database/");

async function addVolunteer(account_id, project_id) {
    try {
        const sql = `INSERT INTO project_volunteers (account_id, project_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`;
        return await pool.query(sql, [account_id, project_id]);
    } catch (error) {
        return error.message;
    }
}

async function removeVolunteer(account_id, project_id) {
    try {
        const sql = `DELETE FROM project_volunteers WHERE account_id = $1 AND project_id = $2`;
        return await pool.query(sql, [account_id, project_id]);
    } catch (error) {
        return error.message;
    }
}

async function getVolunteeredProjectsByUserId(account_id) {
    try {
        const sql = `
            SELECT p.* FROM project p
            JOIN project_volunteers pv ON p.project_id = pv.project_id
            WHERE pv.account_id = $1
        `;
        const data = await pool.query(sql, [account_id]);
        return data.rows;
    } catch (error) {
        return error.message;
    }
}

async function checkUserVolunteered(account_id, project_id) {
    try {
        const sql = `SELECT * FROM project_volunteers WHERE account_id = $1 AND project_id = $2`;
        const data = await pool.query(sql, [account_id, project_id]);
        return data.rowCount > 0;
    } catch (error) {
        return error.message;
    }
}

module.exports = { addVolunteer, removeVolunteer, getVolunteeredProjectsByUserId, checkUserVolunteered };
