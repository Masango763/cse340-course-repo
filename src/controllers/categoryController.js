const { validationResult } = require('express-validator');
const categoryModel = require('../models/categoryModel');

async function showCategories(req, res) {
    try {
        const categories = await categoryModel.getAllCategories();
        res.render('categories', { title: 'Categories', categories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading categories');
    }
}

function showCreateCategoryForm(req, res) {
    res.render('new-category', { title: 'Create New Category', errors: [], name: '' });
}

async function processCreateCategory(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('new-category', {
            title: 'Create New Category',
            errors: errors.array(),
            name: req.body.name
        });
    }

    try {
        await categoryModel.createCategory(req.body.name);
        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating category');
    }
}

async function showEditCategoryForm(req, res) {
    try {
        const category = await categoryModel.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.render('edit-category', { title: 'Edit Category', errors: [], category });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading edit category form');
    }
}

async function processEditCategory(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('edit-category', {
            title: 'Edit Category',
            errors: errors.array(),
            category: { id: req.params.id, name: req.body.name }
        });
    }

    try {
        await categoryModel.updateCategory(req.params.id, req.body.name);
        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating category');
    }
}

module.exports = {
    showCategories,
    showCreateCategoryForm,
    processCreateCategory,
    showEditCategoryForm,
    processEditCategory
};
