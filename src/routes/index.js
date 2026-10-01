const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/users');
const { requireLogin, requireRole } = require('../middleware/authMiddleware');

// Authentication endpoints
router.post('/register', userController.register);
router.post('/login', authController.login);

// Protected Route: Only accessible by admin users using requireLogin and requireRole factory
router.get('/users', requireLogin, requireRole('admin'), authController.getUsers);

// Protected Dashboard Route
router.get('/dashboard', requireLogin, (req, res) => {
    res.render('dashboard', { title: 'Dashboard', user: req.session.user });
});

module.exports = router;
