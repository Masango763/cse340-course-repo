import { getUpcomingProjects } from '../models/projects.js';

export const showProjectsPage = async (req, res) => {
    try {
        const projects = await getUpcomingProjects();
        res.render('projects/index', { title: 'Service Projects', projects });
    } catch (err) {
        console.error('Error rendering projects page:', err);
        res.status(500).render('index', { title: 'Error' });
    }
};
