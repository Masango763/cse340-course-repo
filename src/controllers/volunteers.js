import { getProjectById } from '../models/projects.js';
import { addVolunteer, removeVolunteer } from '../models/volunteers.js';

async function findProject(req) {
  const projectId = Number(req.body.project_id);
  return Number.isInteger(projectId) ? await getProjectById(projectId) : null;
}

export async function processVolunteer(req, res, next) {
  try {
    const project = await findProject(req);
    if (!project) {
      return res.status(404).render('404', { title: 'Not Found' });
    }

    const added = await addVolunteer(req.session.user.user_id, project.id);

    if (added) {
      req.flash('success', 'You are now volunteering for this project.');
    } else {
      req.flash('error', 'You are already volunteering for this project.');
    }

    res.redirect(`/project/${project.id}`);
  } catch (err) {
    next(err);
  }
}

export async function processUnvolunteer(req, res, next) {
  try {
    const project = await findProject(req);
    if (!project) {
      return res.status(404).render('404', { title: 'Not Found' });
    }

    const removed = await removeVolunteer(req.session.user.user_id, project.id);

    if (removed) {
      req.flash('success', 'You are no longer volunteering for this project.');
    } else {
      req.flash('error', 'You were not volunteering for this project.');
    }

    const returnTo = req.body.return_to === 'dashboard'
      ? '/dashboard'
      : `/project/${project.id}`;

    res.redirect(returnTo);
  } catch (err) {
    next(err);
  }
}
