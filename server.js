import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import staticRouter from './routes/static.js';

dotenv.config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const port = process.env.PORT || 5500;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/layout');

app.use(express.static(path.join(dirname, 'public')));
app.use('/', staticRouter);

app.listen(port, () => {
  console.log(`Server executing on http://localhost:${port}`);
});
