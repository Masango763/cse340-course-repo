import express from 'express';
import {
  showNewProjectForm, processNewProject,
  showEditProjectForm, processEditProjectForm,
  projectValidation
} from '../controllers/projects.js';
import {
  showNewCategoryForm, processNewCategory,
  showEditCategoryForm, processEditCategory,
  categoryValidation
} from '../controllers/categories.js';
import {
  showNewOrganizationForm, processNewOrganization,
  showEditOrganizationForm, processEditOrganizationForm,
  organizationValidation
} from '../controllers/organizations.js';

const router = express.Router();

router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProject);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategory);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategory);

router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganization);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

export default router;
