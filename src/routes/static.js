import express from 'express';
import { handleErrors } from '../utilities/index.js';
import { buildHome } from '../controllers/baseController.js';
import { buildOrganizations } from '../controllers/orgController.js';
import { buildProjects } from '../controllers/projectController.js';
import { buildCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', handleErrors(buildHome));
router.get('/organizations', handleErrors(buildOrganizations));
router.get('/projects', handleErrors(buildProjects));
router.get('/categories', handleErrors(buildCategories));

export default router;
