import { getUpcomingProjects } from '../models/projects.js';

export async function buildProjectsPage(req, res, next) {
  try {
    const projects = await getUpcomingProjects(10);

    res.render('projects', {
      title: 'Upcoming Projects',
      projects
    });
  } catch (error) {
    next(error);
  }
}

export const buildProjects = buildProjectsPage;
