const bcrypt = require('bcrypt');
const { createUser, authenticateUser, getAllUsers } = require('../models/users.js');

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }
        next();
    };
};

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        await createUser(name, email, passwordHash);

        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'Registration failed. Email may already be in use.');
        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.user = user;
            req.flash('success', 'Login successful!');
            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login.');
        res.redirect('/login');
    }
};

const processLogout = (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }
    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};

const showDashboard = (req, res) => {
    const user = req.session.user;
    res.render('dashboard', { 
        title: 'Dashboard',
        name: user.name,
        email: user.email,
        role: user.role_name
    });
};

const showUsersList = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.render('admin/users', { 
            title: 'Manage Users', 
            users 
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    requireLogin,
    requireRole,
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    showDashboard,
    showUsersList
};
