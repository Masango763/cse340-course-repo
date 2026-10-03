import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import 'dotenv/config';

import router from './src/routes.js';
import { runMigrations } from './src/database/migrate.js';

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

app.use((req, res, next) => {
    res.locals.isLoggedIn = !!(req.session && req.session.user);
    res.locals.user = (req.session && req.session.user) || null;
    next();
});

// Mount the single router (NO app.get or app.post definitions here!)
app.use('/', router);

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

runMigrations().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
