const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');

// Validation rules for categories
const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required.')
        .isLength({ min: 3 }).withMessage('Category name must be at least 3 characters long.')
        .isLength({ max: 100 }).withMessage('Category name cannot exceed 100 characters.')
];

router.get('/categories', categoryController.showCategories);
router.get('/new-category', categoryController.showCreateCategoryForm);
router.post('/new-category', categoryValidation, categoryController.processCreateCategory);

router.get('/edit-category/:id', categoryController.showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, categoryController.processEditCategory);

module.exports = router;
