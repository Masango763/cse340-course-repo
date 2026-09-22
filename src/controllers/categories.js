import { body, validationResult } from 'express-validator';
import {
    getAllCategories,
    getCategoryDetails,
    createCategory,
    updateCategory
} from '../models/categories.js';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
];

const showCategoriesPage = async (req, res) => {
    try {
        const categories = await getAllCategories();
        const title = 'Categories';
        res.render('categories/index', { title, categories });
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).render('index', { title: 'Error' });
    }
};

const showCategoryDetailsPage = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryDetails(categoryId);
        const title = category.name;
        res.render('categories/detail', { title, category });
    } catch (err) {
        console.error('Error fetching category details:', err);
        res.status(404).render('index', { title: 'Not Found' });
    }
};

const showNewCategoryForm = (req, res) => {
    const title = 'Add New Category';
    res.render('categories/new', { title });
};

const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect('/new-category');
    }
    const { name } = req.body;
    const category = await createCategory(name);
    req.flash('success', 'Category created successfully!');
    res.redirect(`/category/${category.category_id}`);
};

const showEditCategoryForm = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryDetails(categoryId);
        const title = 'Edit Category';
        res.render('categories/edit', { title, category });
    } catch (err) {
        console.error('Error loading edit form:', err);
        res.status(404).render('index', { title: 'Not Found' });
    }
};

const processEditCategoryForm = async (req, res) => {
    const results = validationResult(req);
    const categoryId = req.params.id;
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/edit-category/${categoryId}`);
    }
    const { name } = req.body;
    await updateCategory(categoryId, name);
    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};
