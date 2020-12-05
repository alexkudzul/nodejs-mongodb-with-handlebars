/* Modulo passport guarda la session en el servidor para autenticar users(facebook, google, etc) y
strategy para autenticar de forma local*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Ayuda a interactuar con la db
const User = require('../models/User');

// -----------IMPORTAR LOS DATOS DEL USER---------------

// Define una nueva estrategia para auth
passport.use(new LocalStrategy({
    // Datos que se va a recibir
    usernameField: 'email',
    passwordField: 'password'
},
    // done->callback->indica->terminar con la funcion
    async (email, password, done) => {
        const user = await User.findOne({ email: email });// busca el email en la db
        if (!user) {
            return done(null, false, { message: 'Not user found' });// recibe error, user, options(message)
        } else {
            // user.password->dela db->coincide con->password que se->pasa por el form?
            const match = await user.matchPassword(password);
            if (match) {// Si coinciden
                return done(null, user);// Retornar el user
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        }
    }));


// -----------GUARDA LOS DATOS DEL USER EN LA SESSION DE PASSPORT---------------

// Si el user se autentica almacenamos el id en session
passport.serializeUser((user, done) => {
    done(null, user.id);
});


// -----------OBTENER LOS DATOS DEL USER DE LA SESSION DE PASSPORT---------------


/* Cuando el user esta auth y empiece a navegar se ejecutara una consulta
 a la db para ver si tiene los permisos el user*/

// Obtenemos los datos a traves del id
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {// Busca el id en la db
        done(err, user);// retorna un err o los datos del user
    });
});

// Para usarlo se tiene que configurar en el servidor server.js