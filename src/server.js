import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllOrganizations } from './models/organizations.js';
import { getAllProjects } from './models/projects.js';
import { getAllCategories } from './models/categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home | CSE 340' });
});

app.get('/organizations', async (req, res) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Our Partner Organizations', organizations });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Unable to load organizations.' });
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.render('projects', { title: 'Upcoming Service Projects', projects });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Unable to load projects.' });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Service Categories', categories });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Unable to load categories.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
