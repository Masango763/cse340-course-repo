import express from 'express';
import {
  showNewProjectForm, processNewProject,
  showEditProjectForm, processEditProject,
  projectValidation
} from '../controllers/projects.js';
import {
  showNewCategoryForm, processNewCategory,
  showEditCategoryForm, processEditCategory,
  categoryValidation
} from '../controllers/categories.js';

const router = express.Router();

router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProject);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProject);

router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategory);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategory);

export default router;
