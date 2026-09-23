import { body, validationResult } from 'express-validator';
import { getCategoryById, createCategory, updateCategory } from '../models/categories.js';

export const categoryValidation = [
  body('name').trim().notEmpty().withMessage('Category name is required.')
    .isLength({ min: 3, max: 100 }).withMessage('Category name must be 3-100 characters.')
];

export async function showNewCategoryForm(req, res) {
  res.render('categories/new', { title: 'Add New Category', values: {} });
}

export async function processNewCategory(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('categories/new', { title: 'Add New Category', values: req.body, errors: errors.array() });
    }
    const id = await createCategory(req.body.name.trim());
    req.flash('success', 'Category created successfully!');
    res.redirect(`/category/${id}`);
  } catch (err) { next(err); }
}

export async function showEditCategoryForm(req, res, next) {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).render('404', { title: 'Not Found' });
    res.render('categories/edit', { title: 'Edit Category', category, values: category });
  } catch (err) { next(err); }
}

export async function processEditCategory(req, res, next) {
  try {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('categories/edit', {
        title: 'Edit Category', category: { id, name: req.body.name }, values: req.body, errors: errors.array()
      });
    }
    await updateCategory(id, req.body.name.trim());
    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${id}`);
  } catch (err) { next(err); }
}
