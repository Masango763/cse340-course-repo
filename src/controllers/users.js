const bcrypt = require('bcrypt');
const db = require('../models/db');

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (name, email, password_hash, role_id)
            VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = 'user'))
        `;
        await db.query(query, [name, email, hashedPassword]);

        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { title: 'Registration Error' });
    }
}

module.exports = { register };
