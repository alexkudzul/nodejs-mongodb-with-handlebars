const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir estructura del modelo
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // date: {type:Date, default: Date.now}
}, {
    timestamps: true
});

// Funcion para cifrar el pass de register
// Crear un metodo encrypt para cifrar la contraseña
// Generar el salt 10 veces (fragmento aleatorio(string) que se usará para generar el hash asociado a la password)
// Con el salt, se añade un grado de complejidad que evita que el hash asociado a una password sea único.
// Generar el hash al password y lo retorna
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Funcion para validar el pass de login
// Crear un metodo match para comparar la contraseña de la db con la que el user hace un login
// Se usa la function de ES5 para poder usar el this.password(del Schema), la funcion flecha no tiene un gran alcance
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


// Crear el modelo con el nombre User y pasamos la estructura y Para usar en otras partes el modelo
module.exports = model('User', UserSchema);