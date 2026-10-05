import { Router } from 'express';

import {
    showNewOrganizationForm, processNewOrganization,
    showOrganizationsPage, showOrganizationDetailsPage,
    showEditOrganizationForm, processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';
import {
    showNewProjectForm, processNewProject,
    showProjectsPage, showProjectDetailsPage,
    showEditProjectForm, processEditProjectForm,
    showAssignCategoriesForm, processAssignCategories,
    projectValidation
} from './controllers/projects.js';
import {
    showNewCategoryForm, processNewCategory,
    showCategoriesPage, showCategoryDetailsPage,
    showEditCategoryForm, processEditCategory,
    categoryValidation
} from './controllers/categories.js';
import {
    showUserRegistrationForm, processUserRegistrationForm,
    showLoginForm, processLoginForm, processLogout,
    requireLogin, requireRole, showDashboard, showUsersPage
} from './controllers/users.js';


const router = Router();

// Home
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Auth
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireLogin, requireRole('admin'), showUsersPage);

// Organizations
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', requireLogin, requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireLogin, requireRole('admin'), organizationValidation, processNewOrganization);
router.get('/edit-organization/:id', requireLogin, requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireLogin, requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Projects
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/new-project', requireLogin, requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireLogin, requireRole('admin'), projectValidation, processNewProject);
router.get('/edit-project/:id', requireLogin, requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireLogin, requireRole('admin'), projectValidation, processEditProjectForm);
router.get('/assign-categories/:id', requireLogin, requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:id', requireLogin, requireRole('admin'), processAssignCategories);

// Categories
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-category', requireLogin, requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireLogin, requireRole('admin'), categoryValidation, processNewCategory);
router.get('/edit-category/:id', requireLogin, requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireLogin, requireRole('admin'), categoryValidation, processEditCategory);

export default router;

// W06 Volunteering Routes
router.post("/projects/volunteer", requireLogin, projectController.registerVolunteer);
router.post("/projects/unvolunteer", requireLogin, projectController.unregisterVolunteer);
router.get("/account/volunteering", requireLogin, projectController.buildVolunteeringDashboard);
