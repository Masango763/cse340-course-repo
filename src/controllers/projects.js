import { getUpcomingProjects, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    res.render('projects', { title: 'Upcoming Service Projects', projects });
  } catch (error) { next(error); }
};

const showProjectDetailsPage = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    if (!project) {
      const err = new Error('Project not found');
      err.status = 404;
      return next(err);
    }
    const categories = await getCategoriesByProjectId(projectId);
    res.render('project', { title: project.project_name, project, categories });
  } catch (error) { next(error); }
};

export { showProjectsPage, showProjectDetailsPage };
