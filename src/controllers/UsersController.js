const UsersController = {};

// Models
const User = require('../models/User');

// Modules
const passport = require('passport');


// Register
UsersController.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

UsersController.signup = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    // Almacena los errores
    const errors = [];

    if (name.length <= 0) {
        errors.push({ text: 'Please insert your name' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at leat 4 characters' });
    }
    if (errors.length > 0) {
        // Si hay algun error se pasa las variables para que no repita los datos de nuevo
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        // Buscar el email
        const emailUser = await User.findOne({ email: email });
        // Validar el email
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        } else {
            // Crea el objeto
            const newUser = new User({ name, email, password });
            // A la propiedad password llamar la funcion encrypt para cifrarlo
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        }
    }

    // res.send('ok');
};

// Login
UsersController.renderSignInForm = (req, res) => {
    res.render('users/signin');
};
// auth->metodo de pass-> por default tiene el nombre de local con un object
// Cuando todo vaya bien redireccionarlo a
// Cuando falle algo redireccionarlo a
// Cuando exista un msg de error, usar flash
UsersController.signin = passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/users/signin',
    failureFlash: true
});

// Logout
UsersController.logout = (req, res) => {
    // Metodo de passport
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/');
};


// NOTA. Cada vez que se reinicia el servidor se pierde la session, por lo que nos saca de la app
// Investigar modulos: Para mantener la session, se puede guardarla en la db

module.exports = UsersController;
