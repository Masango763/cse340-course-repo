import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

// Show main categories list page (/categories)
const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', {
      title: 'Service Categories',
      categories
    });
  } catch (error) {
    console.error('Error in showCategoriesPage:', error);
    next(error);
  }
};

// Show category details page with associated projects (/category/[id])
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
      title: category.name,
      category,
      projects
    });
  } catch (error) {
    console.error('Error in showCategoryDetailsPage:', error);
    next(error);
  }
};

export { showCategoriesPage, showCategoryDetailsPage };
