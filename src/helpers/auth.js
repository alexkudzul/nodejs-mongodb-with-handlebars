const helpers = {};
// Proteger rutas de la web

// next metodo para indica que continue con el codigo despues de la funcion isAutenti... de las rutas de post
helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    // si es false que muestre el msg y lo redirecc...
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/signin');
}

module.exports = helpers;