import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

let getAllOrganizations = async () => [];
let getAllProjects = async () => [];
let getAllCategories = async () => [];

try {
  const mod = await import('./models/organizations.js').catch(() => import('../models/organizations.js'));
  getAllOrganizations = mod.getAllOrganizations || mod.default || getAllOrganizations;
} catch (e) { console.warn('Organizations model fallback applied'); }

try {
  const mod = await import('./models/projects.js').catch(() => import('../models/projects.js'));
  getAllProjects = mod.getAllProjects || mod.default || getAllProjects;
} catch (e) { console.warn('Projects model fallback applied'); }

try {
  const mod = await import('./models/categories.js').catch(() => import('../models/categories.js'));
  getAllCategories = mod.getAllCategories || mod.default || getAllCategories;
} catch (e) { console.warn('Categories model fallback applied'); }

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(process.cwd(), 'public')));

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(process.cwd(), 'views')
]);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home | CSE 340' });
});

app.get('/organizations', async (req, res) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Our Partner Organizations', organizations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to load organizations.');
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.render('projects', { title: 'Upcoming Service Projects', projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to load projects.');
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Service Categories', categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to load categories.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
