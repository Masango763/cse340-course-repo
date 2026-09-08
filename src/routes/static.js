import express from 'express';
import { handleErrors } from '../utilities/index.js';
import { buildHome } from '../controllers/baseController.js';
import { buildOrganizations } from '../controllers/orgController.js';
import { buildProjects } from '../controllers/projectController.js';
import { buildCategories, buildCategoryDetail } from '../controllers/categoryController.js';
import { triggerIntentionalError } from '../controllers/errorController.js';

const router = express.Router();

router.get('/', handleErrors(buildHome));
router.get('/organizations', handleErrors(buildOrganizations));
router.get('/projects', handleErrors(buildProjects));
router.get('/categories', handleErrors(buildCategories));
router.get('/categories/:id', handleErrors(buildCategoryDetail));

// Intentional Error Route for Week 2 Testing
router.get('/ierror', handleErrors(triggerIntentionalError));

export default router;
