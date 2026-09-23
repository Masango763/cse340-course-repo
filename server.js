import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import 'dotenv/config';

import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from './src/models/organizations.js';
import { getAllProjects, getProjectById, getCategoriesForProject } from './src/models/projects.js';
import { getAllCategories, getCategoryById } from './src/models/categories.js';
import crudRouter from './src/routes/crudRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'cse340-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use((req, res, next) => {
    req.flash = (type, msg) => {
        if (!req.session.flash) req.session.flash = {};
        if (!req.session.flash[type]) req.session.flash[type] = [];
        req.session.flash[type].push(msg);
    };
    res.locals.flash = req.session.flash || {};
    delete req.session.flash;
    next();
});

// Home
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Organizations
app.get('/organizations', async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations/index', { title: 'Partner Organizations', organizations });
    } catch (err) { next(err); }
});

app.get('/organization/:id', async (req, res, next) => {
    try {
        const organization = await getOrganizationById(req.params.id);
        if (!organization) return res.status(404).render('404', { title: 'Not Found' });
        const projects = await getProjectsByOrganizationId(organization.id);
        res.render('organizations/detail', { title: organization.name, organization, projects });
    } catch (err) { next(err); }
});

// Projects
app.get('/projects', async (req, res, next) => {
    try {
        const projects = await getAllProjects();
        res.render('projects/index', { title: 'Service Projects', projects });
    } catch (err) { next(err); }
});

app.get('/project/:id', async (req, res, next) => {
    try {
        const project = await getProjectById(req.params.id);
        if (!project) return res.status(404).render('404', { title: 'Not Found' });
        const categories = await getCategoriesForProject(project.id);
        res.render('projects/detail', { title: project.name, project, categories });
    } catch (err) { next(err); }
});

// Categories
app.get('/categories', async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.render('categories/index', { title: 'Service Project Categories', categories });
    } catch (err) { next(err); }
});

app.get('/category/:id', async (req, res, next) => {
    try {
        const category = await getCategoryById(req.params.id);
        if (!category) return res.status(404).render('404', { title: 'Not Found' });
        res.render('categories/detail', { title: category.name, category });
    } catch (err) { next(err); }
});

// Insert/update routes (Week 04) live in their own router
app.use('/', crudRouter);

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', {
        title: 'Server Error',
        error: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
