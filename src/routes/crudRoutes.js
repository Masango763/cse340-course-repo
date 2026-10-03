import { Router } from 'express';
import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';
import { getAllProjects, getProjectById, getCategoriesForProject } from '../models/projects.js';
import { getAllCategories, getCategoryById, getProjectsByCategory } from '../models/categories.js';

const router = Router();

// Home
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Organizations
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
        const projects = await getProjectsByOrganizationId(organization.id);
        res.render('organizations/detail', { title: organization.name, organization, projects });
    } catch (err) { next(err); }
});

// Projects
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
        const categories = await getCategoriesForProject(project.id);
        res.render('projects/detail', { title: project.name, project, categories });
    } catch (err) { next(err); }
});

// Categories
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
        
        // Fetch related projects for this category if your model supports it
        let projects = [];
        try {
            if (typeof getProjectsByCategory === 'function') {
                projects = await getProjectsByCategory(category.id);
            }
        } catch (e) {
            // Fallback if model function name differs
        }

        res.render('categories/detail', { title: category.name, category, projects });
    } catch (err) { next(err); }
});

export default router;
