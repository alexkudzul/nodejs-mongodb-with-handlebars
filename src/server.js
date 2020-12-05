// ---------Modules--------
const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');

// --------Initiliazations--------
const app = express();
require('./config/passport');

// --------Settings--------
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));// Configura la ruta de las vistas, dirname devuelve el directorio actual
app.engine('.hbs', exphbs({// Configurar engine hbs
    // Configuracion de hbs
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs'); // Establecer cual sera el motor de plantillas

// --------Middlewares--------

app.use(morgan('dev'));// visualizar por consola las peticiones que van llegando por servidor
app.use(express.urlencoded({ extended: false }));// los datos que lleguen por cualquier metodo seran convertido en json
app.use(methodOverride('_method'));// Para usar meetodos Put y Delete
app.use(session({// Sessiones de users
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
// Para usar el modulo passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());// Mensajes flash


// --------Global variables--------

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');// Use en PostsController
    res.locals.error_msg = req.flash('error_msg');// Use en UsersController
    res.locals.error = req.flash('error');// Muestra errores de passport(name default 'error')
    res.locals.user = req.user || null; // Use en nav.hbs -> Muestra->secciones->del user logeado->en el nav->sino esta logeado->sera null #1.Guarda->session->del user de passport-> en locals.user->para saber si el user fue autenticado
    next(); // next->para que el navegador no se quede cargando, para que continue con los codigos de abajo(rutas)
});

// --------Routes--------
app.use(require('./routes/index.routes'));
app.use(require('./routes/posts.routes'));
app.use(require('./routes/users.routes'));

// --------Static files--------
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
