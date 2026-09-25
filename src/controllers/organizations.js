import { body, validationResult } from 'express-validator';
import {
  getAllOrganizations, getOrganizationById, getProjectsByOrganizationId,
  createOrganization, updateOrganization
} from '../models/organizations.js';

export const organizationValidation = [
  body('name').trim().notEmpty().withMessage('Organization name is required.')
    .isLength({ max: 255 }).withMessage('Organization name is too long.'),
  body('description').trim().notEmpty().withMessage('Description is required.'),
  body('email').trim().notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Must be a valid email address.'),
  body('logo_url').optional({ checkFalsy: true }).trim()
    .isURL({ protocols: ['https'], require_protocol: true }).withMessage('Logo address must be a valid HTTPS URL.')
];

export async function showOrganizationsPage(req, res, next) {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations/index', { title: 'Partner Organizations', organizations });
  } catch (err) { next(err); }
}

export async function showOrganizationDetailsPage(req, res, next) {
  try {
    const organization = await getOrganizationById(req.params.id);
    if (!organization) return res.status(404).render('404', { title: 'Not Found' });
    const projects = await getProjectsByOrganizationId(organization.id);
    res.render('organizations/detail', { title: organization.name, organization, projects });
  } catch (err) { next(err); }
}

export async function showNewOrganizationForm(req, res) {
  res.render('organizations/new', { title: 'Add New Organization', values: {} });
}

export async function processNewOrganization(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('organizations/new', {
        title: 'Add New Organization', values: req.body, errors: errors.array()
      });
    }
    const { name, description, email } = req.body;
    const orgId = await createOrganization({ name, description, email });
    req.flash('success', 'Organization created successfully!');
    res.redirect(`/organization/${orgId}`);
  } catch (err) { next(err); }
}

export async function showEditOrganizationForm(req, res, next) {
  try {
    const organization = await getOrganizationById(req.params.id);
    if (!organization) return res.status(404).render('404', { title: 'Not Found' });
    res.render('organizations/update-organization', {
      title: 'Edit Organization', organization, values: organization
    });
  } catch (err) { next(err); }
}

export async function processEditOrganizationForm(req, res, next) {
  try {
    const orgId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('organizations/update-organization', {
        title: 'Edit Organization',
        organization: { id: orgId },
        values: req.body, errors: errors.array()
      });
    }
    const { name, description, email, logo_url } = req.body;
    await updateOrganization(orgId, { name, description, email, logo_url });
    req.flash('success', 'Organization updated successfully!');
    res.redirect(`/organization/${orgId}`);
  } catch (err) { next(err); }
}
