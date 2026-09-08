import { getAllCategories } from '../models/categories.js';

export async function buildCategories(req, res) {
  const categories = await getAllCategories();
  res.render('categories', { 
    title: 'Service Categories', 
    categories 
  });
}
