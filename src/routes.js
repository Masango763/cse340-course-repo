import express from 'express';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';

const router = express.Router();

// Home / Root Route
router.get('/', showProjectsPage);

// Categories Routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Organizations Routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// Projects Routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

export default router;
