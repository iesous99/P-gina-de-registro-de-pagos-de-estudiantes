const express = require('express');
const path = require('path'); // Nos permite unir directorios
const expressHbs = require('express-handlebars'); // Nos permite usar handlebars
const methodOverride = require('method-override'); // Nos permite usar los metodos PUT y DELETE
const session = require('express-session'); // Nos permite usar sesiones
// const handlebars = require('handlebars');
const handlebarsHelpers = require('handlebars-helpers')();
const flash = require('connect-flash'); // Nos permite enviar mensajes entre vistas
const passport = require('passport');

// Initializations
const app = express();
require('./database');
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Middleware para pasar las flash messages a la vista
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('error');
  next();
});

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// Routes
app.use(require('./routes/users'));
app.use(require('./routes/index'));
app.use(require('./routes/registro'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
