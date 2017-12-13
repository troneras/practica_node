'use strict';

const mongoose = require('mongoose');
const passwordHash = require('password-hash');

// primero creamos el esquema
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, index: true, unique: true},
    clave: { type: String, select: false}    
});


usuarioSchema.statics.registerUser =  function(user){
    // hash de la password
    user.clave = passwordHash.generate(user.clave);
    // creamos un usuario en memoria
    const newUser = new Usuario(user);
    // lo persistimos en la colección de usuarios
    return new Promise((resolve, reject) =>{
        newUser.save().then(usuarioCreado => {
            resolve (usuarioCreado);
        }).catch(err => {
            reject ('DuplicatedUser');
        });
    } );
    

};

// y por último creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// y lo exportamos
module.exports = Usuario;