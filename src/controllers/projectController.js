import { getAllProjects } from '../models/projects.js';

export async function buildProjectsPage(req, res, next) {
  try {
    const projects = await getAllProjects();

    const formattedProjects = projects.map(project => ({
      ...project,
      formattedDate: new Date(project.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }));

    res.render('projects', {
      title: 'Service Projects',
      projects: formattedProjects
    });
  } catch (error) {
    next(error);
  }
}

// Alias export for static route compatibility
export const buildProjects = buildProjectsPage;
