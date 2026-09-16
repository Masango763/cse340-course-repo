import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';

const showOrganizationsPage = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Partner Organizations', organizations });
  } catch (error) { next(error); }
};

const showOrganizationDetailsPage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await getOrganizationDetails(id);
    if (!data.organization) {
      const err = new Error('Organization not found');
      err.status = 404;
      return next(err);
    }
    res.render('organization', { title: data.organization.organization_name, organization: data.organization, projects: data.projects });
  } catch (error) { next(error); }
};

export { showOrganizationsPage, showOrganizationDetailsPage };
