import express from 'express';
import pool from '../database/db.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from '../controllers/categories.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/organizations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM organizations ORDER BY name');
        res.render('organizations/index', { title: 'Organizations', organizations: result.rows });
    } catch (err) {
        console.error('Error fetching organizations:', err);
        res.status(500).render('index', { title: 'Error' });
    }
});

router.get('/projects', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.id, p.name, p.description, p.due_date, o.name AS organization_name 
            FROM projects p 
            JOIN organizations o ON p.org_id = o.id 
            ORDER BY p.due_date
        `);
        res.render('projects/index', { title: 'Service Projects', projects: result.rows });
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).render('index', { title: 'Error' });
    }
});

// Category Routes (Week 04 Deliverables)
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

export default router;
