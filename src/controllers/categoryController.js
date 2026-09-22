import { getAllCategories, getCategoryById, createCategory, updateCategory } from '../models/categories.js';

export async function showCategories(req, res) {
    try {
        const categories = await getAllCategories();
        res.render('categories', { categories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function showAddCategoryForm(req, res) {
    res.render('new-category');
}

export async function addCategory(req, res) {
    try {
        const { name } = req.body;
        await createCategory(name);
        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function showEditCategoryForm(req, res) {
    try {
        const category = await getCategoryById(req.params.id);
        res.render('edit-category', { category });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function updateCategoryHandler(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await updateCategory(id, name);
        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
