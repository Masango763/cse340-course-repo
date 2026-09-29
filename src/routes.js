const { Router } = require('express');
const { 
    showUserRegistrationForm, 
    processUserRegistrationForm, 
    showLoginForm, 
    processLoginForm, 
    processLogout, 
    showDashboard, 
    showUsersList,
    requireLogin, 
    requireRole 
} = require('./controllers/users.js');

const router = Router();

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);
router.get('/admin/users', requireLogin, requireRole('admin'), showUsersList);

module.exports = router;
