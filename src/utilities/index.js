import { getAllCategories } from '../models/categories.js';

export async function getNav(req, res, next) {
  try {
    const categories = await getAllCategories();
    let nav = '<nav class="nav-links">';
    nav += '<a href="/">Home</a>';
    nav += '<a href="/organizations">Organizations</a>';
    nav += '<a href="/projects">Projects</a>';
    
    if (Array.isArray(categories) && categories.length > 0) {
      categories.forEach(cat => {
        nav += `<a href="/categories/${cat.category_id || cat.id}">${cat.category_name || cat.name}</a>`;
      });
    } else {
      nav += '<a href="/categories">Categories</a>';
    }
    
    nav += '</nav>';
    res.locals.nav = nav;
    next();
  } catch (error) {
    res.locals.nav = '<nav class="nav-links"><a href="/">Home</a><a href="/organizations">Organizations</a><a href="/projects">Projects</a><a href="/categories">Categories</a></nav>';
    next();
  }
}

export function handleErrors(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
