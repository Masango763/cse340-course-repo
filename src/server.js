import express from 'express';
import session from 'express-session';
import flash from './middleware/flash.js';
import router from './routes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback_secret';

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session management
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

// Flash message middleware
app.use(flash);

// Static files middleware (Fixes 404 errors for images and CSS)
app.use(express.static('public'));

// Routes
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
