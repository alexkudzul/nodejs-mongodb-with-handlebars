const { Schema, model } = require('mongoose');

// Definir estructura del modelo
// user para saber a quien le pertenece el post
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }

    // date: {type: Date, default: Date.now},
}, {
    timestamps: true
});

// Crear el modelo con el nombre Post y pasamos la estructura y Para usar en otras partes el modelo
module.exports = model('Post', PostSchema);
