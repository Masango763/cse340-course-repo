import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import router from './routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', router);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render('500', { 
    title: 'Error', 
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
