// Carga el metodo config de dotenv
require('dotenv').config();

const app = require('./server');
require('./database');

// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});