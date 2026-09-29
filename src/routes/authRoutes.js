import express from 'express';
import {
    showUserRegistrationForm, processUserRegistrationForm,
    showLoginForm, processLoginForm, processLogout,
    requireLogin, requireRole, showDashboard, showUsersPage
} from '../controllers/users.js';

const router = express.Router();

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin'), showUsersPage);

export default router;
