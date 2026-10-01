import { requireRole } from '../middleware/authMiddleware.js';
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

router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProject);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategory);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategory);

router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganization);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

export default router;
