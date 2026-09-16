import express from 'express';
// Import your controller functions here based on your project structure
// Example: import * as controller from './controllers/controller.js';

const router = express.Router();

// Redirect root URL to /projects so it doesn't show a 404
router.get('/', (req, res) => {
  res.redirect('/projects');
});

// Add your existing project, organization, and category routes below:
// router.get('/projects', controller.getProjects);
// router.get('/project/:id', controller.getProjectDetail);
// router.get('/organizations', controller.getOrganizations);
// router.get('/organization/:id', controller.getOrganizationDetail);
// router.get('/categories', controller.getCategories);
// router.get('/category/:id', controller.getCategoryDetail);

export default router;
