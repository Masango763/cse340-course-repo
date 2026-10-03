import { Router } from 'express';
import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';
import { getAllProjects, getProjectById, getCategoriesForProject } from '../models/projects.js';
import { getAllCategories, getCategoryById } from '../models/categories.js';

const router = Router();

// Home
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// ==========================================
// ORGANIZATIONS ROUTES
// ==========================================
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
        
        let projects = [];
        try {
            projects = await getProjectsByOrganizationId(organization.id);
        } catch (e) {
            projects = [];
        }

        res.render('organizations/detail', { title: organization.name, organization, projects });
    } catch (err) { next(err); }
});

// ==========================================
// PROJECTS ROUTES
// ==========================================
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
        
        let categories = [];
        try {
            categories = await getCategoriesForProject(project.id);
        } catch (e) {
            categories = [];
        }

        res.render('projects/detail', { title: project.name, project, categories });
    } catch (err) { next(err); }
});

// ==========================================
// CATEGORIES ROUTES
// ==========================================
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

export default router;
