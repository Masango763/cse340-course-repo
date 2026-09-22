import { getUpcomingProjects, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';

export const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects(5);
        res.render('projects/index', { title: 'Service Projects', projects });
    } catch (err) {
        console.error('Error rendering projects page:', err);
        res.status(500).render('index', { title: 'Error' });
    }
};

export const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);
        if (!project) {
            return res.status(404).render('index', { title: 'Project Not Found' });
        }
        const categories = await getCategoriesByProjectId(projectId);
        res.render('projects/index', { title: project.title || 'Project Details', project, categories });
    } catch (err) {
        console.error('Error rendering project details page:', err);
        res.status(500).render('index', { title: 'Error' });
    }
};
