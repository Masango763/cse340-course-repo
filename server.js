import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import router from './src/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'cse340-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// Global template variables middleware
app.use((req, res, next) => {
    res.locals.isLoggedIn = false;
    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }
    res.locals.user = req.session.user || null;
    res.locals.NODE_ENV = NODE_ENV;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Mount Routes
app.use('/', router);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
