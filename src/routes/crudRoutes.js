import { Router } from 'express';
import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';
import { getAllProjects, getProjectById, getCategoriesForProject } from '../models/projects.js';
import { getAllCategories, getCategoryById } from '../models/categories.js';
import { requireLogin, requireRole } from '../middleware/authMiddleware.js';

import {
    showNewOrganizationForm, processNewOrganization,
    showEditOrganizationForm, processEditOrganizationForm,
    organizationValidation
} from '../controllers/organizations.js';
import {
    showNewProjectForm, processNewProject,
    showEditProjectForm, processEditProjectForm,
    projectValidation
} from '../controllers/projects.js';
import {
    showNewCategoryForm, processNewCategory,
    showEditCategoryForm, processEditCategory,
    categoryValidation
} from '../controllers/categories.js';

const router = Router();

// Home
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Organizations Routes
router.get('/organizations', async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations/index', { title: 'Partner Organizations', organizations });
    } catch (err) { next(err); }
});

router.get('/organization/:id', async (req, res, next) => {
    try {
        const organization = await getOrganizationById(req.params.id);
        if (!organization) return res.status(404).render('404', { title: 'Not Found' });
        const projects = await getProjectsByOrganizationId(organization.id).catch(() => []);
        res.render('organizations/detail', { title: organization.name, organization, projects });
    } catch (err) { next(err); }
});

router.get('/new-organization', requireLogin, requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireLogin, requireRole('admin'), organizationValidation, processNewOrganization);
router.get('/edit-organization/:id', requireLogin, requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireLogin, requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Projects Routes
router.get('/projects', async (req, res, next) => {
    try {
        const projects = await getAllProjects();
        res.render('projects/index', { title: 'Service Projects', projects });
    } catch (err) { next(err); }
});

router.get('/project/:id', async (req, res, next) => {
    try {
        const project = await getProjectById(req.params.id);
        if (!project) return res.status(404).render('404', { title: 'Not Found' });
        const categories = await getCategoriesForProject(project.id).catch(() => []);
        res.render('projects/detail', { title: project.name, project, categories });
    } catch (err) { next(err); }
});

router.get('/new-project', requireLogin, requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireLogin, requireRole('admin'), projectValidation, processNewProject);
router.get('/edit-project/:id', requireLogin, requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireLogin, requireRole('admin'), projectValidation, processEditProjectForm);

// Categories Routes
router.get('/categories', async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.render('categories/index', { title: 'Service Project Categories', categories });
    } catch (err) { next(err); }
});

router.get('/category/:id', async (req, res, next) => {
    try {
        const category = await getCategoryById(req.params.id);
        if (!category) return res.status(404).render('404', { title: 'Not Found' });
        res.render('categories/detail', { title: category.name, category });
    } catch (err) { next(err); }
});

router.get('/new-category', requireLogin, requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireLogin, requireRole('admin'), categoryValidation, processNewCategory);
router.get('/edit-category/:id', requireLogin, requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireLogin, requireRole('admin'), categoryValidation, processEditCategory);

export default router;
