import { getAllCategories, getCategoryById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

export async function buildCategories(req, res) {
  const categories = await getAllCategories();
  res.render('categories', { 
    title: 'Service Categories', 
    categories 
  });
}

export async function buildCategoryDetail(req, res, next) {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  
  if (!category) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  const projects = await getProjectsByCategoryId(categoryId);
  res.render('category-detail', {
    title: `${category.category_name} | CSE 340`,
    category,
    projects
  });
}
