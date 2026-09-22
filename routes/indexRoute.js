import express from 'express';
import pool from '../database/db.js';

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
            JOIN organizations o ON p.organization_id = o.id 
            ORDER BY p.due_date
        `);
        res.render('projects/index', { title: 'Service Projects', projects: result.rows });
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).render('index', { title: 'Error' });
    }
});

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
