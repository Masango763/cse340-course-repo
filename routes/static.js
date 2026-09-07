import { Router } from 'express';

const router = Router();

const getHome = (req, res) => {
  res.render('index', { title: 'Home | CSE 340' });
};

const getCategories = (req, res) => {
  const projectCategories = [
    'Environmental',
    'Educational',
    'Community Service',
    'Health and Wellness'
  ];
  
  res.render('categories', {
    title: 'Categories | CSE 340',
    categories: projectCategories
  });
};

router.get('/', getHome);
router.get('/categories', getCategories);

export default router;
