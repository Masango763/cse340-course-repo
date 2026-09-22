import express from 'express';
import pool from '../database/db.js';
import { showProjectsPage, showProjectDetailsPage } from '../controllers/projects.js';

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

router.get('/projects', showProjectsPage);
router.get('/projects/:id', showProjectDetailsPage);

router.get('/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY name');
        res.render('categories/index', { title: 'Service Project Categories', categories: result.rows });
    } catch (err) {
        console.error('Error fetching categories:', err);
        const categories = [
            { name: 'Environmental', description: 'Promoting sustainability and green tech.' },
            { name: 'Educational', description: 'Teaching youth and adult digital literacy.' },
            { name: 'Community Service', description: 'Local initiatives and civic development.' },
            { name: 'Health and Wellness', description: 'Expanding healthcare and wellness access.' }
        ];
        res.render('categories/index', { title: 'Service Project Categories', categories });
    }
});

export default router;
