const path = require('path');
const express = require('express');
const app = express();

// Require the database connection from the src folder
const db = require('./src/util/database');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine and set views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Import and use application routes
const routes = require('./src/routes');
app.use(routes);

// Error Handling (404 and 500 pages)
app.use((req, res, next) => {
    res.status(404).render('errors/404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('errors/500', { title: 'Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
