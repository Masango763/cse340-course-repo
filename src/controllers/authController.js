const bcrypt = require('bcrypt');
const db = require('../models/db');

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        const query = `
            SELECT u.*, r.role_name 
            FROM users u 
            JOIN roles r ON u.role_id = r.role_id 
            WHERE u.email = $1
        `;
        const result = await db.query(query, [email]);
        const user = result.rows[0];

        // Verify password using bcrypt.compare
        if (user && (await bcrypt.compare(password, user.password_hash))) {
            req.session.user = {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role_name: user.role_name
            };
            return res.redirect('/dashboard');
        }

        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { title: 'Login Error' });
    }
}

async function getUsers(req, res) {
    try {
        const query = `
            SELECT u.name, u.email, r.role_name 
            FROM users u 
            JOIN roles r ON u.role_id = r.role_id
            ORDER BY u.user_id ASC
        `;
        const result = await db.query(query);
        res.render('users', { title: 'Registered Users', users: result.rows, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { title: 'Error Loading Users' });
    }
}

module.exports = { login, getUsers };
