import { body, validationResult } from 'express-validator';

import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  getCategoriesForProject,
  setProjectCategories
} from '../models/projects.js';

import {
  getAllOrganizations
} from '../models/organizations.js';

import {
  getAllCategories
} from '../models/categories.js';
import { isUserVolunteering, getVolunteerCountForProject } from '../models/volunteers.js';

export const projectValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Project name is required.')
    .isLength({ max: 255 })
    .withMessage('Project name is too long.'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required.'),

  body('due_date')
    .notEmpty()
    .withMessage('Due date is required.')
    .isISO8601()
    .withMessage('Enter a valid date.'),

  body('organization_id')
    .notEmpty()
    .withMessage('Please select an organization.')
    .isInt()
    .withMessage('Invalid organization.')
];

export async function showNewProjectForm(req, res, next) {
  try {
    const organizations =
      await getAllOrganizations();

    res.render('projects/new', {
      title: 'Add New Project',
      organizations,
      values: {}
    });
  } catch (err) {
    next(err);
  }
}

export async function processNewProject(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const organizations =
        await getAllOrganizations();

      return res.status(400).render(
        'projects/new',
        {
          title: 'Add New Project',
          organizations,
          values: req.body,
          errors: errors.array()
        }
      );
    }

    const {
      name,
      description,
      due_date,
      organization_id
    } = req.body;

    const projectId =
      await createProject({
        name,
        description,
        due_date,
        organization_id
      });

    req.flash(
      'success',
      'Project created successfully!'
    );

    res.redirect(`/project/${projectId}`);
  } catch (err) {
    next(err);
  }
}

export async function showEditProjectForm(
  req,
  res,
  next
) {
  try {
    const project =
      await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).render('404', {
        title: 'Not Found'
      });
    }

    const organizations =
      await getAllOrganizations();

    const allCategories =
      await getAllCategories();

    const assigned =
      await getCategoriesForProject(project.id);

    const assignedIds =
      assigned.map(c => c.id);

    const values = {
      ...project,
      due_date: project.due_date
        ? new Date(project.due_date)
            .toISOString()
            .slice(0, 10)
        : ''
    };

    res.render(
      'projects/update-project',
      {
        title: 'Edit Project',
        project,
        organizations,
        allCategories,
        assignedIds,
        values
      }
    );
  } catch (err) {
    next(err);
  }
}

export async function processEditProjectForm(
  req,
  res,
  next
) {
  try {
    const projectId =
      req.params.id;

    const errors =
      validationResult(req);

    const selectedIds = [
      ...new Set(
        []
          .concat(req.body.category_ids || [])
          .map(Number)
          .filter(Number.isInteger)
      )
    ];

    if (!errors.isEmpty()) {
      const organizations =
        await getAllOrganizations();

      const allCategories =
        await getAllCategories();

      return res.status(400).render(
        'projects/update-project',
        {
          title: 'Edit Project',
          project: {
            id: projectId
          },
          organizations,
          allCategories,
          assignedIds: selectedIds,
          values: req.body,
          errors: errors.array()
        }
      );
    }

    const {
      name,
      description,
      due_date,
      organization_id
    } = req.body;

    await updateProject(
      projectId,
      {
        name,
        description,
        due_date,
        organization_id
      }
    );

    await setProjectCategories(
      projectId,
      selectedIds
    );

    req.flash(
      'success',
      'Project updated successfully!'
    );

    res.redirect(`/project/${projectId}`);
  } catch (err) {
    next(err);
  }
}

export async function showProjectsPage(req, res, next) {
  try {
    const projects = await getAllProjects();
    res.render('projects/index', { title: 'Service Projects', projects });
  } catch (err) { next(err); }
}

export async function showProjectDetailsPage(req, res, next) {
  try {
    const project = await getProjectById(req.params.id);
    if (!project) return res.status(404).render('404', { title: 'Not Found' });
    const categories = await getCategoriesForProject(project.id);
    const volunteerCount = await getVolunteerCountForProject(project.id);
    const isVolunteering = req.session.user
      ? await isUserVolunteering(req.session.user.user_id, project.id)
      : false;
    res.render('projects/detail', {
      title: project.name,
      project,
      categories,
      volunteerCount,
      isVolunteering,
      user: req.session.user
    });
  } catch (err) { next(err); }
}

export async function showAssignCategoriesForm(req, res, next) {
  try {
    const project = await getProjectById(req.params.id);
    if (!project) return res.status(404).render('404', { title: 'Not Found' });
    const allCategories = await getAllCategories();
    const assigned = await getCategoriesForProject(project.id);
    res.render('projects/assign-categories', {
      title: 'Assign Categories',
      project,
      allCategories,
      assignedIds: assigned.map(c => c.id)
    });
  } catch (err) { next(err); }
}

export async function processAssignCategories(req, res, next) {
  try {
    const projectId = req.params.id;
    const project = await getProjectById(projectId);
    if (!project) return res.status(404).render('404', { title: 'Not Found' });
    const selectedIds = [
      ...new Set([].concat(req.body.category_ids || []).map(Number).filter(Number.isInteger))
    ];
    await setProjectCategories(projectId, selectedIds);
    req.flash('success', 'Project categories updated successfully!');
    res.redirect(`/project/${projectId}`);
  } catch (err) { next(err); }
}

