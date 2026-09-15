import {
  getUpcomingProjects,
  getProjectDetails,
  getCategoriesByProjectId
} from '../models/projects.js';

const showProjectsPage = async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects(10);

    res.render('projects', {
      title: 'Upcoming Projects',
      projects
    });
  } catch (error) {
    next(error);
  }
};

const showProjectDetailsPage = async (req, res, next) => {
  try {
    const projectId = Number(req.params.id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      const error = new Error('Invalid project ID.');
      error.status = 400;
      return next(error);
    }

    const project = await getProjectDetails(projectId);

    if (!project) {
      const error = new Error('Project not found.');
      error.status = 404;
      return next(error);
    }

    const categories = await getCategoriesByProjectId(projectId);

    res.render('project-detail', {
      title: project.project_name,
      project,
      categories
    });
  } catch (error) {
    next(error);
  }
};

export { showProjectsPage, showProjectDetailsPage };
