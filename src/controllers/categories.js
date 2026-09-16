import { getAllCategories, getCategoryDetails } from '../models/categories.js';

const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Service Categories', categories });
  } catch (err) {
    next(err);
  }
};

const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const data = await getCategoryDetails(categoryId);
    if (!data.category) {
      const error = new Error('Category not found');
      error.status = 404;
      return next(error);
    }
    res.render('category', { 
      title: data.category.name, 
      category: data.category, 
      projects: data.projects 
    });
  } catch (err) {
    next(err);
  }
};

export { showCategoriesPage, showCategoryDetailsPage };
