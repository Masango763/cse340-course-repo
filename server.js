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

// Static Assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(process.cwd(), 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(process.cwd(), 'views')
]);

// Dynamic Navigation Middleware
app.use(getNav);

// Application Routes
app.use('/', staticRoutes);

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
});

// Global Express Error Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack || err);
  res.status(err.status || 500).render('error', {
    title: '500 - Server Error',
    message: err.message || 'Server error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
