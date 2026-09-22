import { Router } from 'express';
import { getUpcomingProjects, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';
import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';
import { showCategories, showAddCategoryForm, addCategory, showEditCategoryForm, updateCategoryHandler } from '../controllers/categoryController.js';

const router = Router();

// Home page
router.get('/', async (req, res) => {
    try {
        const projects = await getUpcomingProjects();
        res.render('index', { projects });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Organizations list page
router.get('/organizations', async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { organizations });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Single Organization detail page
router.get('/organization/:id', async (req, res) => {
    try {
        const organization = await getOrganizationById(req.params.id);
        const projects = await getProjectsByOrganizationId(req.params.id);
        res.render('organization', { organization, projects });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Single Project detail page
router.get('/project/:id', async (req, res) => {
    try {
        const project = await getProjectDetails(req.params.id);
        const categories = await getCategoriesByProjectId(req.params.id);
        res.render('project', { project, categories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Category routes for Week 04 Assignment
router.get('/categories', showCategories);
router.get('/categories/add', showAddCategoryForm);
router.post('/categories/add', addCategory);
router.get('/categories/edit/:id', showEditCategoryForm);
router.post('/categories/edit/:id', updateCategoryHandler);

export default router;
