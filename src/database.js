const mongoose = require('mongoose');

const { MONGODB_HOST, MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    // Mongo se basa en otra biblioteca llamada MongoCliete y necesita
    // una configuracion para no lanzar warnings o errores
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,

    // No neceserio, pero se agrega para evitar posibles problemas
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));