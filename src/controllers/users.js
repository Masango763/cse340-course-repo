import bcrypt from 'bcrypt';
import db from '../database/db.js';
import { requireLogin, requireRole } from '../middleware/authMiddleware.js';

export { requireLogin, requireRole };

export async function showLoginForm(req, res) {
    res.render('login', { title: 'Login' });
}

export async function processLoginForm(req, res) {
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
        res.status(500).render('500', { title: 'Login Error', error: null });
    }
}

export const login = processLoginForm;

export async function processLogout(req, res) {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

export const logout = processLogout;

export async function showRegisterForm(req, res) {
    res.render('register', { title: 'Register' });
}

export async function register(req, res) {
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
        res.status(500).render('500', { title: 'Registration Error', error: null });
    }
}

export const showUserRegistrationForm = showRegisterForm;
export const processUserRegistrationForm = register;

export async function getUsers(req, res) {
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
        res.status(500).render('500', { title: 'Error Loading Users', error: null });
    }
}

export async function showDashboard(req, res) {
    res.render('dashboard', { 
        title: 'Dashboard', 
        user: req.session.user,
        name: req.session.user?.name,
        email: req.session.user?.email 
    });
}

export async function showUsersPage(req, res) {
    return getUsers(req, res);
}
