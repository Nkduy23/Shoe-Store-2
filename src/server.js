const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const route = require('./routes');
const browserSync = require('browser-sync');
const connectBrowserSync = require('connect-browser-sync');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

const app = express();
const bs = browserSync.create();

// Middleware for BrowserSync integration
app.use(connectBrowserSync(bs));

// Setup Handlebars template engine
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(morgan('dev')); // Logging requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

// Error Handling Middleware
app.use((err, req, res, next) => {
    const env = app.get('env');
    const statusCode = 500;
    const errorMessage = env === 'development' ? `<pre>${err.stack}</pre>` : 'Something went wrong';
    res.status(statusCode).send(errorMessage);
});

// Routes
route(app);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

    // BrowserSync configuration
    bs.init({
        proxy: `http://localhost:${port}`,
        files: ['**/*.*'],
        port: 3001,
        open: false,
        reloadOnRestart: true,
    });
});
