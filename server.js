import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import staticRouter from './routes/static.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', staticRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
