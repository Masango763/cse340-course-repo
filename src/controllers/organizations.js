import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';

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
