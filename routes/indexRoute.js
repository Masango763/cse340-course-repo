import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/organizations', (req, res) => {
    res.render('organizations/index', { title: 'Organizations' });
});

router.get('/projects', (req, res) => {
    res.render('projects/index', { title: 'Service Projects' });
});

router.get('/categories', (req, res) => {
    const categories = [
        { name: 'Environmental', description: 'Promoting sustainability and green tech.' },
        { name: 'Educational', description: 'Teaching youth and adult digital literacy.' },
        { name: 'Community Service', description: 'Local initiatives and civic development.' },
        { name: 'Health and Wellness', description: 'Expanding healthcare and wellness access.' }
    ];
    res.render('categories/index', { title: 'Service Project Categories', categories });
});

export default router;
