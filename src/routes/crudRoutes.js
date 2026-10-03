import { Router } from 'express';
import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId, addOrganization, updateOrganization, deleteOrganization } from '../models/organizations.js';
import { getAllProjects, getProjectById, getCategoriesForProject, addProject, updateProject, deleteProject } from '../models/projects.js';
import { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory } from '../models/categories.js';

const router = Router();

// Middleware to check if user is admin for CRUD actions
function requireAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role_name === 'admin') {
        return next();
    }
    req.flash('error', 'You must be an administrator to perform this action.');
    return res.redirect('/login');
}

// Home
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// ==========================================
// ORGANIZATIONS (CRUD)
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
        const projects = await getProjectsByOrganizationId(organization.id).catch(() => []);
        res.render('organizations/detail', { title: organization.name, organization, projects });
    } catch (err) { next(err); }
});

// ==========================================
// PROJECTS (CRUD)
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
        const categories = await getCategoriesForProject(project.id).catch(() => []);
        res.render('projects/detail', { title: project.name, project, categories });
    } catch (err) { next(err); }
});

// ==========================================
// CATEGORIES (CRUD)
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
