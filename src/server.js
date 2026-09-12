import { buildProjectsPage } from "./controllers/projectController.js";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import staticRoutes from './routes/static.js';
import { getNav } from './utilities/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(getNav);
app.use('/', staticRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).render('error', {
    title: '500 - Server Error',
    message: err.message || 'Server error occurred.'
  });
});

app.get("/projects", buildProjectsPage);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
