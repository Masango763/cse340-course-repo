import { getCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.render('categories', {
      title: 'Categories',
      categories
    });
  } catch (error) {
    console.error('Error in showCategoriesPage:', error);
    next(error);
  }
};

const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }

    const projects = await getProjectsByCategoryId(categoryId);

    res.render('category-detail', {
      title: `${category.name} Projects`,
      category,
      projects
    });
  } catch (error) {
    console.error('Error in showCategoryDetailsPage:', error);
    next(error);
  }
};

export { showCategoriesPage, showCategoryDetailsPage };
