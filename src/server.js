import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import indexRouter from '../routes/indexRoute.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', [
    path.join(rootDir, 'views'),
    path.join(rootDir, 'src/views')
]);

app.use(express.static(path.join(rootDir, 'public')));
app.use(express.static(path.join(rootDir, 'src/public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

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
