import { getAllOrganizations } from '../models/organizations.js';

export async function buildOrganizations(req, res) {
  const organizations = await getAllOrganizations();
  res.render('organizations', { title: 'Our Partner Organizations', organizations });
}
