const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const route = require('./routes');
const browserSync = require('browser-sync');
const connectBrowserSync = require('connect-browser-sync');
const app = express();

// Kết nối với BrowserSync
const bs = browserSync.create();
app.use(connectBrowserSync(bs));

app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        handlebars: require('handlebars'),
        allowProtoPropertiesByDefault: true,
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((err, req, res, next) => {
    if (app.get('env') === 'development') {
        return res.status(500).send(`<pre>${err.stack}</pre>`);
    }
    res.status(500).send('Something went wrong');
});


route(app);

require('dotenv').config();
const port = process.env.PORT || 3000; // Server chạy trên cổng 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    bs.init({
        proxy: `http://localhost:${port}`,
        files: ['**/*.*'], // Theo dõi tất cả file thay đổi
        port: 3001, // Chạy BrowserSync trên cổng 3001
        open: false, // Không tự động mở tab trình duyệt
        reloadOnRestart: true, // Reload lại nếu khởi động lại server
    })
})