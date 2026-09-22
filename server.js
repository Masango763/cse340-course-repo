import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Import your routes here (adjust path if needed, e.g., './src/routes/index.js' or './routes/index.js')
import indexRouter from './routes/index.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'src/views')
]);

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);

// Global Error Handler to display exact crash reason in browser
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`
        <h1>Internal Server Error (Detailed Crash Report)</h1>
        <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px; color: #d9534f; font-weight: bold;">${err.stack}</pre>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
